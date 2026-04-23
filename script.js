/* ============================================
   수인당 한의원 - JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  // Elements
  const header = document.querySelector('.header');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('.nav-menu');
  const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
  const navItems = document.querySelectorAll('.nav-item');
  const dropdownItems = document.querySelectorAll('.has-dropdown');

  // ===========================================
  // Header Scroll Effect
  // ===========================================
  let lastScrollY = window.scrollY;

  function handleHeaderScroll() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 100) {
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.boxShadow = 'none';
    }

    lastScrollY = currentScrollY;
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

    // Close all dropdowns
    dropdownItems.forEach(item => item.classList.remove('active'));
  }

  mobileMenuBtn.addEventListener('click', function() {
    if (navMenu.classList.contains('active')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  mobileNavOverlay.addEventListener('click', closeMobileMenu);

  // ===========================================
  // Mobile Dropdown Toggle
  // ===========================================
  dropdownItems.forEach(item => {
    const link = item.querySelector(':scope > a');

    link.addEventListener('click', function(e) {
      // Only toggle dropdown on mobile
      if (window.innerWidth <= 768) {
        e.preventDefault();
        item.classList.toggle('active');
      }
    });
  });

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
  // Active Navigation on Scroll
  // ===========================================
  const sections = document.querySelectorAll('section[id]');

  function highlightNavOnScroll() {
    const scrollY = window.scrollY;
    const headerHeight = header.offsetHeight;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - headerHeight - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navItems.forEach(item => {
          const link = item.querySelector('a');
          if (link && link.getAttribute('href') === `#${sectionId}`) {
            link.style.color = 'var(--brand-primary)';
          } else if (link) {
            link.style.color = '';
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

  // ===========================================
  // Intersection Observer for Animations
  // ===========================================
  const animatedElements = document.querySelectorAll(
    '.doctor-card, .treatment-card, .method-card, .health-card, .review-card, .facility-item, .info-card'
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
  // Phone Number Click Tracking (Optional)
  // ===========================================
  document.querySelectorAll('a[href^="tel:"]').forEach(phoneLink => {
    phoneLink.addEventListener('click', function() {
      // Analytics tracking can be added here
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
  // Image Placeholder Click Handler
  // 이미지 교체 안내 (개발용)
  // ===========================================
  const placeholders = document.querySelectorAll('.image-placeholder');

  placeholders.forEach(placeholder => {
    placeholder.addEventListener('click', function() {
      const content = this.querySelector('.placeholder-content');
      if (content) {
        const size = content.querySelector('small')?.textContent || '이미지';
        console.log(`이미지 교체 필요: ${size}`);
      }
    });
  });

  // ===========================================
  // Lazy Loading for Images (Future Implementation)
  // ===========================================
  // 실제 이미지 추가 시 lazy loading 적용
  // const lazyImages = document.querySelectorAll('img[data-src]');
  // const imageObserver = new IntersectionObserver((entries) => {
  //   entries.forEach(entry => {
  //     if (entry.isIntersecting) {
  //       const img = entry.target;
  //       img.src = img.dataset.src;
  //       img.removeAttribute('data-src');
  //       imageObserver.unobserve(img);
  //     }
  //   });
  // });
  // lazyImages.forEach(img => imageObserver.observe(img));

});

// ===========================================
// 이미지 교체 헬퍼 함수
// 개발자/관리자용 - 콘솔에서 사용
// ===========================================
window.replaceImage = function(selector, imageSrc, altText = '') {
  const placeholder = document.querySelector(selector);
  if (placeholder) {
    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = altText;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    placeholder.replaceWith(img);
    console.log(`이미지 교체 완료: ${selector}`);
  } else {
    console.error(`선택자를 찾을 수 없습니다: ${selector}`);
  }
};

// 사용 예시 (콘솔에서):
// replaceImage('.hero-image .image-placeholder', '/images/hero.jpg', '수인당 한의원 외관')
