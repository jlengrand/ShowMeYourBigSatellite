ShowMeYourBigSatellite
======================

A simple app that displays the position of satellites in the sky in real-time

**The demo can be found [here](http://jlengrand.pythonanywhere.com/static/simplemap.html).**


The concept is rather simple:
* A server spits a json object containing coordinates where requested. 
* A client displays Google Maps and a satellite picture, and regularly requests for new coordinates.


# Server Side

The server is all written in Python (as requested).
It uses [Flask](http://flask.pocoo.org/) (Try it, you'll love it!).

There is some giggle with js and images, that you shouldn't look at too much.
They are only useful for development, as a way to serve static files.

For deployment, Nginx, Apache or any other webserver should be used instead.

The only interesting method is actually *get_coordinates*.
It returns a set of random coordinates, using a function defined in the utils module. 
In a proper environment, you would probably use your calculation library instead :).

# Client Side

I have not really touched the client side, only refactored. 
Basically, as soon as the DOM is ready (page fully loaded), jquery fires the *initialize* method, and starts the main loop.

The loop basically makes a call to the server side once in a while (once every second), and updates the coordinate as an effect.

I use integer coordinates, so if may happen that the same position shows up several times if you watch long enough :D.


# Stuff

The JSON Api thingy is rather cool, because it allows for easy improvements (you can add more satellites, more info like name, date or launch, . . .).

Using Flask, you could also easily develop some kind of a REST Api that allows people to choose the satellite they want to see, etc . . .
To fix that, you could use a push mechanism, that would send data to the clients instead of answering their requests.

# Running it

To run it, you'll need python and a virtualenv. 

* Clone the repo
* Follow [this tutorial](www.jontourage.com/2011/02/09/virtualenv-pip-basics/)
* Create a virtualenv and use my requirements.txt
* Run $ python main.py


Voila . . . :)
