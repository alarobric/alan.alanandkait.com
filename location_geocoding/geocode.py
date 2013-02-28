#!/usr/bin/python
#
# Copyright (c) 2013 Alan Richards
#

import time
import getopt
import sys
import simplejson
import urllib.request, urllib.parse
import csv

_USAGE = """
Syntax: geocode.py <file>

File should be a tab-delimited file containing locations: one per line.
"""

URL_BASE = 'http://maps.googleapis.com/maps/api/geocode/'

def geocode(address, **kwargs):
	kwargs.update({
		'address': address,
		'sensor': 'false',
	})
	url = URL_BASE + 'json?' + urllib.parse.urlencode(kwargs)
	#print(url)
	result = simplejson.load(urllib.request.urlopen(url))

	if ('status' not in result or result['status'] != 'OK'):
		print('bad request: ' + result['status'])
		return {}
	result = result['results']
	if (len(result) > 1):
		print('more than one result returned')
		return {}
	result = result[0]['geometry']['location']
	print(address + ' was geocoded successfully to ' + str(result['lat']) + ',' + str(result['lng']))
	return result

def parseCsv(filename):
	with open(filename) as csvfile:
		csvreader = csv.reader(csvfile, delimiter='\t')
		locationsList = []
		headers = next(csvreader)
		for row in csvreader:
			if len(row) >= len(headers):
				#loc = {'location': row[0],
				#	'type': row[1]
				#}
				loc = dict(zip(headers, row))
				locationsList.append(loc)
			#print('Size: ' + str(len(row)) + '   ' + ', '.join(row))
		#print(len(locationsList))
		#print(locationsList)
		return locationsList

def writeJSON(filename, object):
	with open(filename, 'w') as jsonfile:
		simplejson.dump(object, jsonfile, sort_keys=True, indent=4)
		print('Wrote output to ' + filename)

def PrintUsage(message):
	"""Prints a brief usage string and exits, optionally with an 
error message.

	Args:
		message: The optional error message.
	"""
	sys.stderr.write(_USAGE)
	if message:
		sys.exit('\nFATAL ERROR: ' + message)
	else:
		sys.exit(1)

def ParseArguments(args):
	"""Parses the command line arguments
	"""
	try:
		(opts, filenames) = getopt.getopt(args, '', ['help'])
	except getopt.GetoptError:
		PrintUsage('Invalid arguments.')

	for (opt, val) in opts:
		if opt == '--help':
			PrintUsage(None)

	if not filenames:
		PrintUsage('No files were specified')

	return filenames

def main():
	filenames = ParseArguments(sys.argv[1:])

	for filename in filenames:
		locList = parseCsv(filename)
		for loc in locList:
			ret = {}
			numLoops = 4
			while len(ret) == 0 and numLoops > 0:
				time.sleep(.1)
				ret = geocode(loc['location'])
				numLoops = numLoops - 1
			if (len(ret) > 0):
				#this will add the lat and lng items
				loc.update(ret)
			else:
				print('Skipped a row: ' + loc['location'])
		writeJSON(filename + '.json', locList)
	
	sys.exit(False)

if __name__ == '__main__':
	main()
