/**
 * Implant Vacations Travel — Main JS
 * Based on Append Bootstrap template, cleaned for production use.
 */

(function() {
  "use strict";

  /** Apply .scrolled class to the body as the page is scrolled down */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /** Mobile nav toggle */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /** Hide mobile nav on same-page/hash links */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });
  });

  /** Preloader */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /** Scroll top button */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /** Animation on scroll */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /** Correct scrolling position upon page load for URLs containing hash links */
  window.addEventListener('load', function() {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /** Navmenu Scrollspy */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    });
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * AJAX Consultation Form Submission
   */
  const consultationForm = document.getElementById('consultation-form');
  if (consultationForm) {
    consultationForm.addEventListener('submit', async function(e) {
      e.preventDefault();

      const statusEl = consultationForm.querySelector('.form-status');
      const btnText = consultationForm.querySelector('.btn-text');
      const btnLoading = consultationForm.querySelector('.btn-loading');
      const submitBtn = consultationForm.querySelector('button[type="submit"]');

      // Show loading
      statusEl.className = 'form-status';
      statusEl.textContent = '';
      btnText.style.display = 'none';
      btnLoading.style.display = 'inline';
      submitBtn.disabled = true;

      try {
        const formData = new FormData(consultationForm);
        const response = await fetch('/consultation', {
          method: 'POST',
          body: formData
        });
        const data = await response.json();

        if (data.success) {
          statusEl.className = 'form-status success';
          statusEl.textContent = data.message;
          consultationForm.reset();
        } else {
          statusEl.className = 'form-status error';
          statusEl.textContent = data.errors ? data.errors.join(' ') : 'Something went wrong.';
        }
      } catch (err) {
        statusEl.className = 'form-status error';
        statusEl.textContent = 'Network error. Please try again.';
      } finally {
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        submitBtn.disabled = false;
      }
    });
  }

  /**
   * AJAX Newsletter Form Submission
   */
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', async function(e) {
      e.preventDefault();

      const statusEl = document.querySelector('.newsletter-status');
      try {
        const formData = new FormData(newsletterForm);
        const response = await fetch('/newsletter', {
          method: 'POST',
          body: formData
        });
        const data = await response.json();

        if (data.success) {
          statusEl.className = 'newsletter-status success';
          statusEl.textContent = data.message;
          newsletterForm.reset();
        } else {
          statusEl.className = 'newsletter-status error';
          statusEl.textContent = data.errors ? data.errors.join(' ') : 'Invalid email.';
        }
      } catch (err) {
        statusEl.className = 'newsletter-status error';
        statusEl.textContent = 'Network error. Please try again.';
      }
    });
  }

})();