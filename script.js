// ⏳ Loading screen
window.addEventListener("load", () => {
  document.getElementById("preloader").style.display = "none";
  loadProducts();
  setupThemeToggle();
  setupLanguageToggle();
});

// 📦 Muat produk dari produk.json
function loadProducts() {
  fetch("produk.json")
    .then(res => res.json())
    .then(data => {
      const grid = document.getElementById("productGrid");
      data.forEach(item => {
        const card = document.createElement("div");
        card.className = `card ${item.kategori}`;
        if (item.class) card.classList.add(item.class);
        card.dataset.name = item.nama;
        card.dataset.description = item.detail;
        card.innerHTML = `
          <span class="badge">${item.badge}</span>
          <img src="${item.image}" alt="${item.nama}">
          <h2>${item.nama}</h2>
          <p>${item.deskripsi}</p>
          <div class="actions">
            <button class="detailBtn">🔍 Detail</button>
            <button class="favBtn">💖</button>
            <a href="${item.wa}" target="_blank">💬 Beli</a>
          </div>
        `;
        grid.appendChild(card);
      });
      setupInteractions();
    });
}

// 🌙 Mode malam
function setupThemeToggle() {
  document.getElementById("toggleMode").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });
}

// 🌐 Ganti bahasa (demo)
function setupLanguageToggle() {
  document.getElementById("languageSelect").addEventListener("change", e => {
    const lang = e.target.value;
    alert(lang === "jp"
      ? "✨ 言語を日本語に切り替えました（demo saja ya）"
      : "✨ Bahasa diubah ke Indonesia (mode demo)");
  });
}

// 🧠 Interaksi produk
function setupInteractions() {
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");
  const wishlistItems = document.getElementById("wishlistItems");

  // Modal detail
  document.querySelectorAll(".detailBtn").forEach(btn => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".card");
      modalTitle.textContent = card.dataset.name;
      modalDesc.textContent = card.dataset.description;
      modal.classList.remove("hidden");
    });
  });

  document.querySelector(".closeBtn").addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // Wishlist
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  function renderWishlist() {
    wishlistItems.innerHTML = "";
    wishlist.forEach(name => {
      const li = document.createElement("li");
      li.textContent = name;
      wishlistItems.appendChild(li);
    });
  }
  renderWishlist();

  document.querySelectorAll(".favBtn").forEach(btn => {
    btn.addEventListener("click", e => {
      const name = e.target.closest(".card").dataset.name;
      if (!wishlist.includes(name)) {
        wishlist.push(name);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        renderWishlist();
      }
    });
  });

  // Filter kategori
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      document.querySelectorAll(".card").forEach(card => {
        card.style.display = (filter === "all" || card.classList.contains(filter)) ? "block" : "none";
      });
    });
  });

  // Notifikasi restock palsu ✨
  document.getElementById("notifyBtn").addEventListener("click", () => {
    alert("✨ Kamu akan mendapat wahyu saat barang ini muncul kembali!");
  });
}
