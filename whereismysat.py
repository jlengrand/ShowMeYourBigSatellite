#! /usr/bin/python

import numpy as np
import ephem
import datetime
import urllib2

#global
satlist=[]

#
def init(s):
    """ Read a TLEs file stream and creates a list of satellites."""
    global satlist
    tmplist = []
    l1 = s.readline()
    while l1:
        l2 = s.readline()
        l3 = s.readline()
        sat = ephem.readtle(l1,l2,l3)
        tmplist.append(sat)
        l1 = s.readline()

    s.close()
    if len(tmplist)> 0:
        satlist=tmplist
        print "%i satellites loaded into list"%len(satlist)


def getPos(name):
    global satList
    for sat in satlist:
        if sat.name == name:
                sat.compute(datetime.datetime.utcnow())
                print('%s  lon: %s  lat: %s' % (sat.name, sat.sublong.real / ephem.degree, sat.sublat.real / ephem.degree))
                return(sat)



def main():
    """ For testing """
    #load TLEs (should be done every day)
    #init(open("science.txt"))
    init(urllib2.urlopen("http://www.celestrak.com/NORAD/elements/science.txt"))

    #get position
    getPos("TERRA")


#when import
init(urllib2.urlopen("http://www.celestrak.com/NORAD/elements/science.txt"))


if __name__ == "__main__":
    main()
