// Every call to the backend lives here, so components never deal with URLs or fetch.

// Use the same host the page came from, so phones on the Wi-Fi
// (opening http://<laptop-IP>:5173) reach the laptop's API, not their own.
const API_URL = `http://${window.location.hostname}:5000/api/posts`;

async function request(url, options = {}) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Request failed");
  }
  return data;
}

export function getPosts() {
  return request(API_URL);
}

export function createPost(text) {
  return request(API_URL, { method: "POST", body: JSON.stringify({ text }) });
}

export function reactToPost(id, type) {
  return request(`${API_URL}/${id}/react`, { method: "PATCH", body: JSON.stringify({ type }) });
}
