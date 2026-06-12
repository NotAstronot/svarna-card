/* ============================================
   SVARNA FASHION — JavaScript Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --- Loader ---
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hidden'), 2000);
  });
  setTimeout(() => loader.classList.add('hidden'), 3000);

  // --- Custom Cursor ---
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  let cursorX = 0, cursorY = 0, followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
  });

  function animateCursor() {
    followerX += (cursorX - followerX) * 0.12;
    followerY += (cursorY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  document.querySelectorAll('a, button, .product-card, .category-card').forEach(el => {
    el.addEventListener('mouseenter', () => follower.classList.add('hover'));
    el.addEventListener('mouseleave', () => follower.classList.remove('hover'));
  });

  // --- Navbar Scroll ---
  const nav = document.getElementById('nav');
  const backToTop = document.getElementById('back-to-top');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    nav.classList.toggle('scrolled', scrollY > 50);
    backToTop.classList.toggle('visible', scrollY > 600);
    lastScroll = scrollY;
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // --- Mobile Menu ---
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // --- Smooth Scroll ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = nav.offsetHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // --- Parallax ---
  const parallaxElements = document.querySelectorAll('[data-parallax-speed]');

  function updateParallax() {
    const scrollY = window.scrollY;
    parallaxElements.forEach(el => {
      const speed = parseFloat(el.dataset.parallaxSpeed);
      const rect = el.parentElement.getBoundingClientRect();
      const offset = rect.top + scrollY;
      const yPos = (scrollY - offset) * speed;
      el.style.transform = `translateY(${yPos}px)`;
    });
  }

  // --- Hero Parallax Layers ---
  const heroLayers = document.querySelectorAll('.hero__layer');

  function updateHeroParallax() {
    const scrollY = window.scrollY;
    heroLayers.forEach((layer, i) => {
      const speed = (i + 1) * 0.15;
      layer.style.transform = `translateY(${scrollY * speed}px)`;
    });
  }

  // --- Scroll Animations ---
  const animatedElements = document.querySelectorAll('[data-animate]');

  function checkAnimations() {
    const trigger = window.innerHeight * 0.85;
    animatedElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < trigger) {
        const delay = parseInt(el.dataset.delay) || 0;
        setTimeout(() => el.classList.add('animated'), delay);
      }
    });
  }

  // --- Particles ---
  const particlesContainer = document.getElementById('particles');

  function createParticles() {
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 1}px;
        height: ${Math.random() * 4 + 1}px;
        background: rgba(26, 26, 26, ${Math.random() * 0.12 + 0.04});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: particleFloat ${Math.random() * 8 + 6}s ease-in-out ${Math.random() * 4}s infinite;
      `;
      particlesContainer.appendChild(particle);
    }

    const style = document.createElement('style');
    style.textContent = `
      @keyframes particleFloat {
        0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
        25% { transform: translate(${Math.random() * 60 - 30}px, ${Math.random() * -60}px) scale(1.5); opacity: 0.7; }
        50% { transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * -40}px) scale(0.8); opacity: 0.4; }
        75% { transform: translate(${Math.random() * -50}px, ${Math.random() * -30}px) scale(1.2); opacity: 0.6; }
      }
    `;
    document.head.appendChild(style);
  }
  createParticles();

  // --- Counter Animation ---
  function animateCounters() {
    document.querySelectorAll('[data-count]').forEach(counter => {
      const rect = counter.getBoundingClientRect();
      if (rect.top < window.innerHeight && !counter.classList.contains('counted')) {
        counter.classList.add('counted');
        const target = parseInt(counter.dataset.count);
        const duration = 2000;
        const start = performance.now();

        function update(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          counter.textContent = Math.floor(target * eased);
          if (progress < 1) requestAnimationFrame(update);
          else counter.textContent = target;
        }
        requestAnimationFrame(update);
      }
    });
  }

  // --- Product Filter ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('filter-btn--active'));
      btn.classList.add('filter-btn--active');

      const filter = btn.dataset.filter;
      productCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeInUp 0.5s var(--ease-out) forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // --- Testimonial Slider ---
  const testimonials = document.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.testimonials__dot');
  let currentSlide = 0;
  let slideInterval;

  function goToSlide(index) {
    testimonials.forEach(t => t.classList.remove('testimonial-card--active'));
    dots.forEach(d => d.classList.remove('testimonials__dot--active'));
    testimonials[index].classList.add('testimonial-card--active');
    dots[index].classList.add('testimonials__dot--active');
    currentSlide = index;
  }

  function nextSlide() {
    goToSlide((currentSlide + 1) % testimonials.length);
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      clearInterval(slideInterval);
      goToSlide(parseInt(dot.dataset.index));
      slideInterval = setInterval(nextSlide, 5000);
    });
  });

  slideInterval = setInterval(nextSlide, 5000);

  // --- Newsletter Form ---
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input');
      const btn = newsletterForm.querySelector('button span');
      btn.textContent = 'Subscribed!';
      input.value = '';
      setTimeout(() => btn.textContent = 'Subscribe', 3000);
    });
  }

  // --- Contact Form ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button span');
      btn.textContent = 'Message Sent!';
      contactForm.reset();
      setTimeout(() => btn.textContent = 'Send Message', 3000);
    });
  }

  // --- Scroll Event Listener ---
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateParallax();
        updateHeroParallax();
        checkAnimations();
        animateCounters();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Initial calls
  checkAnimations();
  animateCounters();

  // --- Add fadeInUp keyframe ---
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(styleSheet);
});
