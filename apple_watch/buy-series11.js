// Trạng thái cấu hình sản phẩm
let currentMaterial = "Nhôm";
let materialUpgradePrice = 0;
let currentSize = "42mm";
let sizeUpgradePrice = 0;
let currentColor = "Vàng hồng";
let currentBand = "Sport Band";
let bandUpgradePrice = 0;
let currentCare = "Không có AppleCare+";
let careUpgradePrice = 0;
const basePrice = 10999000;

// Khung xem trước: đổi màu nền thay cho đổi ảnh
let galleryGradients = [
    "linear-gradient(135deg, #f0d4d5, #ffeff1)",
    "linear-gradient(135deg, #cfd4da, #f7f8fb)",
    "linear-gradient(135deg, #22242a, #4f5666)"
];
let currentImgIndex = 0;

function changeImage(dir) {
    currentImgIndex = (currentImgIndex + dir + galleryGradients.length) % galleryGradients.length;
    document.getElementById('product-view').style.background = galleryGradients[currentImgIndex];
    document.getElementById('gallery-index').innerText = `${currentImgIndex + 1} / ${galleryGradients.length}`;
}

function updateDynamicPrice() {
    const total = basePrice + materialUpgradePrice + sizeUpgradePrice + bandUpgradePrice + careUpgradePrice;
    const installment = Math.round(total / 12);

    document.getElementById('dynamic-price').innerText = total.toLocaleString('vi-VN') + 'đ';
    document.getElementById('dynamic-installment').innerText = `hoặc ${installment.toLocaleString('vi-VN')}đ/tháng trong 12 tháng`;
    document.getElementById('summary-total-price').innerText = total.toLocaleString('vi-VN') + 'đ';
    document.getElementById('summary-product-name').innerText =
        `Apple Watch Series 11 · ${currentMaterial} ${currentSize} · ${currentColor} · ${currentBand}`;
}

function selectMaterial(name, extraPrice) {
    currentMaterial = name;
    materialUpgradePrice = extraPrice;
    const cards = event.currentTarget.parentNode.children;
    for (const c of cards) c.classList.remove('active');
    event.currentTarget.classList.add('active');
    updateDynamicPrice();
}

function selectSize(size, extraPrice) {
    currentSize = size;
    sizeUpgradePrice = extraPrice;
    const cards = event.currentTarget.parentNode.children;
    for (const c of cards) c.classList.remove('active');
    event.currentTarget.classList.add('active');
    updateDynamicPrice();
}

function selectColor(colorName, gradient) {
    currentColor = colorName;
    document.getElementById('color-label').innerText = colorName;
    document.getElementById('product-view').style.background = gradient;
    const dots = event.currentTarget.parentNode.children;
    for (const d of dots) d.classList.remove('active');
    event.currentTarget.classList.add('active');
    updateDynamicPrice();
}

function selectBand(name, extraPrice) {
    currentBand = name;
    bandUpgradePrice = extraPrice;
    const cards = event.currentTarget.parentNode.children;
    for (const c of cards) c.classList.remove('active');
    event.currentTarget.classList.add('active');
    updateDynamicPrice();
}

function selectCare(careName, extraPrice) {
    currentCare = careName;
    careUpgradePrice = extraPrice;
    const cards = event.currentTarget.parentNode.children;
    for (const c of cards) c.classList.remove('active');
    event.currentTarget.classList.add('active');
    updateDynamicPrice();
}

function executePurchase() {
    const finalName = `Apple Watch Series 11 (${currentMaterial}, ${currentSize}, ${currentColor}, ${currentBand})`;
    const finalPrice = basePrice + materialUpgradePrice + sizeUpgradePrice + bandUpgradePrice + careUpgradePrice;
    addToCart(finalName, finalPrice);
    window.location.href = 'cart.html';
}
