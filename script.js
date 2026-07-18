// ============================================
// iPad Air landing page clone – interactions
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Scroll reveal animation ---------- */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach((el) => observer.observe(el));
  } else {
    // Fallback: just show everything
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- Color picker for "Hai kích cỡ" section ---------- */
  const colorDots = document.querySelectorAll('.color-dot');
  const colorImage = document.getElementById('colorImage');
  const colorName = document.getElementById('colorName');

  colorDots.forEach((dot) => {
    dot.addEventListener('click', () => {
      colorDots.forEach((d) => d.classList.remove('active'));
      dot.classList.add('active');

      const newImage = dot.getAttribute('data-image');
      const newName = dot.getAttribute('data-name');

      if (colorImage && newImage) {
        colorImage.style.opacity = 0;
        setTimeout(() => {
          colorImage.src = newImage;
          colorImage.style.opacity = 1;
        }, 150);
      }
      if (colorName && newName) {
        colorName.textContent = newName;
      }
    });
  });

  if (colorImage) {
    colorImage.style.transition = 'opacity .25s ease';
  }

  /* ---------- Mobile nav toggle (simple show/hide of links) ---------- */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('nav-links--open');
      navLinks.style.display = isOpen ? 'flex' : 'none';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '44px';
      navLinks.style.left = '0';
      navLinks.style.right = '0';
      navLinks.style.background = '#fff';
      navLinks.style.flexDirection = 'column';
      navLinks.style.padding = '20px 22px';
      navLinks.style.borderBottom = '1px solid rgba(0,0,0,0.08)';
      navLinks.style.gap = '16px';
    });
  }

  /* ---------- Smooth scroll for in-page anchors ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

});
