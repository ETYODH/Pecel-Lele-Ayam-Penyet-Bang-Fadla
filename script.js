const waNumber = "6281212410394";
let cart = [];

/* ================= DATA (TIDAK DIUBAH) ================= */

const menuUtama = [
  { nama: "Pecel Ayam + Nasi", harga: 21000, img: "gambar/pecel ayam.jpg" },
  { nama: "Ayam Penyet + Nasi", harga: 22000, img: "gambar/ayam penyet 1.jpg" },
  { nama: "Ayam Bakar + Nasi", harga: 22000, img: "gambar/ayam bakar 1.jpg" },
  { nama: "Ayam Kremes + Nasi", harga: 24000, img: "gambar/ayam kremes 1.jpg" },
  { nama: "Pecel Lele + Nasi", harga: 18000, img: "gambar/pecel lele.jpg" },
  { nama: "Lele Kremes + Nasi", harga: 21000, img: "gambar/kremes lele 1.jpg" },
  { nama: "Ayam Goreng (Tanpa Nasi)", harga: 16000, img: "gambar/goreng.jpg" },
  { nama: "Ayam Penyet (Tanpa Nasi)", harga: 17000, img: "gambar/penyettt.jpg" },
  { nama: "Ayam Bakar (Tanpa Nasi)", harga: 17000, img: "gambar/bara aja.jpg" },
  { nama: "Ayam Kremes (Tanpa Nasi)", harga: 19000, img: "gambar/ayam kremes.jpg" },
  { nama: "Lele Goreng (Tanpa Nasi)", harga: 13000, img: "gambar/lele.jpg" },
  { nama: "Lele Kremes (Tanpa Nasi)", harga: 16000, img: "gambar/lele goreng.jpg" },
];

const menuTambahan = [
  { nama: "Cumi Asin Cabe Ijo Original", harga: 25000, img: "gambar/cumi ori.jpg" },
  { nama: "Cumi Asin Cabe Ijo Saus Tiram", harga: 30000, img: "gambar/cum ST.jpg" },
  { nama: "Cah Kangkung Original / Terasi", harga: 15000, img: "gambar/kangkung  ori.jpg" },
  { nama: "Cah Kangkung Saus Tiram", harga: 20000, img: "gambar/kangkung ST.jpg" },
  { nama: "Tempe Goreng", harga: 2000, img: "gambar/tempe.jpg" },
  { nama: "Tahu Goreng", harga: 3000, img: "gambar/tahu.jpg" },
  { nama: "Kol Goreng", harga: 10000, img: "gambar/kol goreng.jpg" },
  { nama: "Kremesan (Tanpa Ayam/Lele)", harga: 8000, img: "gambar/kremesan.jpg" },
  { nama: "Nasi Putih", harga: 6000, img: "gambar/nasi.jpg" },
  { nama: "Sambel Merah 35ml", harga: 4000, img: "gambar/sambel.jpg" },
];

const menuMinuman = [
  { nama: "Es Jeruk", harga: 7000, img: "gambar/es jeruk.jpg" },
  { nama: "Es Teh Manis", harga: 5000, img: "gambar/es teh manis.jpg" },
  { nama: "Jeruk Hangat", harga: 7000, img: "gambar/jeruk hangat.jpg" },
  { nama: "Es Teh Tawar", harga: 3000, img: "gambar/es teh tawar.jpg" },
  { nama: "Air Mineral 600ml", harga: 4000, img: "gambar/lemineral.jpg" },
];

/* ================= RENDER ================= */

function renderMenu(data, target) {
  const el = document.getElementById(target);
  el.innerHTML = "";

  data.forEach((i) => {
    el.innerHTML += `
      <div class="card">
        <img src="${i.img}">
        <h4>${i.nama}</h4>
        <div class="price-badge">Rp ${i.harga.toLocaleString()}</div>
        <button onclick="addCart('${i.nama}',${i.harga})">+ Pesan</button>
      </div>`;
  });
}

/* ================= CART ================= */

function addCart(nama, harga) {
  const found = cart.find((i) => i.nama === nama);
  found ? found.qty++ : cart.push({ nama, harga, qty: 1 });
  updateCart();

  // ===== ANIMASI CARD =====
  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    if(card.innerHTML.includes(nama)){
      card.classList.add("added");
      setTimeout(()=>card.classList.remove("added"),400);
    }
  });

  // ===== TOAST =====
  const toast = document.getElementById("toast");
  toast.textContent = nama + " berhasil masuk keranjang 🛒";
  toast.classList.add("show");
  setTimeout(()=>{
    toast.classList.remove("show");
  },1500);

  // ===== SHAKE CART =====
  const floating = document.querySelector(".floating-cart");
  floating.classList.add("shake");
  setTimeout(()=>{
    floating.classList.remove("shake");
  },400);
}


