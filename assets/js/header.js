// header.js
async function loadHeader() {
    const headerContainer = document.getElementById('header-container');
    const res = await fetch('header.html');
    const html = await res.text();
    headerContainer.innerHTML = html;
}
loadHeader();
