

document.addEventListener('DOMContentLoaded', () => {

  
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursor-ring');

  let mx = window.innerWidth / 2;
  let my = window.innerHeight / 2;
  let rx = mx, ry = my;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });


  function animateRing() {
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  
  const hoverTargets = document.querySelectorAll('a, button, .skill-card, .project-card, .hamburger');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
      ring.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
      ring.classList.remove('hover');
    });
  });

  /* ── 2. HAMBURGER MENU ── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close on nav link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  
  const revealEls = document.querySelectorAll('.reveal');

  const revealIO = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        
        const delay = (entry.target.dataset.delay || 0);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        revealIO.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach((el, i) => {

    if (el.closest('.skills-grid') || el.closest('.projects-grid')) {
      const siblings = el.parentElement.querySelectorAll('.reveal');
      const pos = Array.from(siblings).indexOf(el);
      el.dataset.delay = pos * 80;
    }
    revealIO.observe(el);
  });

  /* ── 4. SKILL BAR ANIMATION ── */
  const skillBars = document.querySelectorAll('.skill-bar');

  const barIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        setTimeout(() => {
          bar.style.width = bar.dataset.width;
        }, 200);
        barIO.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  skillBars.forEach(bar => barIO.observe(bar));

  
  const sections  = document.querySelectorAll('section[id], div[id="hero"]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  function updateActiveNav() {
    let current = '';
    sections.forEach(sec => {
      const secTop = sec.getBoundingClientRect().top;
      if (secTop <= 120) current = sec.id;
    });
    navAnchors.forEach(a => {
      const href = a.getAttribute('href').replace('#', '');
      a.classList.toggle('active', href === current);
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  /* ── 6. TYPED HERO SUBTITLE ── */
  const typedEl = document.getElementById('typed-text');
  if (typedEl) {
    const phrases = [
      'Frontend Developer',
      'Open Source Learner',
      'C++ & DSA Enthusiast',
      'B.Tech @ MMMUT',
    ];
    let pIdx = 0, cIdx = 0, deleting = false;

    function type() {
      const phrase = phrases[pIdx];
      if (!deleting) {
        typedEl.textContent = phrase.substring(0, cIdx + 1);
        cIdx++;
        if (cIdx === phrase.length) {
          deleting = true;
          setTimeout(type, 1800);
          return;
        }
      } else {
        typedEl.textContent = phrase.substring(0, cIdx - 1);
        cIdx--;
        if (cIdx === 0) {
          deleting = false;
          pIdx = (pIdx + 1) % phrases.length;
        }
      }
      setTimeout(type, deleting ? 50 : 90);
    }
    type();
  }

  
  const navbar = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.4)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  }, { passive: true });

  
  const footer = document.querySelector('footer');
  if (footer) {
    footer.style.cursor = 'none';
    footer.addEventListener('dblclick', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});