function updateCart() {
  const list = document.getElementById("cart-list");
  const totalEl = document.getElementById("total");
  const countEl = document.getElementById("cart-count");
  const floatEl = document.getElementById("floating-count");

  list.innerHTML = "";
  let total = 0;
  let count = 0;

  cart.forEach((i, index) => {
    total += i.harga * i.qty;
    count += i.qty;

    list.innerHTML += `
      <li>
        <div>${i.nama}</div>
        <div>
          <button onclick="qty(${index},-1)">-</button>
          ${i.qty}
          <button onclick="qty(${index},1)">+</button>
        </div>
        <div>Rp ${(i.harga * i.qty).toLocaleString()}</div>
        <button onclick="removeItem(${index})">×</button>
      </li>`;
  });

  totalEl.textContent = "Rp " + total.toLocaleString();
  countEl.textContent = count;
  floatEl.textContent = count;
}

function qty(i, val) {
  cart[i].qty += val;
  if (cart[i].qty <= 0) cart.splice(i, 1);
  updateCart();
}

function removeItem(i) {
  cart.splice(i, 1);
  updateCart();
}

function clearCart() {
  cart = [];
  updateCart();
}

/* ================= TAB ================= */

function showTab(tab, el) {
  document.querySelectorAll("main section")
    .forEach((s) => s.classList.add("hidden"));
  document.querySelectorAll(".tab")
    .forEach((b) => b.classList.remove("active"));

  document.getElementById("tab-" + tab).classList.remove("hidden");
  el.classList.add("active");
}

/* ================= CHECKOUT ================= */

function checkout() {
  if (!cart.length) {
    alert("Keranjang kosong");
    return;
  }

  const metode = document.querySelector('input[name="payment"]:checked').value;

  if (metode === "qris") {
    const bukti = document.getElementById("bukti");
    if (!bukti.files.length) {
      alert("Upload bukti pembayaran QRIS dulu!");
      return;
    }
  }

  const note = document.getElementById("customerNote").value;

  let pesan = "Halo Bang Fadla, saya mau pesan:\n\n";
  cart.forEach((i) => {
    pesan += `• ${i.nama} x${i.qty}\n`;
  });

  if (note.trim() !== "") {
    pesan += `\nCatatan: ${note}\n`;
  }

  pesan += `\nMetode Pembayaran: ${metode === "qris" ? "QRIS ✅" : "Tunai 💵"}`;

  window.open(
    "https://wa.me/" + waNumber + "?text=" + encodeURIComponent(pesan),
    "_blank"
  );
}

/* ================= UPLOAD QRIS ================= */

