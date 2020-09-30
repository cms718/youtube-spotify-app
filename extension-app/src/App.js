import React, { useState, Component } from "react";
import "./App.css";
import { handleFindSong, handleSignIn, handleAddToPlaylist } from "./popup";

function App() {
  // const [signedIn, setSignedIn] = useState(false);
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [selectedSongUri, setSelectedSongUri] = useState("");
  const [step, setStep] = useState(0);
  //doesnt work just shows sign in button - because of win.open
  // if (!signedIn) {
  //   return (
  //     <button
  //       id="sign_in"
  //       onClick={() => {
  //         handleSignIn();
  //         setSignedIn(true);
  //       }}
  //     >
  //       Sign in
  //     </button>
  //   );
  // }
  return (
    <div className="App">
      <button id="sign_in" onClick={handleSignIn}>
        Sign in
      </button>
      <button
        id="find_song"
        onClick={async () => {
          const data = await handleFindSong();
          console.log(data);
          setSongs(data.songs);
          setPlaylists(data.playlists);
          setStep(step + 1);
        }}
      >
        Find Song
      </button>
      {step === 1 && (
        <ul>
          {songs.map(({ name, uri, artist }) => (
            <li>
              <button
                onClick={() => {
                  setSelectedSongUri(uri);
                  setStep(step + 1);
                }}
              >
                {name} by {artist}
              </button>
            </li>
          ))}
        </ul>
      )}
      {step === 2 && (
        <ul>
          {playlists.map(({ playlist_id, playlist_name }) => (
            <li>
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default App;
