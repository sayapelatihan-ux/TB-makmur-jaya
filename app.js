const products = [
  {
    id: 'p1',
    name: 'Semen Tiga Roda',
    price: 98000,
    stock: 120,
    category: 'Semen',
    image: 'https://images.unsplash.com/photo-1512758017271-9c0b5d45551b?auto=format&fit=crop&w=800&q=80',
    description: 'Semen berkualitas tinggi untuk pengecoran dan bangunan rumah.',
    reviews: [
      { user: 'Dewi', rating: 5, comment: 'Sangat kuat, hasil cor rapi.', date: '2026-05-18' },
      { user: 'Hendra', rating: 4, comment: 'Cepat kering dan mudah digunakan.', date: '2026-05-22' }
    ]
  },
  {
    id: 'p2',
    name: 'Besi Beton 10mm',
    price: 75000,
    stock: 90,
    category: 'Besi',
    image: 'https://images.unsplash.com/photo-1592399965565-6dd08de5a0fa?auto=format&fit=crop&w=800&q=80',
    description: 'Besi beton berkualitas tinggi untuk rangka dan kolom struktur.',
    reviews: [
      { user: 'Anton', rating: 5, comment: 'Kokoh dan tidak mudah bengkok.', date: '2026-05-10' },
      { user: 'Mira', rating: 4, comment: 'Harga cocok untuk pekerjaan konstruksi.', date: '2026-05-20' }
    ]
  },
  {
    id: 'p3',
    name: 'Cat Tembok 20kg',
    price: 250000,
    stock: 55,
    category: 'Cat',
    image: 'https://images.unsplash.com/photo-1619581351395-ee92b22dc8a7?auto=format&fit=crop&w=800&q=80',
    description: 'Cat tembok tahan lama dengan hasil warna matte sempurna.',
    reviews: [
      { user: 'Sari', rating: 5, comment: 'Warna kuat dan tahan lama.', date: '2026-05-17' },
      { user: 'Rudi', rating: 4, comment: 'Mudah diaplikasikan dengan kuas.', date: '2026-05-25' }
    ]
  },
  {
    id: 'p4',
    name: 'Keramik Lantai 60x60',
    price: 120000,
    stock: 65,
    category: 'Keramik',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
    description: 'Keramik lantai ukuran 60x60 untuk ruangan elegan dan mudah dibersihkan.',
    reviews: [
      { user: 'Linda', rating: 5, comment: 'Lantai jadi lebih mewah.', date: '2026-05-14' },
      { user: 'Agus', rating: 4, comment: 'Kualitas pas dengan harga.', date: '2026-05-21' }
    ]
  },
  {
    id: 'p5',
    name: 'Paku 10cm',
    price: 55000,
    stock: 230,
    category: 'Perkakas',
    image: 'https://images.unsplash.com/photo-1567016682766-2a68608d8aa8?auto=format&fit=crop&w=800&q=80',
    description: 'Paku serbaguna untuk pemasangan kayu dan rangka ringan.',
    reviews: [
      { user: 'Budi', rating: 5, comment: 'Harga murah dan kuat untuk kayu.', date: '2026-05-11' },
      { user: 'Nina', rating: 4, comment: 'Paku tidak berkarat meskipun disimpan lama.', date: '2026-05-23' }
    ]
  },
  {
    id: 'p6',
    name: 'Triplek 12mm',
    price: 200000,
    stock: 40,
    category: 'Kayu',
    image: 'https://images.unsplash.com/photo-1517630801048-41a31d1a2f0f?auto=format&fit=crop&w=800&q=80',
    description: 'Triplek 12mm cocok untuk plafon, partisi, dan furniture ringan.',
    reviews: [
      { user: 'Iman', rating: 5, comment: 'Kualitas triplek sangat baik.', date: '2026-05-19' },
      { user: 'Tina', rating: 4, comment: 'Permukaannya rata dan mudah dipotong.', date: '2026-05-24' }
    ]
  }
];

const users = [
  { email: 'admin@tbmj.com', password: 'makmur123', name: 'Admin TB Makmur Jaya' },
  { email: 'user@tbmj.com', password: 'pelanggan123', name: 'Pelanggan' }
];

