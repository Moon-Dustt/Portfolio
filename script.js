// ── CUSTOM CURSOR ──
if (window.matchMedia('(pointer:fine)').matches) {
  const cur = document.getElementById('cursor');
  const crg = document.getElementById('cring');

  document.addEventListener('mousemove', e => {
    cur.style.left = e.clientX + 'px';
    cur.style.top  = e.clientY + 'px';
    crg.style.left = e.clientX + 'px';
    crg.style.top  = e.clientY + 'px';
  });

  document.querySelectorAll('a, button, .proj-card, .clink').forEach(el => {
    el.addEventListener('mouseenter', () => {
      crg.style.width       = '54px';
      crg.style.height      = '54px';
      crg.style.borderColor = 'rgba(255,255,255,0.55)';
    });
    el.addEventListener('mouseleave', () => {
      crg.style.width       = '32px';
      crg.style.height      = '32px';
      crg.style.borderColor = 'rgba(255,255,255,0.35)';
    });
  });
}

// ── HAMBURGER MENU ──
const ham = document.getElementById('hamburger');
const mob = document.getElementById('mobileMenu');

ham.addEventListener('click', () => {
  ham.classList.toggle('open');
  mob.classList.toggle('open');
  document.body.style.overflow = mob.classList.contains('open') ? 'hidden' : '';
});

function closeMobile() {
  ham.classList.remove('open');
  mob.classList.remove('open');
  document.body.style.overflow = '';
}

// ── HIRE MODAL ──
function openModal(e) {
  if (e) e.preventDefault();
  document.getElementById('hireModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('hireModal').classList.remove('open');
  document.body.style.overflow = '';
}

// Close modal on backdrop click
document.getElementById('hireModal').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

// Close modal on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// ── SCROLL REVEAL + SKILL BARS ──
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Animate any skill bars inside this element
      entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
        setTimeout(() => bar.style.width = bar.dataset.w + '%', 200);
      });
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── PROJECT FILTER ──
document.querySelectorAll('.flt').forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    document.querySelectorAll('.flt').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.f;

    document.querySelectorAll('.proj-card').forEach(card => {
      const cats = card.dataset.c || '';
      const show = filter === 'all' || cats.includes(filter);
      card.classList.toggle('hidden', !show);
    });
  });
});

// ── CONTACT FORM ──
function sendMsg() {
  const name  = document.getElementById('fn').value.trim();
  const email = document.getElementById('fe').value.trim();
  const msg   = document.getElementById('fm').value.trim();

  if (!name || !email || !msg) {
    alert('Please fill in all fields.');
    return;
  }

  document.getElementById('cForm').style.display = 'none';
  document.getElementById('fOk').style.display   = 'block';
}

// ── NAV BACKGROUND ON SCROLL ──
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  navbar.style.background = window.scrollY > 60
    ? 'rgba(8,8,8,0.97)'
    : 'rgba(8,8,8,0.82)';
});