document.addEventListener("DOMContentLoaded", function () {

  renderMenu(menuUtama, "menu-utama");
  renderMenu(menuTambahan, "menu-tambahan");
  renderMenu(menuMinuman, "menu-minuman");

  const paymentRadios = document.querySelectorAll('input[name="payment"]');
  const qrisBox = document.getElementById("qrisBox");
  const uploadArea = document.getElementById("uploadArea");
  const bukti = document.getElementById("bukti");
  const filePreview = document.getElementById("file-preview");

  paymentRadios.forEach(radio => {
    radio.addEventListener("change", function(){
      this.value === "qris"
        ? qrisBox.classList.remove("hidden")
        : qrisBox.classList.add("hidden");
    });
  });

  uploadArea.addEventListener("click", () => bukti.click());

  bukti.addEventListener("change", function(){
    if(!this.files.length){
      filePreview.classList.add("hidden");
      return;
    }

    const file = this.files[0];

    if(file.size > 2 * 1024 * 1024){
      alert("Ukuran maksimal 2MB");
      this.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = function(e){
      filePreview.innerHTML = `
        <img src="${e.target.result}" 
          style="max-width:150px;border-radius:10px;margin-top:10px;">
        <br>
        <button onclick="document.getElementById('bukti').value='';
        document.getElementById('file-preview').classList.add('hidden')">
        Hapus</button>
      `;
      filePreview.classList.remove("hidden");
    };
    reader.readAsDataURL(file);
  });

});

function renderMenu(data, target) {
  const el = document.getElementById(target);
  el.innerHTML = "";

  data.forEach((i) => {
    el.innerHTML += `
      <div class="card">
        <img src="${i.img}">
        
        <div class="card-body">
          <h4>${i.nama}</h4>
          <p class="price">Rp ${i.harga.toLocaleString()}</p>
          <button onclick="addCart('${i.nama}',${i.harga})">+ Pesan</button>
        </div>
      </div>`;
  });
}

// === Extra Feedback (Tidak ubah logic lama) ===

// Tambah animasi tombol & cart bump
document.addEventListener("click", function(e){
  if(e.target.tagName === "BUTTON" && e.target.innerText.includes("Pesan")){
    
    // animasi tombol
    e.target.classList.add("clicked");
    setTimeout(()=> e.target.classList.remove("clicked"), 250);

    // animasi cart
    const cartIcon = document.querySelector(".floating-cart");
    cartIcon.classList.add("bump");
    setTimeout(()=> cartIcon.classList.remove("bump"), 300);
  }
});

/* ================= APP FEEL BOOST ================= */

// Glow cart kalau ada isi
function updateCartGlow(){
  const cartIcon = document.querySelector(".floating-cart");
  const count = document.getElementById("cart-count").textContent;

  if(count > 0){
    cartIcon.classList.add("active-glow");
  }else{
    cartIcon.classList.remove("active-glow");
  }
}

// Observe perubahan cart-count
const observer = new MutationObserver(()=>{
  const badge = document.getElementById("cart-count");
  badge.classList.add("pop");
  setTimeout(()=> badge.classList.remove("pop"),300);

  updateCartGlow();
});

observer.observe(document.getElementById("cart-count"), {
  childList:true
});

// Flash card saat klik pesan
document.addEventListener("click", function(e){
  if(e.target.tagName === "BUTTON" && e.target.innerText.includes("Pesan")){
    
    const card = e.target.closest(".card");
    if(card){
      card.classList.add("flash");
      setTimeout(()=> card.classList.remove("flash"),400);
    }
  }
});

/* ================= ARC FLY NORMAL SIZE ================= */

document.addEventListener("click", function(e){

  if(e.target.tagName === "BUTTON" && e.target.innerText.includes("Pesan")){

    const card = e.target.closest(".card");
    const img = card.querySelector("img");
    const cartIcon = document.querySelector(".floating-cart");

    if(!img || !cartIcon) return;

    const imgRect = img.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();

    const flyImg = img.cloneNode(true);
    flyImg.classList.add("fly-item");

    flyImg.style.left = imgRect.left + "px";
    flyImg.style.top = imgRect.top + "px";
    flyImg.style.width = imgRect.width + "px";
    flyImg.style.height = imgRect.height + "px";

    document.body.appendChild(flyImg);

    const startX = imgRect.left;
    const startY = imgRect.top;
    const endX = cartRect.left + 25;
    const endY = cartRect.top + 25;

    const controlX = (startX + endX) / 2;
    const controlY = startY - 200;

    let startTime = null;
    const duration = 800;

    function animateArc(timestamp){
      if(!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / duration;
      const t = Math.min(progress, 1);

      const x = (1-t)*(1-t)*startX +
                2*(1-t)*t*controlX +
                t*t*endX;

      const y = (1-t)*(1-t)*startY +
                2*(1-t)*t*controlY +
                t*t*endY;

      flyImg.style.left = x + "px";
      flyImg.style.top = y + "px";

      if(t > 0.6){
        const shrink = (t - 0.6) / 0.4;
        flyImg.style.transform = `scale(${1 - shrink * 0.8})`;
        flyImg.style.opacity = 1 - shrink;
      }

      if(t < 1){
        requestAnimationFrame(animateArc);
      } else {
        flyImg.remove();
        cartIcon.classList.add("bump");
        setTimeout(()=> cartIcon.classList.remove("bump"),200);
      }
    }

    requestAnimationFrame(animateArc);
  }

});


/* ================= ARC FLY NORMAL SIZE ================= */

document.addEventListener("click", function(e){

  if(e.target.tagName === "BUTTON" && e.target.innerText.includes("Pesan")){

    const card = e.target.closest(".card");
    const img = card.querySelector("img");
    const cartIcon = document.querySelector(".floating-cart");

    if(!img || !cartIcon) return;

    const imgRect = img.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();

    const flyImg = img.cloneNode(true);
    flyImg.classList.add("fly-item");

    flyImg.style.left = imgRect.left + "px";
    flyImg.style.top = imgRect.top + "px";
    flyImg.style.width = imgRect.width + "px";
    flyImg.style.height = imgRect.height + "px";

    document.body.appendChild(flyImg);

    const startX = imgRect.left;
    const startY = imgRect.top;
    const endX = cartRect.left + 25;
    const endY = cartRect.top + 25;

    const controlX = (startX + endX) / 2;
    const controlY = startY - 200;

    let startTime = null;
    const duration = 800;

    function animateArc(timestamp){
      if(!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / duration;
      const t = Math.min(progress, 1);

      // Bezier curve
      const x = (1-t)*(1-t)*startX +
                2*(1-t)*t*controlX +
                t*t*endX;

      const y = (1-t)*(1-t)*startY +
                2*(1-t)*t*controlY +
                t*t*endY;

      flyImg.style.left = x + "px";
      flyImg.style.top = y + "px";

      // scale baru mengecil di 40% akhir
      if(t > 0.6){
        const shrink = (t - 0.6) / 0.4; // 0 sampai 1
        flyImg.style.transform = `scale(${1 - shrink * 0.8})`;
        flyImg.style.opacity = 1 - shrink;
      }

      if(t < 1){
        requestAnimationFrame(animateArc);
      } else {
        flyImg.remove();
        cartIcon.classList.add("bump");
        setTimeout(()=> cartIcon.classList.remove("bump"),200);
      }
    }

    requestAnimationFrame(animateArc);
  }

});
