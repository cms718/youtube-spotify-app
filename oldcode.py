auth_params = {
    'client_id': '76bd895c92be490bbad8f64465e77d24',
    'response_type': 'code',
    'redirect_uri': 'https://google.com',
    'scope': 'playlist-modify-private playlist-read-collaborative playlist-modify-public',
    'show_dialog': True
    }

r = requests.get('https://accounts.spotify.com/authorize', params=auth_params)

print('Please click to login, and copy code from redirect: {}'.format(r.url))

code = input('Enter code from URL: ')
body_params = {
    'client_id': '76bd895c92be490bbad8f64465e77d24',
    'client_secret': '7bf234b4c23347409670e96342cb908a',
    'grant_type': 'authorization_code',
    'code': code,
    'redirect_uri': 'https://google.com',
    'expires_in': 3600 #change back to 3600 at some point
}

response = requests.post('https://accounts.spotify.com/api/token', data=body_params).json()
access_token = response['access_token']
print(access_token)

#generating information about the user who signed in
user_response = requests.get('https://api.spotify.com/v1/me', headers={'Authorization':'Bearer {}'.format(access_token)}).json()
user_id = user_response['id']
print(user_id)

#list of available playlist
playlist_request = requests.get('https://api.spotify.com/v1/users/{}/playlists'.format(user_id), headers={'Authorization':'Bearer {}'.format(access_token)}).json()
playlist_results = [item['name'] for item in playlist_request['items']]
playlist_ids = [item['id'] for item in playlist_request['items']]

#TODO scrape URL (beautifulsoup) to find title youtube_url = input('Enter YouTube URL: ')
user_input = input('Enter Title: ')
param_input = user_input.replace(' ', '+')

search_params = {
    'q': param_input,
    'type': 'track',
    'limit': 3
}

search_response = requests.get('https://api.spotify.com/v1/search', params=search_params, headers={'Authorization':'Bearer {}'.format(access_token)}).json()
#TODO make the list of results a dictionary?? easier to access / more neat?
artist_results = []
title_results = []
uri_list = []

#TODO if no results try again
for item in search_response['tracks']['items']:
    title_results.append(item['name'])
    uri_list.append(item['uri'])
    for artist in item['album']['artists']:
        artist_results.append(artist['name'])

for title, artist in zip(title_results, artist_results):
    print('{} by {}'.format(title, artist))

song_choice = int(input('Which song would you like to add? No.1, 2 or 3: ')) - 1

print([playlist for playlist in playlist_results])
playlist_choice = int(input('Which playlist would you like to add to? (No.1 to x): ')) - 1

#adding song to playlist
playlist_response = requests.post('https://api.spotify.com/v1/playlists/{}/tracks'.format(playlist_ids[playlist_choice]), params={'uris': uri_list[song_choice]}, headers={'Authorization':'Bearer {}'.format(access_token)}).json()
