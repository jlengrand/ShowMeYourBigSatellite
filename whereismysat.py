#! /usr/bin/python

import numpy as np
import ephem
import datetime
import urllib2

#global
satlist={}

class TleGroup:
    """ Group of TLEs """
    def __init__(self, name, url):
        """save url and load TLEs"""
        self.url = url
        self.name = name
        self.load()

    def load(self):
        """ Read a TLEs file stream and creates a list of satellites.
        This function aims to be called every day"""
        global satlist
        s = urllib2.urlopen(self.url)
        count = 0
        l1 = s.readline()
        while l1:
            l2 = s.readline()
            l3 = s.readline()
            sat = ephem.readtle(l1,l2,l3)
            if sat is not None:
                #add/update satlist
                satlist[sat.name]=sat
                count+=1
            l1 = s.readline()
        s.close()
        print "%i satellites loaded into list / Total in list: %i"%(count,len(satlist))

def getPos(name):
    global satlist
    for key in satlist.keys():
        if key == name:
            sat=satlist[key]
            sat.compute(datetime.datetime.utcnow())
            print('%s  lon: %s  lat: %s' % (sat.name, sat.sublong.real / ephem.degree, sat.sublat.real / ephem.degree))
            return(sat)



def main():

    #get position
    getPos("TERRA")


#when import
science = TleGroup("Space & Earth Science", "http://www.celestrak.com/NORAD/elements/science.txt")


if __name__ == "__main__":
    main()