const storageKeys = {
  cart: 'tbmj_cart',
  transactions: 'tbmj_transactions',
  user: 'tbmj_user'
};

let cart = loadCart();
let transactions = loadTransactions();
let currentUser = loadUser();
let visibleProducts = [...products];

const elements = {
  authButton: document.getElementById('authButton'),
  productGrid: document.getElementById('productGrid'),
  cartItems: document.getElementById('cartItems'),
  cartCount: document.getElementById('cartCount'),
  cartTotal: document.getElementById('cartTotal'),
  checkoutButton: document.getElementById('checkoutButton'),
  transactionList: document.getElementById('transactionList'),
  incomeTotal: document.getElementById('incomeTotal'),
  expenseTotal: document.getElementById('expenseTotal'),
  cashBalance: document.getElementById('cashBalance'),
  summaryProducts: document.getElementById('summaryProducts'),
  summaryReviews: document.getElementById('summaryReviews'),
  summaryTransactions: document.getElementById('summaryTransactions'),
  summaryBalance: document.getElementById('summaryBalance'),
  productSearch: document.getElementById('productSearch'),
  searchSuggestions: document.getElementById('searchSuggestions'),
  modalOverlay: document.getElementById('modalOverlay'),
  modalContent: document.getElementById('modalContent'),
  closeModal: document.getElementById('closeModal'),
  transactionType: document.getElementById('transactionType'),
  transactionAmount: document.getElementById('transactionAmount'),
  transactionNote: document.getElementById('transactionNote'),
  addTransactionButton: document.getElementById('addTransactionButton'),
  showRecommended: document.getElementById('showRecommended'),
  showAllProducts: document.getElementById('showAllProducts')
};

const sectionButtons = document.querySelectorAll('[data-section]');
const panels = {
  catalog: document.getElementById('catalogSection'),
  cart: document.getElementById('cartSection'),
  transactions: document.getElementById('transactionsSection')
};

function init() {
  bindEvents();
  renderAll();
}

function bindEvents() {
  elements.authButton.addEventListener('click', handleAuth);
  elements.checkoutButton.addEventListener('click', handleCheckout);
  elements.addTransactionButton.addEventListener('click', handleAddTransaction);
  elements.productSearch.addEventListener('input', handleSearchInput);
  elements.productSearch.addEventListener('keydown', handleSearchKeydown);
  elements.closeModal.addEventListener('click', closeModal);
  elements.modalOverlay.addEventListener('click', (event) => {
    if (event.target === elements.modalOverlay) {
      closeModal();
    }
  });
  elements.showRecommended.addEventListener('click', showRecommendedProducts);
  elements.showAllProducts.addEventListener('click', showAllProducts);
  sectionButtons.forEach((button) => {
    button.addEventListener('click', () => switchSection(button.dataset.section));
  });
}

function loadCart() {
  return JSON.parse(localStorage.getItem(storageKeys.cart) || '[]');
}

function saveCart() {
  localStorage.setItem(storageKeys.cart, JSON.stringify(cart));
}

function loadTransactions() {
  return JSON.parse(localStorage.getItem(storageKeys.transactions) || '[]');
}

function saveTransactions() {
  localStorage.setItem(storageKeys.transactions, JSON.stringify(transactions));
}

function loadUser() {
  return JSON.parse(localStorage.getItem(storageKeys.user) || 'null');
}

function saveUser() {
  localStorage.setItem(storageKeys.user, JSON.stringify(currentUser));
}

function renderAll() {
  renderAuthState();
  renderProducts();
  renderCart();
  renderTransactions();
  renderSummary();
}

function renderAuthState() {
  if (currentUser) {
    elements.authButton.textContent = `Logout (${currentUser.name})`;
  } else {
    elements.authButton.textContent = 'Login';
  }
}

function handleAuth() {
  if (currentUser) {
    currentUser = null;
    saveUser();
    showToast('Anda telah logout.');
    renderAll();
    return;
  }

  const email = prompt('Masukkan email:', 'admin@tbmj.com');
  const password = prompt('Masukkan password:', 'makmur123');

  if (!email || !password) {
    showToast('Login dibatalkan.');
    return;
  }

  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

  if (!user) {
    showToast('Email atau password tidak valid.');
    return;
  }

  currentUser = { name: user.name, email: user.email };
  saveUser();
  showToast(`Selamat datang, ${currentUser.name}!`);
  renderAll();
}

