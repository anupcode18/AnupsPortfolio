/* =====================================================
   PORTFOLIO — script.js
   Typewriter | Scroll Animations | Skills Filter |
   Form Validation | Navbar | Stats Counter | Particles
   ===================================================== */

'use strict';

// ── Helpers ──────────────────────────────────────────
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// ══════════════════════════════════════════════════════
// 1. NAVBAR — scroll effect + mobile toggle + active link
// ══════════════════════════════════════════════════════
(function initNavbar() {
  const navbar     = $('#navbar');
  const toggle     = $('#nav-toggle');
  const menu       = $('#nav-menu');
  const navLinks   = $$('.nav-link');
  const sections   = $$('section[id]');

  // Scrolled style
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);

    // Active link highlighting
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
  });

  // Close on nav-link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', false);
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
      menu.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', false);
    }
  });
})();

// ══════════════════════════════════════════════════════
// 2. TYPEWRITER EFFECT
// ══════════════════════════════════════════════════════
(function initTypewriter() {
  const el = $('#typewriter');
  if (!el) return;

  const words = [
    'Software Engineer',
    'Full Stack Developer',
    'Cloud Enthusiast',
    'Problem Solver',
    'Tech Explorer',
  ];

  let wordIdx  = 0;
  let charIdx  = 0;
  let deleting = false;
  let paused   = false;

  const TYPING_SPEED   = 80;
  const DELETING_SPEED = 45;
  const PAUSE_AFTER    = 2000;
  const PAUSE_BEFORE   = 400;

  function tick() {
    if (paused) return;

    const current = words[wordIdx];

    if (deleting) {
      charIdx--;
      el.textContent = current.slice(0, charIdx);
      if (charIdx === 0) {
        deleting = false;
        wordIdx  = (wordIdx + 1) % words.length;
        paused   = true;
        setTimeout(() => { paused = false; requestAnimationFrame(loop); }, PAUSE_BEFORE);
        return;
      }
    } else {
      charIdx++;
      el.textContent = current.slice(0, charIdx);
      if (charIdx === current.length) {
        paused = true;
        setTimeout(() => {
          paused   = false;
          deleting = true;
          requestAnimationFrame(loop);
        }, PAUSE_AFTER);
        return;
      }
    }

    setTimeout(() => requestAnimationFrame(loop), deleting ? DELETING_SPEED : TYPING_SPEED);
  }

  let lastTime = 0;
  function loop(ts) {
    if (ts - lastTime > (deleting ? DELETING_SPEED : TYPING_SPEED)) {
      lastTime = ts;
      tick();
    } else {
      requestAnimationFrame(loop);
    }
  }

  // Simpler interval approach
  function type() {
    const current = words[wordIdx];
    if (deleting) {
      charIdx--;
      el.textContent = current.slice(0, charIdx);
      if (charIdx === 0) {
        deleting = false;
        wordIdx  = (wordIdx + 1) % words.length;
        setTimeout(type, PAUSE_BEFORE);
        return;
      }
      setTimeout(type, DELETING_SPEED);
    } else {
      charIdx++;
      el.textContent = current.slice(0, charIdx);
      if (charIdx === current.length) {
        setTimeout(() => { deleting = true; type(); }, PAUSE_AFTER);
        return;
      }
      setTimeout(type, TYPING_SPEED);
    }
  }

  type();
})();

