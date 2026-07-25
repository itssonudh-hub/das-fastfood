// Das Fastfood — menu tab toggle & small interactions

document.addEventListener('DOMContentLoaded', () => {

  // ---- Menu tab toggle ----
  const tabButtons = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.menu-panel');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tab');

      tabButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      panels.forEach(p => p.classList.remove('active'));
      const activePanel = document.getElementById(target);
      if (activePanel) activePanel.classList.add('active');
    });
  });

  // ---- Scroll reveal for sections ----
  const revealTargets = document.querySelectorAll('.signature-card, .menu-section, .gallery-item, .delivery-inner');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealTargets.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
    });
  }

  // ---- Mobile hamburger menu ----
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---- Signature dishes carousel ----
  const carTrack = document.getElementById('carTrack');
  const carPrev = document.getElementById('carPrev');
  const carNext = document.getElementById('carNext');
  const carDotsWrap = document.getElementById('carDots');

  if (carTrack && carPrev && carNext) {
    const cards = carTrack.querySelectorAll('.dish-card');

    if (carDotsWrap) {
      cards.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.setAttribute('aria-label', 'Go to dish ' + (i + 1));
        dot.addEventListener('click', () => {
          cards[i].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
        });
        carDotsWrap.appendChild(dot);
      });
    }

    const scrollByCard = (dir) => {
      const card = carTrack.querySelector('.dish-card');
      if (!card) return;
      const width = card.getBoundingClientRect().width + 20;
      carTrack.scrollBy({ left: dir * width, behavior: 'smooth' });
    };

    carPrev.addEventListener('click', () => scrollByCard(-1));
    carNext.addEventListener('click', () => scrollByCard(1));

    const updateDots = () => {
      if (!carDotsWrap) return;
      const dots = carDotsWrap.querySelectorAll('button');
      let closestIndex = 0;
      let closestDist = Infinity;
      cards.forEach((card, i) => {
        const dist = Math.abs(card.offsetLeft - carTrack.scrollLeft);
        if (dist < closestDist) { closestDist = dist; closestIndex = i; }
      });
      dots.forEach((d, i) => d.classList.toggle('active', i === closestIndex));
    };
    carTrack.addEventListener('scroll', () => {
      window.requestAnimationFrame(updateDots);
    });
    updateDots();
  }

  // ---- Sticky nav shadow on scroll ----
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });

});
