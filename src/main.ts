import "./style.css";

const app = document.getElementById("app");
const button = document.createElement("button");
button.innerText = "Click to load transcript";
const loader = document.createElement("p");
loader.innerHTML = "Loading...";

const url = new URL(window.location.href);
const video_id = url.searchParams.get("v");

if (video_id) {
  app?.appendChild(button);

  button.addEventListener("click", async function () {
    app?.removeChild(button);
    app?.appendChild(loader);
    const { data } = await fetchTranscript(video_id);
    const text = document.createTextNode(data);
    app?.removeChild(loader);
    app?.appendChild(text);
  });
} else {
  const p = document.createElement("p");
  p.innerHTML = "No Transcript found on this page.";
  app?.appendChild(p);
  const res = await getCurrentTab();
  console.log(res);
}

async function fetchTranscript(video_id: string) {
  const res = await fetch(`http://localhost:3000/api?video_id=${video_id}`);
  const data = await res.json();
  return data;
}

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let result = await chrome.tabs?.query(queryOptions);
  return result;
}