// ══════════════════════════════════════════════════════
// 3. SCROLL-TRIGGERED REVEAL ANIMATIONS
// ══════════════════════════════════════════════════════
(function initScrollReveal() {
  const els = $$('.reveal-up, .reveal-left, .reveal-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  });

  els.forEach(el => observer.observe(el));
})();

// ══════════════════════════════════════════════════════
// 4. ANIMATED STAT COUNTERS
// ══════════════════════════════════════════════════════
(function initCounters() {
  const statCards = $$('.stat-card');

  const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

  function animateCounter(el, target, duration = 1800) {
    const numEl = el.querySelector('.stat-number');
    if (!numEl) return;
    const start = performance.now();

    function update(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value    = Math.round(easeOutQuart(progress) * target);
      numEl.textContent = value;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.querySelector('.stat-number')?.dataset.target || '0');
        animateCounter(entry.target, target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statCards.forEach(card => observer.observe(card));
})();

// ══════════════════════════════════════════════════════
// 5. SMOOTH SCROLL for anchor links
// ══════════════════════════════════════════════════════
(function initSmoothScroll() {
  $$('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = $(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 70;
      const top  = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

// ══════════════════════════════════════════════════════
// 8. CONTACT FORM VALIDATION
// ══════════════════════════════════════════════════════
(function initContactForm() {
  const form       = $('#contact-form');
  if (!form) return;
  const successMsg = $('#form-success');
  const submitBtn  = $('#contact-submit');

  // Field configs
  const fields = [
    {
      id:      'contact-name',
      errorId: 'name-error',
      fgId:    'fg-name',
      validate(val) {
        if (!val.trim())          return 'Name is required.';
        if (val.trim().length < 2) return 'Name must be at least 2 characters.';
        return null;
      }
    },
    {
      id:      'contact-email-input',
      errorId: 'email-error',
      fgId:    'fg-email',
      validate(val) {
        if (!val.trim()) return 'Email is required.';
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!re.test(val.trim())) return 'Please enter a valid email address.';
        return null;
      }
    },
    {
      id:      'contact-subject',
      errorId: 'subject-error',
      fgId:    'fg-subject',
      validate(val) {
        if (!val.trim()) return 'Subject is required.';
        if (val.trim().length < 3) return 'Subject must be at least 3 characters.';
        return null;
      }
    },
    {
      id:      'contact-message',
      errorId: 'message-error',
      fgId:    'fg-message',
      validate(val) {
        if (!val.trim())           return 'Message is required.';
        if (val.trim().length < 10) return 'Message must be at least 10 characters.';
        if (val.trim().length > 2000) return 'Message is too long (max 2000 chars).';
        return null;
      }
    }
  ];

  function showError(field, msg) {
    const input = $('#' + field.id);
    const error = $('#' + field.errorId);
    if (!input || !error) return;
    input.classList.add('error');
    error.textContent = msg;
  }

  function clearError(field) {
    const input = $('#' + field.id);
    const error = $('#' + field.errorId);
    if (!input || !error) return;
    input.classList.remove('error');
    error.textContent = '';
  }

  // Live validation on blur
  fields.forEach(field => {
    const input = $('#' + field.id);
    if (!input) return;
    input.addEventListener('blur', () => {
      const err = field.validate(input.value);
      err ? showError(field, err) : clearError(field);
    });
    input.addEventListener('input', () => {
      if (input.classList.contains('error')) {
        const err = field.validate(input.value);
        err ? showError(field, err) : clearError(field);
      }
    });
  });

  // Submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    fields.forEach(field => {
      const input = $('#' + field.id);
      const err   = field.validate(input ? input.value : '');
      if (err) {
        showError(field, err);
        valid = false;
      } else {
        clearError(field);
      }
    });

    if (!valid) {
      // Focus first error
      const firstError = form.querySelector('.form-input.error');
      if (firstError) firstError.focus();
      return;
    }

    // Simulate sending
    const btnText = submitBtn.querySelector('.btn-text');
    btnText.textContent = 'Sending…';
    submitBtn.disabled  = true;
    submitBtn.style.opacity = '0.7';

    setTimeout(() => {
      form.reset();
      fields.forEach(f => clearError(f));
      btnText.textContent    = 'Send Message';
      submitBtn.disabled     = false;
      submitBtn.style.opacity = '';
      if (successMsg) {
        successMsg.classList.add('show');
        setTimeout(() => successMsg.classList.remove('show'), 5000);
      }
    }, 1500);
  });
})();

// ══════════════════════════════════════════════════════
// 9. BACK TO TOP BUTTON
// ══════════════════════════════════════════════════════
(function initBackToTop() {
  const btn = $('#back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// ══════════════════════════════════════════════════════
// 10. FOOTER YEAR
// ══════════════════════════════════════════════════════
(function initYear() {
  const el = $('#footer-year');
  if (el) el.textContent = new Date().getFullYear();
})();

// ══════════════════════════════════════════════════════
// 11. HERO PARTICLE CANVAS
// ══════════════════════════════════════════════════════
(function initParticles() {
  const container = $('#hero-particles');
  if (!container) return;

  const canvas  = document.createElement('canvas');
  const ctx     = canvas.getContext('2d');
  container.appendChild(canvas);

  let W, H, particles = [];
  const COUNT = 60;
  const COLORS = ['rgba(56,189,248,', 'rgba(129,140,248,', 'rgba(6,182,212,'];

  function resize() {
    W = canvas.width  = container.offsetWidth;
    H = canvas.height = container.offsetHeight;
  }

  class Particle {
    constructor() { this.reset(true); }
    reset(init) {
      this.x    = Math.random() * W;
      this.y    = init ? Math.random() * H : H + 10;
      this.size = Math.random() * 2 + 0.5;
      this.vx   = (Math.random() - 0.5) * 0.3;
      this.vy   = -(Math.random() * 0.5 + 0.2);
      this.a    = Math.random() * 0.5 + 0.1;
      this.col  = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.fade = Math.random() * 0.005 + 0.002;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.a -= this.fade;
      if (this.a <= 0 || this.y < -10) this.reset(false);
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.col + this.a + ')';
      ctx.fill();
    }
  }

  function init() {
    resize();
    particles = Array.from({ length: COUNT }, () => new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', resize, { passive: true });
  init();
  animate();
})();

// ══════════════════════════════════════════════════════
// 12. PROJECT CARD 3D MOUSE-TILT EFFECT
// ══════════════════════════════════════════════════════
(function initTilt() {
  const cards = $$('.project-card, .skill-category-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const x      = e.clientX - rect.left;
      const y      = e.clientY - rect.top;
      const cx     = rect.width  / 2;
      const cy     = rect.height / 2;
      const rotX   = ((y - cy) / cy) * -5;
      const rotY   = ((x - cx) / cx) *  5;
      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s linear, box-shadow 0.3s ease, border-color 0.3s ease';
    });
  });
})();

// ══════════════════════════════════════════════════════
// 13. 3D LOGO DYNAMIC MOUSE TILT EFFECT
// ══════════════════════════════════════════════════════
(function initLogo3dTilt() {
  const logos = $$('#nav-logo-3d, #footer-logo-3d');

  logos.forEach(logo => {
    const container = logo.querySelector('.logo-3d-container');
    if (!container) return;

    logo.addEventListener('mousemove', (e) => {
      const rect = logo.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      
      const rotX = ((y - cy) / cy) * -25;
      const rotY = ((x - cx) / cx) * 25;
      
      container.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(4px)`;
      container.style.transition = 'transform 0.05s linear';
    });

    logo.addEventListener('mouseleave', () => {
      container.style.transform = '';
      container.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    });
  });
})();
