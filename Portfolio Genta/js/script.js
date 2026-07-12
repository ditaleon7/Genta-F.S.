/* =============================================================
   PORTFOLIO — GENTA FHANY SAPUTRA
   Vanilla JS — navigasi, reveal on scroll, tahun footer
   ============================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Tombol kembali ke atas ---------- */
  var backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    var toggleBackToTop = function () {
      var shouldShow = window.scrollY > window.innerHeight * 0.6;
      backToTopBtn.classList.toggle('is-visible', shouldShow);
    };

    window.addEventListener('scroll', toggleBackToTop, { passive: true });
    toggleBackToTop();

    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Toggle menu mobile ---------- */
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Tutup menu mobile setiap link diklik
    var linkItems = navLinks.querySelectorAll('a');
    linkItems.forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('is-open');
        navToggle.classList.remove('is-open');
      });
    });
  }

  /* ---------- Highlight menu aktif sesuai scroll ---------- */
  var sections = document.querySelectorAll('section[id], header[id]');
  var navAnchors = document.querySelectorAll('.nav-link');

  if (sections.length && navAnchors.length && 'IntersectionObserver' in window) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          navAnchors.forEach(function (a) {
            a.classList.toggle('active', a.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

    sections.forEach(function (sec) { navObserver.observe(sec); });
  }

  /* ---------- Reveal saat elemen masuk viewport ---------- */
  var revealEls = document.querySelectorAll('[data-reveal]');

  if (revealEls.length) {
    if ('IntersectionObserver' in window) {
      var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry, index) {
          if (entry.isIntersecting) {
            var target = entry.target;
            var delay = target.dataset.delay || (index * 60);
            setTimeout(function () {
              target.classList.add('reveal', 'is-visible');
            }, Number(delay));
            revealObserver.unobserve(target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

      revealEls.forEach(function (el) {
        el.classList.add('reveal');
        revealObserver.observe(el);
      });
    } else {
      // Fallback tanpa IntersectionObserver: langsung tampilkan
      revealEls.forEach(function (el) {
        el.classList.add('reveal', 'is-visible');
      });
    }
  }

  /* ---------- Beri jeda bertahap pada kartu skill & kontak ---------- */
  var staggerGroups = [
    document.querySelectorAll('.skills-grid .skill-doc'),
    document.querySelectorAll('.contact-grid .contact-card'),
    document.querySelectorAll('.timeline .timeline-item')
  ];

  staggerGroups.forEach(function (group) {
    group.forEach(function (el, i) {
      el.dataset.delay = i * 90;
    });
  });

  /* ---------- Info: lengkapi tautan Instagram Anda di sini ---------- */
  var instagramLink = document.getElementById('instagramLink');
  if (instagramLink) {
    // Ganti '#' di bawah ini dengan URL profil Instagram Anda, misalnya:
    // instagramLink.href = 'https://instagram.com/username_anda';
  }

  /* ---------- Animasi alam: kunang-kunang mengambang lembut ---------- */
  initNatureAnimation();

});

function initNatureAnimation() {
  var canvas = document.getElementById('natureCanvas');
  if (!canvas || !canvas.getContext) return;

  var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  var ctx = canvas.getContext('2d');
  var particles = [];
  var width, height, dpr;

  var PARTICLE_COLOR = '110, 242, 166'; // mint hijau (--accent) dalam format rgb

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function countByViewport() {
    var area = width * height;
    var count = Math.round(area / 26000);
    return Math.max(18, Math.min(count, 55));
  }

  function makeParticle() {
    return {
      x: Math.random() * width,
      y: height + Math.random() * height * 0.5,
      radius: 1 + Math.random() * 2.2,
      speedY: 0.12 + Math.random() * 0.28,
      driftAmp: 10 + Math.random() * 26,
      driftSpeed: 0.2 + Math.random() * 0.5,
      driftPhase: Math.random() * Math.PI * 2,
      baseX: 0,
      flickerPhase: Math.random() * Math.PI * 2,
      flickerSpeed: 0.6 + Math.random() * 1.1
    };
  }

  function seedParticles() {
    var target = countByViewport();
    particles = [];
    for (var i = 0; i < target; i++) {
      var p = makeParticle();
      p.y = Math.random() * height;
      p.baseX = p.x;
      particles.push(p);
    }
  }

  var t = 0;

  function tick() {
    t += 0.016;
    ctx.clearRect(0, 0, width, height);

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];

      p.y -= p.speedY;
      var sway = Math.sin(t * p.driftSpeed + p.driftPhase) * p.driftAmp;
      var x = p.baseX + sway;

      if (p.y < -20) {
        p.y = height + 20;
        p.baseX = Math.random() * width;
        p.driftPhase = Math.random() * Math.PI * 2;
      }

      var flicker = 0.35 + 0.45 * (0.5 + 0.5 * Math.sin(t * p.flickerSpeed + p.flickerPhase));

      ctx.beginPath();
      var glow = ctx.createRadialGradient(x, p.y, 0, x, p.y, p.radius * 5);
      glow.addColorStop(0, 'rgba(' + PARTICLE_COLOR + ',' + (flicker * 0.9).toFixed(3) + ')');
      glow.addColorStop(1, 'rgba(' + PARTICLE_COLOR + ',0)');
      ctx.fillStyle = glow;
      ctx.arc(x, p.y, p.radius * 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = 'rgba(' + PARTICLE_COLOR + ',' + flicker.toFixed(3) + ')';
      ctx.arc(x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(tick);
  }

  var resizeTimeout;
  function scheduleResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function () {
      resize();
      seedParticles();
    }, 200);
  }

  window.addEventListener('resize', scheduleResize);

  resize();
  seedParticles();
  requestAnimationFrame(tick);
}