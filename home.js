// ============================================
// Trang chủ Apple – Homepage interactions
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Apple TV+ carousel drag/scroll with mouse wheel horizontal ---------- */
  const carousel = document.querySelector('.tv-carousel');
  if (carousel) {
    carousel.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        carousel.scrollLeft += e.deltaY;
      }
    }, { passive: false });

    // Simple click-and-drag scrolling for desktop
    let isDown = false;
    let startX;
    let scrollLeft;

    carousel.addEventListener('mousedown', (e) => {
      isDown = true;
      carousel.classList.add('dragging');
      startX = e.pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
    });
    carousel.addEventListener('mouseleave', () => { isDown = false; });
    carousel.addEventListener('mouseup', () => { isDown = false; });
    carousel.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX) * 1.2;
      carousel.scrollLeft = scrollLeft - walk;
    });
  }

  /* ---------- "Watch now" tile click just gives a soft interaction ---------- */
  document.querySelectorAll('.tv-watch-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  });

});
