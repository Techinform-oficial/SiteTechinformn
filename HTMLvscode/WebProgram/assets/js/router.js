export function navigate(view) {
    history.pushState({}, "", view);
    loadView(view);
}

export async function loadView(view) {
    const response = await fetch(view);
    const html = await response.text();
    document.getElementById("app").innerHTML = html;
}

window.onpopstate = () => {
    loadView(location.pathname);
};
