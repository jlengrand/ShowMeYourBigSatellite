from flask import Flask
import os

app = Flask(__name__, static_url_path='/static')


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

# @app.route("/")
# def hello():
#     return "Hello World!"

if __name__ == "__main__":
    app.run()