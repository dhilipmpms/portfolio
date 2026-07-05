(function() {
  "use strict";

  // Mobile navigation toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('nav-menu-active');
      navToggle.classList.toggle('toggle-active');
    });

    // Close menu when clicking links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('nav-menu-active');
        navToggle.classList.remove('toggle-active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('nav-menu-active');
        navToggle.classList.remove('toggle-active');
      }
    });
  }

  // Active navigation highlight on scroll
  const sections = document.querySelectorAll('section[id]');
  
  function highlightNavOnScroll() {
    const scrollY = window.scrollY;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add('nav-link-active');
        } else {
          navLink.classList.remove('nav-link-active');
        }
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll);
  window.addEventListener('load', highlightNavOnScroll);

  // Tagline typewriter rotator loop
  const rotateElem = document.querySelector('.txt-rotate');
  if (rotateElem) {
    const toRotate = JSON.parse(rotateElem.getAttribute('data-rotate'));
    let loopNum = 0;
    let isDeleting = false;
    let txt = '';
    const period = 2000;
    
    function tick() {
      let i = loopNum % toRotate.length;
      let fullTxt = toRotate[i];

      if (isDeleting) {
        txt = fullTxt.substring(0, txt.length - 1);
      } else {
        txt = fullTxt.substring(0, txt.length + 1);
      }

      rotateElem.innerHTML = `<span class="wrap">${txt}</span>`;

      let delta = 150 - Math.random() * 100;

      if (isDeleting) { delta /= 2; }

      if (!isDeleting && txt === fullTxt) {
        delta = period;
        isDeleting = true;
      } else if (isDeleting && txt === '') {
        isDeleting = false;
        loopNum++;
        delta = 500;
      }

      setTimeout(tick, delta);
    }
    
    setTimeout(tick, 500);
  }
})();