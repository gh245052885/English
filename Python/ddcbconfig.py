import json, array, os, copy, pprint
from operator import itemgetter

class dcbconfig(object):
	"""docstring for dcbconfig."""
	def __init__(self, config):
		super(dcbconfig, self).__init__()
		self.config = config
		restrict_idxs = {}
		for i, r in enumerate(self.config['restrictions']):
			restrict_idxs[r['hexcode']] = i

		self.override_params_dict = {}
		for item in self.config['overrides_msm'] + self.config['overrides_dram']:
			if item["hexcode"] != None:
				self.override_params_dict[item["hexcode"]] = item["name"]

		self.data = []
		self.platform = ""
		self.platformCode = None
		self.name = ""
		self.description = "eCDT entry file"

	def loadJson(self, filename):
		with open(filename, 'r') as inFile:
			dump = json.load(inFile)
			self.data = dump['data']
			self.platform = dump['platform']
			self.platformCode = dump['platformCode']
			self.name = dump['name']
			self.description = dump['description']

	def saveJson(self, filename, platform, platformCode):
		# save the file as json
		with open(filename, 'w') as f:
			dump = {'data': self.data,
					'platform': platform,
					'platformCode': platformCode,
					'name': os.path.splitext(os.path.basename(filename))[0],
					'description': self.description}
			json.dump(dump, f)

	def preprocess(self, target):
		packets = target['packet_list']
		pprint.pprint(packets)
		last_lf = 0x5000
		last_hf = 0x5c00
		processed_packets = []
		for packet in packets:
			if packet['param'] == "LF Mask":
				last_lf = packet['hexcode']
			elif packet['param'] == "HF Mask":
				last_hf = packet['hexcode']
				if last_hf & 0x200 == 0x200:
					last_lf = 0x5000
			else:
				lf_bitlist = []
				for i in range(8):
					lf_bitlist = [(last_lf >> i) & 0x1] + lf_bitlist
				hf_bitlist = []
				for i in range(7):
					hf_bitlist = [(last_hf >> i) & 0x1] + hf_bitlist
				new_packet = copy.deepcopy(packet)
				new_packet['lf'] = lf_bitlist
				new_packet['hf'] = hf_bitlist
				processed_packets.append(new_packet)
		pprint.pprint(processed_packets)
		processed_target = copy.deepcopy(target)
		processed_target['packet_list'] = processed_packets
		return processed_target

	def writeBinary(self, filename):
		# generate binary and return status
		filename , extn = os.path.splitext(filename)
		filename_unrestrict = filename + '.unrestrict.bin'
		filename_restrict = filename+'.bin'
		unrestricted_bytes = []
		restricted_bytes = []
		sink = 0

		for i, target in enumerate(self.data):
			binArray = bytearray()
			pprint.pprint(target)
			if target['manufacturing_id']['hexcode'] != None:
				hexpack = (0x40 << 8 | target['manufacturing_id']['hexcode']).to_bytes(2, byteorder='little')
				binArray += hexpack
			if target['revision_id_1']['hexcode'] != None:
				hexpack = (0x41 << 8 | target['revision_id_1']['hexcode']).to_bytes(2, byteorder='little')
				binArray += hexpack
			if target['revision_id_2']['hexcode'] != None:
				hexpack = (0x42 << 8 | target['revision_id_2']['hexcode']).to_bytes(2, byteorder='little')
				binArray += hexpack
			if target['density']['hexcode'] != None:
				hexpack = (0x43 << 8 | target['density']['hexcode']).to_bytes(2, byteorder='little')
				binArray += hexpack
			if target['io_width']['hexcode'] != None:
				hexpack = (0x44 << 8 | target['io_width']['hexcode']).to_bytes(2, byteorder='little')
				binArray += hexpack
			if target['revision_id_1_rank_1']['hexcode'] != None:
				hexpack = (0x45 << 8 | target['revision_id_1_rank_1']['hexcode']).to_bytes(2, byteorder='little')
				binArray += hexpack
			if target['revision_id_2_rank_1']['hexcode'] != None:
				hexpack = (0x46 << 8 | target['revision_id_2_rank_1']['hexcode']).to_bytes(2, byteorder='little')
				binArray += hexpack
			if target['density_rank_1']['hexcode'] != None:
				hexpack = (0x47 << 8 | target['density_rank_1']['hexcode']).to_bytes(2, byteorder='little')
				binArray += hexpack
			if target['io_width_rank_1']['hexcode'] != None:
				hexpack = (0x48 << 8 | target['io_width_rank_1']['hexcode']).to_bytes(2, byteorder='little')
				binArray += hexpack

			sink = 0 if len(binArray) == 0 else 1

			packets_reassembled = self.assemble_packets(target['packet_list'])
			pprint.pprint(packets_reassembled)
			for packet in packets_reassembled:
				print(packet)
				hexpack = packet["hexcode"].to_bytes(2, byteorder='little')
				binArray += hexpack
			for tmrs in target['tmrs_entries']:
				hexpack = tmrs.to_bytes(2, byteorder='little')
				binArray += hexpack

			if sink == 0:
				unrestricted_bytes.append(binArray)
			else:
				restricted_bytes.append(binArray)


		# Write unrestricted binary file
		unrestrict_bin = bytearray()
		for val in unrestricted_bytes:
			unrestrict_bin += val
		val = 0x0000
		unrestrict_bin += val.to_bytes(2, byteorder='little')
		if len(unrestrict_bin) > 0:
			# write to file
			print('Unrestricted binary')
			print("".join("%02x" % b for b in unrestrict_bin))
			with open(filename_unrestrict, 'wb') as f:
				f.write(unrestrict_bin)
				f.close()

		# Write restrcited binary file
		restrict_bin = bytearray()
		for i, val in enumerate(restricted_bytes):
			restrict_bin += val
			if i < len(restricted_bytes) - 1:          # Clear restrictions
				val = 0x183F
				hexpack = val.to_bytes(2, byteorder='little')
				restrict_bin += hexpack
			else:                               # terminator
				val = 0x0000
				hexpack = val.to_bytes(2, byteorder='little')
				restrict_bin += hexpack
		if len(restrict_bin) > 0:
			# write to file
			print('Restricted binary')
			print("".join("%02x" % b for b in restrict_bin))
			with open(filename_restrict, 'wb') as f:
				f.write(restrict_bin)
				f.close()

	def assemble_packets(self, packets):
		if len(packets) == 0:
			return []
		lf_nums = []
		for p in packets:
			lf_num = 0
			for bit in p['hf'] + p['lf']:
				lf_num = (lf_num << 1) | bit
			lf_nums.append(lf_num)
		sorted_packets = [list(x) for x in zip(*sorted(zip(lf_nums, packets), key=itemgetter(0)))][1]
		pprint.pprint(sorted_packets)
		last_lf = 0x5000
		last_hf = 0x5c00
		assembled_packets = []
		for p in sorted_packets:
			lf_array = [0, 1, 0, 1, 0, 0, 0, 0] + p['lf']
			lf = 0
			for bit in lf_array:
				lf = (lf << 1) | bit

			hf_array = [0, 1, 0, 1, 1, 1, 0, 0, 0] + p['hf']
			hf = 0
			for bit in hf_array:
				hf = (hf << 1) | bit
			if lf == 0x5000 and hf != last_hf:
				last_hf = hf
				hf = hf | 0x200
				packet = {"name": "HF Mask",
						  "hexcode": hf,
						  "value": hex(hf)}
				last_lf = 0x5000
				assembled_packets.append(packet)
			else:
				if lf != last_lf:
					packet = {"name": "LF Mask",
							  "hexcode": lf,
							  "value": hex(lf)}
					last_lf = lf
					assembled_packets.append(packet)

				if hf != last_hf:
					packet = {"name": "HF Mask",
							  "hexcode": hf,
							  "value": hex(hf)}
					last_hf = hf
					assembled_packets.append(packet)
			assembled_packets.append(p)
		return assembled_packets

	def getObjByHexFromArray(self, array, hexcode):
		matches = [restrict for restrict in array if restrict['hexcode'] == hexcode]
		if len(matches) > 0:
			return matches.pop()
		else:
			return None

	def readBinary(self, filename):
		# generate binary and return status
		with open(filename, 'rb') as f:
			binArray = bytearray(f.read());
			restrict_names = {}
			for r in self.config['restrictions']:
				restrict_names[r['hexcode']] = r['name']
			if (len(binArray) % 2 != 0):
				print('error, file invalid. File contains odd number of bytes.'); return
			data = []
			print("".join("%02x" % b for b in binArray))
			init_tgt_entry = {'manufacturing_id': {'name': "No restrictions",
											  'hexcode': None},
							 'revision_id_1': {'name': "",
											  'hexcode': None},
							 'revision_id_2': {'name': "",
											  'hexcode': None},
							 'density': {'name': "No restrictions",
											  'hexcode': None},
							 'density_rank_1': {'name': "No restrictions",
											  'hexcode': None},
							 'io_width': {'name': "No restrictions",
											  'hexcode': None},
							 'revision_id_1_rank_1': {'name': "",
											 'hexcode': None},
							 'revision_id_2_rank_1': {'name': "",
											 'hexcode': None},
							 'io_width_rank_1': {'name': "No restrictions",
											 'hexcode': None},
							 'packet_list': [],
							 'tmrs_entries': []
							}
			currentTgt = copy.deepcopy(init_tgt_entry)
			while len(binArray) > 0:
				lsb = binArray.pop(0)
				msb = binArray.pop(0)
				hexcode = (msb << 8) | lsb
				if hexcode == 0x0000:
					currentTgt = self.preprocess(currentTgt)
					data.append(copy.deepcopy(currentTgt))
					del currentTgt
					break;
				elif hexcode == 0x183F:
					# clear res
					currentTgt = self.preprocess(currentTgt)
					data.append(copy.deepcopy(currentTgt))
					currentTgt = copy.deepcopy(init_tgt_entry)
				elif msb == 0x40:
					restrict = self.getObjByHexFromArray(self.config['restrictions'], 0x0)
					name = 'Unknown'
					if restrict:
						val = self.getObjByHexFromArray(restrict['args'], lsb)
						if val: name = val['name']
					currentTgt['manufacturing_id'] = {"name": name, "hexcode": lsb}
				elif msb == 0x41:
					currentTgt['revision_id_1'] = {"name": hex(lsb), "hexcode": lsb}
				elif msb == 0x42:
					currentTgt['revision_id_2'] = {"name": hex(lsb), "hexcode": lsb}
				elif msb == 0x43:
					restrict = self.getObjByHexFromArray(self.config['restrictions'], 0x3)
					name = 'Unknown'
					if restrict:
						val = self.getObjByHexFromArray(restrict['args'], lsb)
						if val: name = val['name']
					currentTgt['density'] = {"name": name, "hexcode": lsb}
				elif msb == 0x44:
					restrict = self.getObjByHexFromArray(self.config['restrictions'], 0x4)
					name = 'Unknown'
					if restrict:
						val = self.getObjByHexFromArray(restrict['args'], lsb)
						if val: name = val['name']
					currentTgt['io_width'] = {"name": name, "hexcode": lsb}
				elif msb == 0x45:
					currentTgt['revision_id_1_rank_1'] = {"name": hex(lsb), "hexcode": lsb}
				elif msb == 0x46:
					currentTgt['revision_id_2_rank_1'] = {"name": hex(lsb), "hexcode": lsb}
				elif msb == 0x47:
					restrict = self.getObjByHexFromArray(self.config['restrictions'], 0x7)
					name = 'Unknown'
					if restrict:
						val = self.getObjByHexFromArray(restrict['args'], lsb)
						if val: name = val['name']
					currentTgt['density_rank_1'] = {"name": name, "hexcode": lsb}
				elif msb == 0x48:
					restrict = self.getObjByHexFromArray(self.config['restrictions'], 0x8)
					name = 'Unknown'
					if restrict:
						val = self.getObjByHexFromArray(restrict['args'], lsb)
						if val: name = val['name']
					currentTgt['io_width_rank_1'] = {"name": name, "hexcode": lsb}

				elif (msb >> 2) == 0x14:
					packet = {  "param": "LF Mask",
								"value": hex(hexcode),
								"hexcode": hexcode,
								"color": '#000'
								}
					currentTgt['packet_list'].append(packet)
				elif (msb >> 2) == 0x17:
					packet = {    "param": "HF Mask",
								  "value": hex(hexcode),
								  "hexcode": hexcode,
								  "color": '#000'
								  }
					currentTgt['packet_list'].append(packet)
				elif (msb >> 6) == 0x2:
					if msb & 0x3F in self.override_params_dict:
						param = self.override_params_dict[msb & 0x3F]
					else:
						param = "Unknown"
					param_obj = self.getObjByHexFromArray(self.config['overrides_msm'] + self.config['overrides_dram'], msb & 0x3F)
					val_obj = self.getObjByHexFromArray(param_obj['values'], lsb)
					packet = {"param": param_obj['name'],
							  "value": val_obj['name'],
							  "hexcode": hexcode,
							  "color": '#000'
							  }
					currentTgt['packet_list'].append(packet)
				elif (msb >> 6) == 0x3:
					currentTgt['tmrs_entries'].append(hexcode)
			self.data = data



if __name__ == "__main__":
	print("#TODO: Command line interface")
