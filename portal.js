document.addEventListener('DOMContentLoaded', () => {
  const homePage = 'index.html';

  document.querySelectorAll('.nav-left img').forEach((logo) => {
    logo.tabIndex = 0;
    logo.setAttribute('role', 'link');
    logo.setAttribute('aria-label', 'Go to dashboard home');
    logo.style.cursor = 'pointer';
    const goHome = () => { window.location.href = homePage; };
    logo.addEventListener('click', goHome);
    logo.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); goHome(); }
    });
  });

  const modalStyle = document.createElement('style');
  modalStyle.textContent = `
    .portal-error-backdrop { position:fixed; inset:0; z-index:5000; display:grid; place-items:center; padding:20px; background:rgba(14,20,48,.52); backdrop-filter:blur(4px); }
    .portal-error-dialog { width:min(420px,100%); padding:28px; border-radius:18px; background:#fff; box-shadow:0 24px 70px rgba(10,18,55,.32); color:#172033; text-align:center; }
    .portal-error-icon { display:grid; place-items:center; width:54px; height:54px; margin:0 auto 16px; border-radius:50%; background:#fff1f1; color:#d14343; font-size:27px; font-weight:800; }
    .portal-error-dialog h2 { margin:0 0 9px; color:#202b5f; font-size:21px; }.portal-error-dialog p { margin:0; color:#60708a; line-height:1.55; }
    .portal-error-dialog button { width:100%; margin-top:22px; padding:11px 16px; border:0; border-radius:9px; background:#2f63d8; color:#fff; font:600 14px system-ui; cursor:pointer; }
  `;
  document.head.appendChild(modalStyle);

  const showFeesUnavailable = () => {
    const backdrop = document.createElement('div');
    backdrop.className = 'portal-error-backdrop';
    backdrop.innerHTML = `<section class="portal-error-dialog" role="alertdialog" aria-modal="true" aria-labelledby="fees-error-title"><div class="portal-error-icon">!</div><h2 id="fees-error-title">Fees service is busy</h2><p>We could not reach the Fees server right now. Please try again in a few minutes or contact the Accounts Department for urgent help.</p><button type="button">Okay, got it</button></section>`;
    const close = () => backdrop.remove();
    backdrop.querySelector('button').addEventListener('click', close);
    backdrop.addEventListener('click', (event) => { if (event.target === backdrop) close(); });
    document.addEventListener('keydown', function onEscape(event) { if (event.key === 'Escape') { close(); document.removeEventListener('keydown', onEscape); } });
    document.body.appendChild(backdrop);
    backdrop.querySelector('button').focus();
  };

  document.querySelectorAll('a[href="Fees.html"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const menu = document.getElementById('menuDropdown');
      if (menu) menu.style.display = 'none';
      showFeesUnavailable();
    });
  });
});
