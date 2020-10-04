import React, { useState, Component } from "react";
import "./App.css";
import { handleFindSong, handleSignIn, handleAddToPlaylist } from "./popup";

function App() {
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [selectedSongUri, setSelectedSongUri] = useState("");
  const [step, setStep] = useState(0);

  return (
    <div className="app">
      <div id={!!songs.length ? "loaded" : "home"}>
        <button
          id="sign_in"
          className="button"
          onClick={() => {
            handleSignIn();
          }}
        >
          Sign in
        </button>
        <button
          id="find_song"
          className="button"
          onClick={async () => {
            const data = await handleFindSong();
            setSongs(data.songs);
            setPlaylists(data.playlists);
            setStep(step + 1);
          }}
        >
          Find Song
        </button>
      </div>
      {step === 1 && (
        <div>
          {songs.map(({ name, uri, artist, album }) => (
            <div class="songs">
              <img src={album} class="album-cover" />
              {name} by {artist}
              <button
                class="add"
                onClick={() => {
                  setSelectedSongUri(uri);
                  setStep(step + 1);
                }}
              ></button>
            </div>
          ))}
        </div>
      )}
      {step === 2 && (
        <div>
          {playlists.map(({ playlist_id, playlist_name, playlist_cover }) => (
            <div>
              <img src={playlist_cover} class="album-cover" />
              <button
                onClick={async () => {
                  const response = await handleAddToPlaylist(
                    selectedSongUri,
                    playlist_id
                  );
                  setStep(step + 1);
                }}
              >
                {playlist_name}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default App;
