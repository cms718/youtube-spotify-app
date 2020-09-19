document.addEventListener(
  "DOMContentLoaded",
  function () {
    const handlePlaylist = () => {
      chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { text: "get-title" },
          (response) => {
            response;
          }
        );
      });
    };
    const handleSignIn = async () => {
      const response = await fetch("http://localhost:5000/sign_in");
      const data = await response.json();
      // TODO: make the alert a link, popup window?
      alert(data.url);
      //wait till user has gone to the link
      //then if successfull display a list of users playlists
      return data.url;
    };

    const handleChoosePlaylist = async () => {
      const response = await fetch("http://localhost:5000/playlists");
      const data = await response.json();
      //need to extract the relevant data - eg. list of playlists and display in click boxs.
      console.log(data.playlists);
    };
    const playlistButton = document.querySelector("button#playlist");
    const signInButton = document.querySelector("button#sign_in");

    playlistButton.addEventListener("click", handlePlaylist, false);
    signInButton.addEventListener("click", handleSignIn, false);
    //choosePlaylistButton.addEventListener("click", handleChoosePlaylist, false);
  },
  false
);
