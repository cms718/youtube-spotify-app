import requests
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/sign_in')
def sign_in():
    auth_params = {
    'client_id': '76bd895c92be490bbad8f64465e77d24',
    'response_type': 'code',
    'redirect_uri': 'http://localhost:5000/callback/',
    'scope': 'playlist-modify-private playlist-read-collaborative playlist-modify-public',
    'show_dialog': True
    }
    r = requests.get('https://accounts.spotify.com/authorize', params=auth_params)
    return {'url': r.url}

@app.route('/playlists')
def playlists():
    #make the list of playlists with IDs in JSON format
    playlist_request = requests.get('https://api.spotify.com/v1/users/{}/playlists'.format(user_id), headers={'Authorization':'Bearer {}'.format(access_token)}).json()
    playlist_results = [item['name'] for item in playlist_request['items']]
    playlist_ids = [item['id'] for item in playlist_request['items']]
    return {
        'playlists': playlist_results,
        'playlist_ids': playlist_ids
    }

@app.route('/callback/')
def token():
    code = request.args.get('code')
    body_params = {
    'client_id': '76bd895c92be490bbad8f64465e77d24',
    'client_secret': '7bf234b4c23347409670e96342cb908a',
    'grant_type': 'authorization_code',
    'code': code,
    'redirect_uri': 'http://localhost:5000/callback/',
    'expires_in': 3600
}
    response = requests.post('https://accounts.spotify.com/api/token', data=body_params).json()
    global access_token
    access_token = response['access_token']

    user_response = requests.get('https://api.spotify.com/v1/me', headers={'Authorization':'Bearer {}'.format(access_token)}).json()
    global user_id
    user_id = user_response['id']
    
    return '', 200

@app.route('/songs')
def songs():
    title = request.args.get('title')
    print(title)

if __name__ == "__main__":
    app.run(debug=True)