function renderProducts(filtered = visibleProducts) {
  elements.productGrid.innerHTML = '';
  if (!filtered.length) {
    elements.productGrid.innerHTML = '<p class="info-note">Tidak ada produk sesuai pencarian.</p>';
    return;
  }

  filtered.forEach((product) => {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" loading="lazy" />
      <div class="card-body">
        <h3>${product.name}</h3>
        <div class="meta">
          <span class="price">Rp ${numberFormat(product.price)}</span>
          <span>Stok ${product.stock}</span>
        </div>
        <p class="description">${product.description}</p>
        <div class="meta">
          <span>Rating ${averageRating(product.reviews)} ★</span>
          <span>${product.reviews.length} ulasan</span>
        </div>
        <div class="actions">
          <button class="view" data-action="view" data-id="${product.id}">Lihat Produk</button>
          <button class="add" data-action="add" data-id="${product.id}">Tambah Keranjang</button>
        </div>
      </div>
    `;

    card.querySelector('[data-action="view"]').addEventListener('click', () => openProductModal(product));
    card.querySelector('[data-action="add"]').addEventListener('click', () => addToCart(product.id));
    elements.productGrid.appendChild(card);
  });
  updateSummaryPanels();
}

function averageRating(reviews) {
  if (!reviews.length) return 0;
  return (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1);
}

function numberFormat(value) {
  return value.toLocaleString('id-ID');
}

function addToCart(productId) {
  const product = products.find((item) => item.id === productId);
  if (!product || product.stock <= 0) {
    showToast('Produk tidak tersedia.');
    return;
  }
  const existing = cart.find((item) => item.productId === productId);
  if (existing) {
    if (existing.quantity < product.stock) {
      existing.quantity += 1;
    } else {
      showToast('Stok tidak mencukupi.');
      return;
    }
  } else {
    cart.push({ productId, quantity: 1 });
  }
  saveCart();
  renderCart();
  showToast(`Produk ${product.name} ditambahkan ke keranjang.`);
}

function renderCart() {
  elements.cartItems.innerHTML = '';
  if (!cart.length) {
    elements.cartItems.innerHTML = '<tr><td colspan="5">Keranjang Anda masih kosong.</td></tr>';
    elements.cartCount.textContent = '0';
    elements.cartTotal.textContent = 'Rp 0';
    return;
  }

  let total = 0;
  cart.forEach((item) => {
    const product = products.find((p) => p.id === item.productId);
    const subtotal = product.price * item.quantity;
    total += subtotal;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${product.name}</td>
      <td>Rp ${numberFormat(product.price)}</td>
      <td><input type="number" min="1" max="${product.stock}" value="${item.quantity}" data-id="${product.id}" class="cart-qty" /></td>
      <td>Rp ${numberFormat(subtotal)}</td>
      <td><button data-id="${product.id}">Hapus</button></td>
    `;
    row.querySelector('input').addEventListener('change', handleQuantityChange);
    row.querySelector('button').addEventListener('click', () => removeFromCart(product.id));
    elements.cartItems.appendChild(row);
  });

  elements.cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  elements.cartTotal.textContent = `Rp ${numberFormat(total)}`;
}

function handleQuantityChange(event) {
  const productId = event.target.dataset.id;
  const value = Number(event.target.value);
  const product = products.find((p) => p.id === productId);
  if (!product) return;
  const cartItem = cart.find((item) => item.productId === productId);
  if (!cartItem) return;
  if (value < 1) {
    removeFromCart(productId);
    return;
  }
  if (value > product.stock) {
    event.target.value = product.stock;
    cartItem.quantity = product.stock;
    showToast('Jumlah melebihi stok tersedia.');
  } else {
    cartItem.quantity = value;
  }
  saveCart();
  renderCart();
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.productId !== productId);
  saveCart();
  renderCart();
  showToast('Produk dihapus dari keranjang.');
}

