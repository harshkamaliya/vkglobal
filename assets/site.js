(function () {
  var EMAIL = 'sales@vkindustrialsolutions.com';
  var WA = '919898676278';
  var MAP_QUERY = 'James Plaza Square, Ankleshwar';
  var ADDRESS = 'VK Industrial Solutions, FF-23, James Plaza Square, Asian Paint Chokdi, Ankleshwar GIDC, Bharuch, Gujarat 393002';
  var root = document.querySelector('.vk');

  // Theme: remember the visitor's choice
  try { var saved = localStorage.getItem('vk-theme'); if (saved) root.setAttribute('data-theme', saved); } catch (e) {}

  function openLink(url) {
    var a = document.createElement('a');
    a.href = url; a.target = '_blank'; a.rel = 'noopener';
    document.body.appendChild(a); a.click(); a.remove();
  }

  var actions = {
    toggleTheme: function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('vk-theme', next); } catch (e) {}
    },
    toggleMenu: function (btn) {
      var menu = document.getElementById('mobileMenu');
      var open = menu.hasAttribute('hidden');
      if (open) menu.removeAttribute('hidden'); else menu.setAttribute('hidden', '');
      btn.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    },
    closeMenu: function () {
      var menu = document.getElementById('mobileMenu'), btn = document.getElementById('menuBtn');
      menu.setAttribute('hidden', ''); btn.classList.remove('open'); btn.setAttribute('aria-expanded', 'false');
    },
    showMap: function (btn) {
      var box = btn.closest('div[style*="min-height: 380px"]');
      box.innerHTML = '<iframe title="VK Industrial Solutions on Google Maps" src="https://www.google.com/maps?q=' + encodeURIComponent(MAP_QUERY) + '&z=17&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen style="position:absolute;inset:0;width:100%;height:100%;border:0"></iframe>';
    },
    copyAddr: function () {
      var label = document.getElementById('copyLabel');
      var done = function () { label.textContent = 'Address copied'; setTimeout(function () { label.textContent = 'Copy address'; }, 2000); };
      if (navigator.clipboard) navigator.clipboard.writeText(ADDRESS).then(done, done); else done();
    },
    sendMail: function () { send('mail'); },
    sendWa: function () { send('wa'); }
  };

  function val(id) { var el = document.getElementById(id); return el ? el.value.trim() : ''; }
  function send(kind) {
    var f = { name: val('d-name'), company: val('d-company'), phone: val('d-phone'), email: val('d-email'), req: val('d-req') };
    var err = document.getElementById('formErr');
    if (!f.name || !f.phone || !f.req) { err.removeAttribute('hidden'); return; }
    err.setAttribute('hidden', '');
    var summary = 'New quote request — VK Industrial website\n\nName: ' + f.name + '\nCompany: ' + (f.company || '-') + '\nPhone: ' + f.phone + '\nEmail: ' + (f.email || '-') + '\n\nRequirement:\n' + f.req;
    var url = kind === 'mail'
      ? 'mailto:' + EMAIL + '?subject=' + encodeURIComponent('Quote request — ' + (f.company || f.name)) + '&body=' + encodeURIComponent(summary)
      : 'https://wa.me/' + WA + '?text=' + encodeURIComponent(summary);
    openLink(url);
  }

  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-act]');
    if (el && actions[el.getAttribute('data-act')]) actions[el.getAttribute('data-act')](el);
  });

  // Category tabs (click + arrow keys)
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.vk-tabbtn'));
  function select(i, focus) {
    tabs.forEach(function (t, k) {
      var on = k === i;
      t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1;
      document.getElementById('panel-' + k).hidden = !on;
    });
    if (focus) tabs[i].focus();
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { select(i); });
    t.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') select((i + 1) % tabs.length, true);
      if (e.key === 'ArrowLeft') select((i - 1 + tabs.length) % tabs.length, true);
    });
  });
  if (tabs.length) select(0);
})();
