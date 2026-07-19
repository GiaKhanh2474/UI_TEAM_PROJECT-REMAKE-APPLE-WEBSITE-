// Shared LocalStorage Apple Cart Logic
let cart = JSON.parse(localStorage.getItem('apple_store_cart')) || [];

function addToCart(name, price) {
    const existingIndex = cart.findIndex(item => item.name === name);
    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({ name: name, price: price, quantity: 1 });
    }
    saveCart();
    updateUI();
    flashCartDropdown();
}

function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    saveCart();
    updateUI();
}

function saveCart() {
    localStorage.setItem('apple_store_cart', JSON.stringify(cart));
}

function updateUI() {
    const cartCount = document.getElementById('cart-count');
    const cartItemsWrapper = document.getElementById('cart-items-wrapper');
    const cartTotalAmount = document.getElementById('cart-total-amount');

    if (!cartCount || !cartItemsWrapper || !cartTotalAmount) return;

    // Total count items
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.innerText = totalCount;

    // Render elements
    if (cart.length === 0) {
        cartItemsWrapper.innerHTML = `<p style="color:#86868b; text-align:center; font-size:14px; padding:20px 0;">Giỏ hàng trống</p>`;
        cartTotalAmount.innerText = "0đ";
    } else {
        cartItemsWrapper.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>${item.price.toLocaleString('vi-VN')}đ × ${item.quantity}</p>
                </div>
                <button class="remove-btn" onclick="removeFromCart('${item.name}')">Xóa</button>
            </div>
        `).join('');
        
        const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotalAmount.innerText = totalPrice.toLocaleString('vi-VN') + "đ";
    }
}

function flashCartDropdown() {
    const dropdown = document.getElementById('cart-dropdown-box');
    if (dropdown) {
        dropdown.classList.add('active');
        setTimeout(() => {
            dropdown.classList.remove('active');
        }, 3000);
    }
}

// Global Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    updateUI();

    const cartIcon = document.getElementById('cart-icon');
    const dropdown = document.getElementById('cart-dropdown-box');

    if (cartIcon && dropdown) {
        cartIcon.addEventListener('click', (e) => {
            e.preventDefault();
            dropdown.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!cartIcon.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    }
});