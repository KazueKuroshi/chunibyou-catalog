// Loading screen
window.addEventListener("load", () => {
  document.getElementById("preloader").style.display = "none";
});

// Mode malam toggle
document.getElementById("toggleMode").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Wishlist
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
const wishlistEl = document.getElementById("wishlistItems");
function renderWishlist() {
  wishlistEl.innerHTML = "";
  wishlist.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    wishlistEl.appendChild(li);
  });
}
renderWishlist();

// Tambah ke wishlist
document.querySelectorAll(".favBtn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const name = e.target.closest(".card").dataset.name;
    if (!wishlist.includes(name)) {
      wishlist.push(name);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      renderWishlist();
    }
  });
});

// Detail sinopsis popup
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");

document.querySelectorAll(".detailBtn").forEach((btn) => {
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

// Simulasi notifikasi stok
document.getElementById("notifyBtn").addEventListener("click", () => {
  alert("✨ Kamu akan mendapat wahyu ketika produk ini tersedia kembali!");
});

// Filter kategori
document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    document.querySelectorAll(".card").forEach(card => {
      if (filter === "all" || card.classList.contains(filter)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// Pilih bahasa
document.getElementById("languageSelect").addEventListener("change", (e) => {
  const lang = e.target.value;
  alert(lang === "jp"
    ? "✨ 言語を日本語に切り替えました（ただし実装はまだです）"
    : "✨ Bahasa diubah ke Indonesia (mode demo)");
});
