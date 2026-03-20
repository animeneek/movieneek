async function loadHeader() {
  const container = document.getElementById('header-container');
  const res = await fetch('header.html');
  const html = await res.text();
  container.innerHTML = html;

  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
}

loadHeader();
