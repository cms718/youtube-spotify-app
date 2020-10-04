const chrome = global.chrome;
//had to return new promise, cant make tabs.query async
export const handleFindSong = () => {
  return new Promise((resolve, reject) => {
    try {
      chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { text: "get-title" },
          (response) => {
            resolve(response);
          }
        );
      });
    } catch (error) {
      reject(error);
    }
  });
};
export const handleSignIn = async () => {
  const response = await fetch("http://localhost:5000/sign_in");
  const { url } = await response.json();
  var win = window.open(url);
  win.focus();
  return url;
};

export const handleAddToPlaylist = async (uri, id) => {
  const response = await fetch(
    `http://localhost:5000/playlist?uri=${uri}&id=${id}`
  );
};
