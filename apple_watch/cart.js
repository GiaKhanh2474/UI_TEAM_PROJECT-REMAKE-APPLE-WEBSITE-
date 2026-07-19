// ---------- Giỏ hàng đơn giản (lưu trong bộ nhớ tạm của trang) ----------
let cart = [];

function formatVND(n){
  return n.toLocaleString('vi-VN') + 'đ';
}

function addToCart(name, price){
  const existing = cart.find(item => item.name === name);
  if(existing){
    existing.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  renderCart();
  showToast(`Đã thêm "${name}" vào giỏ hàng`);
  openCart();
}

function removeFromCart(name){
  cart = cart.filter(item => item.name !== name);
  renderCart();
}

function renderCart(){
  const wrapper = document.getElementById('cart-items-wrapper');
  const countEl = document.getElementById('cart-count');
  const totalEl = document.getElementById('cart-total-amount');
  if(!wrapper || !countEl || !totalEl) return;

  const totalQty = cart.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.qty * i.price, 0);

  countEl.textContent = totalQty;
  totalEl.textContent = formatVND(totalPrice);

  if(cart.length === 0){
    wrapper.innerHTML = '<div class="cart-empty">Giỏ hàng đang trống.</div>';
    return;
  }

  wrapper.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-info">
        <b>${item.name}</b>
        <span>SL: ${item.qty} × ${formatVND(item.price)}</span>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart('${item.name.replace(/'/g, "\\'")}')">Xóa</button>
    </div>
  `).join('');
}

function openCart(){
  const box = document.getElementById('cart-dropdown-box');
  if(box) box.classList.add('open');
}
function closeCart(){
  const box = document.getElementById('cart-dropdown-box');
  if(box) box.classList.remove('open');
}
function toggleCart(){
  const box = document.getElementById('cart-dropdown-box');
  if(!box) return;
  box.classList.contains('open') ? closeCart() : openCart();
}

let toastTimer;
function showToast(msg){
  let toast = document.querySelector('.cart-toast');
  if(!toast){
    toast = document.createElement('div');
    toast.className = 'cart-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

document.addEventListener('DOMContentLoaded', () => {
  const trigger = document.getElementById('cart-icon');
  const box = document.getElementById('cart-dropdown-box');
  if(trigger){
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleCart();
    });
  }
  document.addEventListener('click', (e) => {
    if(box && trigger && !box.contains(e.target) && !trigger.contains(e.target)){
      closeCart();
    }
  });
  renderCart();
});
