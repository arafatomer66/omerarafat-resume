/* ══════════════════════════════════════════════════════════
   OMER ARAFAT PORTFOLIO — main.js
   ══════════════════════════════════════════════════════════ */

// ── Navbar scroll effect ──────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ── Mobile menu ───────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (mobileMenu.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

// Close on link click
document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// ── Intersection Observer — reveal on scroll ──────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings in the same parent
      const siblings = entry.target.parentElement.querySelectorAll('.reveal');
      let delay = 0;
      siblings.forEach((el, idx) => {
        if (el === entry.target) delay = idx * 80;
      });
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, Math.min(delay, 400));
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── Animated counter ─────────────────────────────────────
function animateCounter(el, target) {
  const duration = 1800;
  const start = performance.now();
  const update = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  };
  requestAnimationFrame(update);
}

// Trigger counters when hero stats visible
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.stat-num[data-target]').forEach(el => {
        animateCounter(el, parseInt(el.dataset.target));
      });
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// ── Smooth active nav link highlight ─────────────────────
const sections   = document.querySelectorAll('section[id]');
const navLinks   = document.querySelectorAll('.nav-links a');

const sectionObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.style.color = 'var(--text)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObs.observe(s));

// ── Subtle cursor glow (desktop only) ─────────────────────
if (window.matchMedia('(pointer: fine)').matches) {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed; pointer-events: none; z-index: 9999;
    width: 300px; height: 300px; border-radius: 50%;
    background: radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: left 0.15s ease, top 0.15s ease;
  `;
  document.body.appendChild(glow);

  window.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  }, { passive: true });
}

// ── Typing effect in hero subtitle (optional subtle touch) ─
// Just makes the page feel alive on load — no external libs.
const heroSub = document.querySelector('.hero-sub');
if (heroSub) {
  heroSub.style.opacity = '0';
  setTimeout(() => {
    heroSub.style.transition = 'opacity 0.8s ease';
    heroSub.style.opacity = '1';
  }, 700);
}

/* ══════════════════════════════════════════════════════════
   2D EFFECTS — spotlight, magnetic buttons, ripple, parallax
   ══════════════════════════════════════════════════════════ */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer  = window.matchMedia('(pointer: fine)').matches;

// ── Card spotlight (CSS vars --mx / --my follow cursor) ───
if (finePointer && !reduceMotion) {
  const spotlightCards = document.querySelectorAll(
    '.skill-category, .project-card, .blog-card, .edu-card, .contact-card'
  );
  spotlightCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width)  * 100;
      const y = ((e.clientY - rect.top)  / rect.height) * 100;
      card.style.setProperty('--mx', x + '%');
      card.style.setProperty('--my', y + '%');
    }, { passive: true });
  });
}

// ── Magnetic buttons (subtle 2D translation toward cursor) ─
if (finePointer && !reduceMotion) {
  const magnets = document.querySelectorAll('.btn, .nav-cta');
  const STRENGTH = 0.25;   // 0 = none, 1 = follow exactly
  const MAX = 10;          // max px offset

  magnets.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width  / 2);
      const dy = e.clientY - (rect.top  + rect.height / 2);
      const x  = Math.max(-MAX, Math.min(MAX, dx * STRENGTH));
      const y  = Math.max(-MAX, Math.min(MAX, dy * STRENGTH));
      btn.style.setProperty('--mag-x', x + 'px');
      btn.style.setProperty('--mag-y', y + 'px');
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.setProperty('--mag-x', '0px');
      btn.style.setProperty('--mag-y', '0px');
    });
  });
}

// ── Click ripple on any button ────────────────────────────
document.querySelectorAll('.btn, .nav-cta').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.width  = size + 'px';
    ripple.style.height = size + 'px';
    ripple.style.left   = (e.clientX - rect.left) + 'px';
    ripple.style.top    = (e.clientY - rect.top)  + 'px';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 650);
  });
});

// ── Hero orbs: gentle mouse parallax ──────────────────────
if (finePointer && !reduceMotion) {
  const orbs = document.querySelectorAll('#hero .orb');
  const hero = document.getElementById('hero');
  if (hero && orbs.length) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const cx = (e.clientX - rect.left) / rect.width  - 0.5;
      const cy = (e.clientY - rect.top)  / rect.height - 0.5;
      orbs.forEach((orb, i) => {
        const depth = (i + 1) * 18; // each orb drifts a bit further
        orb.style.transform =
          `translate(${cx * depth}px, ${cy * depth}px)`;
      });
    }, { passive: true });
  }
}

// ── Section title underline reveal ────────────────────────
const titleObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('underline-in');
      titleObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll('.section-title').forEach(t => titleObserver.observe(t));
