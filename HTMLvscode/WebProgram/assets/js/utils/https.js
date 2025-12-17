const API_BASE_URL = "http://localhost:3000/api"; 
// futuramente: https://api.seusistema.com

async function httpGet(endpoint) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    return response.json();
}

async function httpPost(endpoint, body) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });
    return response.json();
}

export { httpGet, httpPost };