function handleCheckout() {
  if (!currentUser) {
    showToast('Silakan login terlebih dahulu untuk checkout.');
    return;
  }

  if (!cart.length) {
    showToast('Keranjang kosong, tidak ada yang bisa dibayar.');
    return;
  }

  const soldItems = cart.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    product.stock = Math.max(product.stock - item.quantity, 0);
    return { name: product.name, quantity: item.quantity, subtotal: product.price * item.quantity };
  });

  const total = soldItems.reduce((sum, item) => sum + item.subtotal, 0);
  transactions.unshift({ date: new Date().toISOString(), type: 'income', amount: total, note: 'Penjualan barang', details: soldItems });
  saveTransactions();
  cart = [];
  saveCart();
  renderAll();
  showToast(`Checkout berhasil. Total pembayaran Rp ${numberFormat(total)}.`);
}

function renderTransactions() {
  elements.transactionList.innerHTML = '';
  if (!transactions.length) {
    elements.transactionList.innerHTML = '<tr><td colspan="4">Belum ada data transaksi.</td></tr>';
    updateTransactionSummary();
    return;
  }

  transactions.forEach((txn) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${new Date(txn.date).toLocaleString('id-ID')}</td>
      <td>${txn.type === 'income' ? 'Uang Masuk' : 'Uang Keluar'}</td>
      <td>${txn.type === 'income' ? 'Rp ' : '- Rp '}${numberFormat(txn.amount)}</td>
      <td>${txn.note}</td>
    `;
    elements.transactionList.appendChild(row);
  });
  updateTransactionSummary();
}

function updateTransactionSummary() {
  const income = transactions.filter((txn) => txn.type === 'income').reduce((sum, txn) => sum + txn.amount, 0);
  const expense = transactions.filter((txn) => txn.type === 'expense').reduce((sum, txn) => sum + txn.amount, 0);
  const balance = income - expense;
  elements.incomeTotal.textContent = `Rp ${numberFormat(income)}`;
  elements.expenseTotal.textContent = `Rp ${numberFormat(expense)}`;
  elements.cashBalance.textContent = `Rp ${numberFormat(balance)}`;
  elements.summaryBalance.textContent = `Rp ${numberFormat(balance)}`;
}

function handleAddTransaction() {
  const amount = Number(elements.transactionAmount.value);
  const note = elements.transactionNote.value.trim() || 'Transaksi kas manual';
  const type = elements.transactionType.value;

  if (!amount || amount <= 0) {
    showToast('Masukkan jumlah transaksi yang valid.');
    return;
  }

  transactions.unshift({ date: new Date().toISOString(), type, amount, note });
  saveTransactions();
  elements.transactionAmount.value = '';
  elements.transactionNote.value = '';
  renderTransactions();
  showToast('Transaksi berhasil ditambahkan.');
}

function renderSummary() {
  elements.summaryProducts.textContent = products.length;
  const allReviews = products.reduce((sum, product) => sum + product.reviews.length, 0);
  elements.summaryReviews.textContent = allReviews;
  elements.summaryTransactions.textContent = transactions.length;
  updateTransactionSummary();
}

function switchSection(target) {
  Object.entries(panels).forEach(([key, panel]) => {
    panel.classList.toggle('hidden', key !== target);
  });
  if (target === 'catalog') {
    elements.productSearch.focus();
  }
}

function showRecommendedProducts() {
  visibleProducts = [...products].sort((a, b) => b.reviews.length - a.reviews.length).slice(0, 4);
  renderProducts(visibleProducts);
  showToast('Menampilkan rekomendasi produk populer.');
}

function showAllProducts() {
  visibleProducts = [...products];
  renderProducts();
  showToast('Menampilkan semua produk.');
}

function handleSearchInput(event) {
  const query = event.target.value.trim().toLowerCase();
  const matches = products.filter((product) => product.name.toLowerCase().includes(query));
  if (!query || !matches.length) {
    elements.searchSuggestions.classList.add('hidden');
    renderProducts(query ? matches : products);
    return;
  }
  renderProducts(matches);
  elements.searchSuggestions.innerHTML = matches.slice(0, 5).map((product) => `<button data-id="${product.id}">${product.name}</button>`).join('');
  elements.searchSuggestions.classList.remove('hidden');
  elements.searchSuggestions.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', () => {
      const selected = products.find((product) => product.id === button.dataset.id);
      if (selected) {
        openProductModal(selected);
      }
      elements.searchSuggestions.classList.add('hidden');
    });
  });
}

function handleSearchKeydown(event) {
  if (event.key === 'Escape') {
    elements.searchSuggestions.classList.add('hidden');
  }
}

function openProductModal(product) {
  const reviewsHtml = product.reviews
    .map(
      (review) => `
        <div class="review-item">
          <strong>${review.user}</strong>
          <div class="rating">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
          <p>${review.comment}</p>
          <small>${review.date}</small>
        </div>
      `
    )
    .join('');

  elements.modalContent.innerHTML = `
    <div class="modal-content">
      <img src="${product.image}" alt="${product.name}" />
      <h2>${product.name}</h2>
      <div class="meta-list">
        <div class="meta-item"><span>Harga</span><strong>Rp ${numberFormat(product.price)}</strong></div>
        <div class="meta-item"><span>Stok Tersedia</span><strong>${product.stock}</strong></div>
        <div class="meta-item"><span>Kategori</span><strong>${product.category}</strong></div>
        <div class="meta-item"><span>Rating</span><strong>${averageRating(product.reviews)} ★</strong></div>
      </div>
      <p class="description">${product.description}</p>
      <div class="actions">
        <button class="add" id="modalAddButton">Tambah Keranjang</button>
      </div>
      <section class="review-section">
        <h3>Ulasan Produk</h3>
        <div class="review-list">${reviewsHtml || '<p class="info-note">Belum ada ulasan untuk produk ini.</p>'}</div>
      </section>
      <section class="review-form">
        <h3>Berikan Ulasan</h3>
        <div class="field-group">
          <label for="reviewRating">Rating</label>
          <select id="reviewRating">
            <option value="5">5 - Sangat Baik</option>
            <option value="4">4 - Baik</option>
            <option value="3">3 - Cukup</option>
            <option value="2">2 - Kurang</option>
            <option value="1">1 - Buruk</option>
          </select>
        </div>
        <div class="field-group">
          <label for="reviewComment">Komentar</label>
          <textarea id="reviewComment" rows="3" placeholder="Tulis pengalaman Anda..." style="width:100%;padding:14px;border:1px solid var(--border);border-radius:14px;"></textarea>
        </div>
        <button class="primary-button" id="submitReviewButton">Kirim Ulasan</button>
      </section>
    </div>
  `;

  document.getElementById('modalAddButton').addEventListener('click', () => {
    addToCart(product.id);
    closeModal();
  });

  document.getElementById('submitReviewButton').addEventListener('click', () => {
    submitReview(product.id);
  });

  elements.modalOverlay.classList.remove('hidden');
}

function closeModal() {
  elements.modalOverlay.classList.add('hidden');
}

function submitReview(productId) {
  if (!currentUser) {
    showToast('Silakan login terlebih dahulu untuk menambahkan ulasan.');
    return;
  }

  const rating = Number(document.getElementById('reviewRating').value);
  const comment = document.getElementById('reviewComment').value.trim();

  if (!comment) {
    showToast('Silakan tuliskan komentar ulasan Anda.');
    return;
  }

  const product = products.find((p) => p.id === productId);
  product.reviews.unshift({ user: currentUser.name, rating, comment, date: new Date().toLocaleDateString('id-ID') });
  renderProducts(visibleProducts);
  renderSummary();
  openProductModal(product);
  showToast('Ulasan berhasil ditambahkan.');
}

function updateSummaryPanels() {
  elements.summaryProducts.textContent = products.length;
  const reviews = products.reduce((sum, product) => sum + product.reviews.length, 0);
  elements.summaryReviews.textContent = reviews;
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.remove('hidden');
  clearTimeout(window.toastTimeout);
  window.toastTimeout = setTimeout(() => {
    toast.classList.add('hidden');
  }, 3000);
}

init();
