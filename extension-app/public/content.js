chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  doSomethingWithRequest(request).then(sendResponse);
  return true;
});

const doSomethingWithRequest = async (request) => {
  if (request.text && request.text === "get-title") {
    const title = document.getElementsByClassName(
      "title ytd-video-primary-info-renderer"
    )[0].textContent;
    const response = await fetch(`http://localhost:5000/songs?title=${title}`);
    const data = await response.json();
    alert(data);
    return data;
  }
};
