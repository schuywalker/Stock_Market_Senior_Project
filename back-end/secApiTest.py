
import socketio
import numpy
sio = socketio.Client()
 
@sio.on('connect', namespace='/all-filings')
def on_connect():
    print("Connected to https://api.sec-api.io:3334/all-filings")
 
@sio.on('filing', namespace='/all-filings')
def on_filings(filing):
    print(filing)
 
sio.connect('https://api.sec-api.io:3334?apiKey=YOUR_API_KEY', namespaces=['/all-filings'], transports=["websocket"])
sio.wait()