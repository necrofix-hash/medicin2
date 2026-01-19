/* ============================================
   수인당 한의원 - JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  // Elements
  const header = document.querySelector('.header');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('.nav-menu');
  const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');

  // ===========================================
  // Header Scroll Effect
  // ===========================================
  function handleHeaderScroll() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 100) {
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.boxShadow = 'none';
    }
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });

  // ===========================================
  // Mobile Menu Toggle
  // ===========================================
  function openMobileMenu() {
    navMenu.classList.add('active');
    mobileNavOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
  }

  function closeMobileMenu() {
    navMenu.classList.remove('active');
    mobileNavOverlay.classList.remove('active');
    document.body.style.overflow = '';
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      if (navMenu.classList.contains('active')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (mobileNavOverlay) {
    mobileNavOverlay.addEventListener('click', closeMobileMenu);
  }

  // ===========================================
  // Smooth Scroll for Anchor Links
  // ===========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      if (href === '#') return;

      const target = document.querySelector(href);

      if (target) {
        e.preventDefault();

        // Close mobile menu if open
        closeMobileMenu();

        // Calculate header height for offset
        const headerHeight = header.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===========================================
  // Facility Image Slider
  // ===========================================
  const facilitySlider = document.getElementById('facilitySlider');

  if (facilitySlider) {
    const sliderImages = facilitySlider.querySelectorAll('.slider-img');
    const prevBtn = document.getElementById('sliderPrev');
    const nextBtn = document.getElementById('sliderNext');
    const toggleBtn = document.getElementById('sliderToggle');
    const pauseIcon = toggleBtn.querySelector('.pause-icon');
    const playIcon = toggleBtn.querySelector('.play-icon');

    let currentIndex = 0;
    let isPlaying = true;
    let sliderInterval;

    function showSlide(index) {
      sliderImages.forEach(img => img.classList.remove('active'));
      sliderImages[index].classList.add('active');
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % sliderImages.length;
      showSlide(currentIndex);
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + sliderImages.length) % sliderImages.length;
      showSlide(currentIndex);
    }

    function startSlider() {
      sliderInterval = setInterval(nextSlide, 900);
      isPlaying = true;
      pauseIcon.style.display = 'block';
      playIcon.style.display = 'none';
    }

    function stopSlider() {
      clearInterval(sliderInterval);
      isPlaying = false;
      pauseIcon.style.display = 'none';
      playIcon.style.display = 'block';
    }

    prevBtn.addEventListener('click', function() {
      stopSlider();
      prevSlide();
    });

    nextBtn.addEventListener('click', function() {
      stopSlider();
      nextSlide();
    });

    toggleBtn.addEventListener('click', function() {
      if (isPlaying) {
        stopSlider();
      } else {
        startSlider();
      }
    });

    // Start auto-play
    startSlider();
  }

  // ===========================================
  // Intersection Observer for Animations
  // ===========================================
  const animatedElements = document.querySelectorAll(
    '.card, .service-card, .doctor-card, .treatment-card, .method-card, .health-card, .review-card, .facility-item, .info-card, .quick-link-item'
  );

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // ===========================================
  // Phone Number Click Tracking
  // ===========================================
  document.querySelectorAll('a[href^="tel:"]').forEach(phoneLink => {
    phoneLink.addEventListener('click', function() {
      console.log('Phone call initiated');
    });
  });

  // ===========================================
  // Handle Window Resize
  // ===========================================
  let resizeTimer;

  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      // Close mobile menu on resize to desktop
      if (window.innerWidth > 768) {
        closeMobileMenu();
      }
    }, 250);
  });

  // ===========================================
  // Keyboard Navigation
  // ===========================================
  document.addEventListener('keydown', function(e) {
    // Close mobile menu on Escape
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      closeMobileMenu();
    }
  });

});
