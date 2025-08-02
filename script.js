// =============================================
// SCRIPT.JS - Hiệu ứng, chức năng tương tác    =
// =============================================

// Cuộn thư viện ảnh
let scrollIndex = 0;
function scrollGallery(direction) {
  const gallery = document.getElementById('gallery');
  const imageWidth = gallery.clientWidth / 4;
  const totalImages = gallery.children.length;
  const maxIndex = Math.ceil(totalImages - 4);

  scrollIndex += direction;
  if (scrollIndex < 0) scrollIndex = maxIndex;
  if (scrollIndex > maxIndex) scrollIndex = 0;

  gallery.style.transform = `translateX(-${scrollIndex * imageWidth}px)`;
}

// Phóng to ảnh
function openLightbox(index) {
  const images = [...document.querySelectorAll('.gallery img')];
  const overlay = document.createElement('div');
  overlay.className = 'image-overlay';
  overlay.innerHTML = `
    <span class="close-btn">&times;</span>
    <img src="${images[index].src}" class="zoomed-img" />
    <span class="nav-btn left">&#10094;</span>
    <span class="nav-btn right">&#10095;</span>
  `;
  document.body.appendChild(overlay);

  let currentIndex = index;
  const updateImage = (i) => {
    currentIndex = (i + images.length) % images.length;
    document.querySelector('.zoomed-img').src = images[currentIndex].src;
  };

  document.querySelector('.close-btn').onclick = () => overlay.remove();
  document.querySelector('.nav-btn.left').onclick = () => updateImage(currentIndex - 1);
  document.querySelector('.nav-btn.right').onclick = () => updateImage(currentIndex + 1);
}

// Canvas hiệu ứng vàng bay
const canvas = document.getElementById('magic-canvas');
const ctx = canvas.getContext('2d');
let width, height, particles = [];

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

for (let i = 0; i < 100; i++) {
  particles.push({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.5 + 0.5,
    speed: Math.random() * 1 + 0.5,
    alpha: Math.random() * 0.5 + 0.3
  });
}

function draw() {
  ctx.clearRect(0, 0, width, height);
  for (let p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 215, 0, ${p.alpha})`;
    ctx.fill();
    p.y += p.speed;
    if (p.y > height) p.y = -10;
  }
  requestAnimationFrame(draw);
}
draw();

// Ẩn thanh loading khi đã tải xong
window.addEventListener("load", function () {
  const loader = document.getElementById("preloader");
  loader.style.opacity = "0";
  setTimeout(() => {
    loader.style.display = "none";
  }, 500);
});
