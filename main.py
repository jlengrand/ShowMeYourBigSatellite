from flask import Flask, jsonify
from flask.ext.cors import cross_origin
import os

import whereismysat, ephem

app = Flask('ShowMeYourBigSatellite', static_url_path='/static')

@app.route('/get_coordinates/<satName>')
@cross_origin(headers=['Content-Type']) # allow all origins all methods.
def get_coordinates(satName):
    sat=whereismysat.getPos(satName)
    return jsonify(longitude=sat.sublong.real / ephem.degree,
                   latitude=sat.sublat.real / ephem.degree)

@app.route('/css/<path:path>')
def static_proxy_css(path):
    # send_static_file will guess the correct MIME type
    return app.send_static_file(os.path.join('css', path))

@app.route('/images/<path:path>')
def static_proxy_images(path):
    # send_static_file will guess the correct MIME type
    return app.send_static_file(os.path.join('images', path))

@app.route('/js/<path:path>')
def static_proxy_js(path):
    # send_static_file will guess the correct MIME type
    return app.send_static_file(os.path.join('js', path))

@app.route('/')
def root():
    return app.send_static_file('simplemap.html')

if __name__ == "__main__":
    app.run(debug=True)