// Điều khiển carousel "Khám phá dòng sản phẩm" trên trang watch.html
// (Có kiểm tra tồn tại phần tử nên có thể nhúng an toàn ở mọi trang.)
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('watch-carousel');
    const prevBtn = document.getElementById('btn-slide-prev');
    const nextBtn = document.getElementById('btn-slide-next');

    if (carousel && prevBtn && nextBtn) {
        const getScrollStep = () => {
            const firstCard = carousel.querySelector('.product-card');
            return firstCard ? firstCard.offsetWidth + 20 : 344;
        };

        nextBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
        });
        prevBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
        });

        const updateButtonStatus = () => {
            const currentScroll = carousel.scrollLeft;
            const maxScrollWidth = carousel.scrollWidth - carousel.clientWidth;
            prevBtn.disabled = currentScroll <= 2;
            nextBtn.disabled = currentScroll >= maxScrollWidth - 2;
        };

        carousel.addEventListener('scroll', updateButtonStatus);
        window.addEventListener('resize', updateButtonStatus);
        setTimeout(updateButtonStatus, 300);
    }

    // Thanh chọn nhanh (Series 11 / Ultra 2 / SE / So sánh / Dây đeo / Mua sắm):
    // tự xử lý bằng JS thay vì chỉ dựa vào href="#..." của trình duyệt,
    // đảm bảo luôn bấm được, và có hiệu ứng "hiện ra" rõ ràng ở khu vực đích.
    const subnavLinks = document.querySelectorAll('.subnav-item[data-target]');
    subnavLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('data-target');
            const targetEl = document.getElementById(targetId);
            if (!targetEl) return;

            e.preventDefault();
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });

            targetEl.classList.add('section-highlight');
            setTimeout(() => {
                targetEl.classList.remove('section-highlight');
            }, 900);
        });
    });
});
