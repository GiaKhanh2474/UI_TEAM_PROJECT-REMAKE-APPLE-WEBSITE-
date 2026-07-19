// Chuyển màu khối trình chiếu (viewer) khi chọn màu khác — gọi trực tiếp
// qua onclick="selectSeriesColor(this)" trên từng nút, không phụ thuộc vào
// thời điểm DOMContentLoaded nên hoạt động ổn định hơn.
function selectSeriesColor(btn) {
  const stage = document.getElementById('heroStage');
  if (!stage || !btn) return;

  const buttons = document.querySelectorAll('.control-item');
  buttons.forEach((b) => b.classList.remove('active'));
  btn.classList.add('active');

  const gradient = btn.getAttribute('data-gradient');
  if (gradient) {
    stage.style.background = gradient;
  }
}
