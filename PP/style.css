// skrip.js
document.addEventListener('DOMContentLoaded', function() {
    // ================ VARIABEL GLOBAL ================
    let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let currentPaymentStep = 1;
    let currentPaymentMethod = 'qris';
    let menuItemsData = [];
    let currentCategory = 'all';
    let renderObserver = null; // Cache untuk intersection observer

    // ================ DATA STATIC ================
    const features = [
        {
            icon: 'fas fa-award',
            title: 'Kualitas Premium',
            description: 'Bahan-bahan terbaik dari petani lokal dan importir terpercaya untuk rasa autentik.'
        },
        {
            icon: 'fas fa-user-tie',
            title: 'Pelayanan Eksklusif',
            description: 'Pelayanan personal dari staf profesional dengan standar internasional.'
        },
        {
            icon: 'fas fa-wine-glass-alt',
            title: 'Wine Collection',
            description: 'Koleksi wine eksklusif dari berbagai negara yang dipadukan dengan menu.'
        },
        {
            icon: 'fas fa-seedling',
            title: 'Bahan Organik',
            description: 'Sayuran dan buah organik dari perkebunan sendiri untuk kesehatan optimal.'
        }
    ];

    const menuItems = [
        {
            id: 1,
            name: 'Lobster Thermidor',
            description: 'Lobster segar dengan saus thermidor klasik, keju gruyère, dan remah roti panggang.',
            price: 450000,
            category: 'appetizer',
            rating: 4.9,
            image: 'https://static01.nyt.com/images/2024/02/09/multimedia/LH-lobster-thermidor-plzk/LH-lobster-thermidor-plzk-master768.jpg?quality=75&auto=webp'
        },
        {
            id: 2,
            name: 'Wagyu Beef Steak',
            description: 'Daging wagyu A5 premium dengan saus truffle dan kentang dauphinoise.',
            price: 850000,
            category: 'main-course',
            rating: 5.0,
            image: 'https://image.idntimes.com/post/20240612/img-20240612-160446-4ff506ecf74a17f22c11b39143537d58-39231715f6560e4cdb4a24545770525a.jpg?tr=w-1200,f-webp,q-75&width=1200&format=webp&quality=75'
        },
        {
            id: 3,
            name: 'Foie Gras Terrine',
            description: 'Terrine foie gras dengan chutney buah ara dan roti brioche panggang.',
            price: 350000,
            category: 'appetizer',
            rating: 4.8,
            image: 'https://d3h1lg3ksw6i6b.cloudfront.net/media/image/2018/10/05/661a1472ec334a2893102faa531d8252_Foie+Gras+Terrine+with+65%25+Dark+Chocolate+and+Roasted+Cacao+Nibs+1_PORTA.jpg'
        },
        {
            id: 4,
            name: 'Black Cod Miso',
            description: 'Cod hitam dengan fermentasi miso 48 jam dan sayuran musiman.',
            price: 380000,
            category: 'main-course',
            rating: 4.7,
            image: 'https://i0.wp.com/wishbonekitchen.com/wp-content/uploads/2022/11/IMG_9689_jpg-2.jpg?w=1125&ssl=1'
        },
        {
            id: 5,
            name: 'Truffle Risotto',
            description: 'Risotto dengan truffle hitam segar dan parmesan reggiano.',
            price: 320000,
            category: 'main-course',
            rating: 4.8,
            image: 'https://alwaysfromscratch.com/wp-content/uploads/2023/10/Mushroom-truffle-risotto-13.jpg'
        },
        {
            id: 6,
            name: 'Chocolate Soufflé',
            description: 'Soufflé cokelat Belgia dengan es krim vanilla Madagascar.',
            price: 180000,
            category: 'dessert',
            rating: 4.9,
            image: 'https://media-cdn2.greatbritishchefs.com/media/4cgla1l1/img10652.whqc_900x600q90.webp'
        },
        {
            id: 7,
            name: 'Salmon Tartare',
            description: 'Salmon tartare dengan avocado, capers, dan dressing lemon-dill.',
            price: 280000,
            category: 'appetizer',
            rating: 4.6,
            image: 'https://images.immediate.co.uk/production/volatile/sites/2/2015/10/15144.jpg?quality=90&crop=2px,0px,596px,542px&resize=600,545'
        },
        {
            id: 8,
            name: 'Tiramisu Classico',
            description: 'Tiramisu klasik dengan mascarpone dan espresso robusta.',
            price: 150000,
            category: 'dessert',
            rating: 4.7,
            image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
            id: 9,
            name: 'Sushi Omakase',
            description: 'Koleksi 12 pieces sushi premium pilihan chef dengan ikan segar dari Tokyo, disajikan dengan wasabi autentik dan ginger pickled.',
            price: 520000,
            category: 'appetizer',
            rating: 5.0,
            image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        }
    ];

    const chefs = [
        {
            name: 'Chef Marco Alessandro',
            role: 'Executive Chef',
            bio: 'Pengalaman 20+ tahun di restoran Michelin-starred di Eropa',
            image: 'https://www.escoffier.edu/wp-content/uploads/2022/03/Smiling-male-chef-with-white-coat-and-hat-768.jpg' // chef pria profesional
        },
        {
            name: 'Chef Sofia Rodriguez',
            role: 'Pastry Chef',
            bio: 'Spesialis dessert modern dengan sentuhan tradisional',
            image: 'https://images.unsplash.com/photo-1595475038784-bbe439ff41e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
            name: 'Chef Kenji Tanaka',
            role: 'Sushi Master',
            bio: 'Ahli sushi generasi kelima dari Tokyo, Jepang',
            image: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        }
    ];

    const galleryImages = [
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ];

    // ================ FUNGSI UTILITAS ================
    function formatRupiah(amount) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    }

    function showToast(message, type = 'info') {
        const toastContainer = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'} toast-icon"></i>
            <div class="toast-content">
                <p class="toast-message">${message}</p>
            </div>
            <button class="toast-close">&times;</button>
        `;
        
        toastContainer.appendChild(toast);
        
        // Animasi masuk
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(0)';
        }, 10);
        
        // Close button event
        toast.querySelector('.toast-close').addEventListener('click', () => {
            hideToast(toast);
        });
        
        // Auto remove setelah 5 detik
        setTimeout(() => {
            if (toast.parentNode) {
                hideToast(toast);
            }
        }, 5000);
    }
    
    function hideToast(toast) {
        toast.classList.add('hiding');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }

    // ================ FUNGSI LOGIN/USER ================
    function updateUserInterface() {
        const userAvatar = document.getElementById('userAvatar');
        const dropdownAvatar = document.getElementById('dropdownAvatar');
        const dropdownUserName = document.getElementById('dropdownUserName');
        const dropdownUserEmail = document.getElementById('dropdownUserEmail');
        const cartFloating = document.getElementById('cartFloating');
        const logoutBtn = document.getElementById('logoutBtn');
        const logoutBtnText = document.getElementById('logoutBtnText');
        const logoutBtnIcon = logoutBtn.querySelector('i');
        
        if (currentUser) {
            // User sudah login
            const initial = currentUser.name.charAt(0).toUpperCase();
            userAvatar.textContent = initial;
            dropdownAvatar.textContent = initial;
            dropdownUserName.textContent = currentUser.name;
            dropdownUserEmail.textContent = currentUser.email;
            
            // Tampilkan tombol keranjang
            cartFloating.style.display = 'block';
            
            // Tampilkan tombol logout dengan text "Logout"
            logoutBtn.style.display = 'flex';
            logoutBtnText.textContent = 'Logout';
            logoutBtnIcon.className = 'fas fa-sign-out-alt';
        } else {
            // User belum login (Guest)
            userAvatar.textContent = 'G';
            dropdownAvatar.textContent = 'G';
            dropdownUserName.textContent = 'Guest';
            dropdownUserEmail.textContent = 'Silakan login untuk memesan';
            
            // Sembunyikan tombol keranjang
            cartFloating.style.display = 'none';
            
            // Tampilkan tombol login dengan text "Login"
            logoutBtn.style.display = 'flex';
            logoutBtnText.textContent = 'Login';
            logoutBtnIcon.className = 'fas fa-sign-in-alt';
        }
        
        // Update jumlah item di keranjang
        updateCartCount();
    }

    function showLoginModal() {
        const loginModal = document.getElementById('loginModal');
        loginModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function hideLoginModal() {
        const loginModal = document.getElementById('loginModal');
        loginModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    function handleLogin(event) {
        event.preventDefault();
        
        const name = document.getElementById('customerName').value.trim();
        const phone = document.getElementById('customerPhone').value.trim();
        const email = document.getElementById('customerEmail').value.trim();
        
        if (!name || !phone || !email) {
            showToast('Harap isi semua field dengan benar', 'error');
            return;
        }
        
        if (!validateEmail(email)) {
            showToast('Format email tidak valid', 'error');
            return;
        }
        
        if (!validatePhone(phone)) {
            showToast('Format nomor telepon tidak valid', 'error');
            return;
        }
        
        // Simpan user ke localStorage
        currentUser = {
            name: name,
            phone: phone,
            email: email,
            loginTime: new Date().toISOString()
        };
        
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Update UI
        updateUserInterface();
        
        // Tutup modal
        hideLoginModal();
        
        // Reset form
        document.getElementById('loginForm').reset();
        
        // Show success message
        showToast(`Selamat datang, ${name}! Anda sekarang dapat memesan menu favorit.`, 'success');
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validatePhone(phone) {
        const re = /^[0-9]{10,13}$/;
        return re.test(phone);
    }

    function handleLogout() {
        if (currentUser) {
            // Jika user sudah login, lakukan logout
            currentUser = null;
            localStorage.removeItem('currentUser');
            updateUserInterface();
            showToast('Anda telah logout', 'info');
        } else {
            // Jika user belum login (guest), tampilkan login modal
            showLoginModal();
        }
    }

    // ================ FUNGSI KERANJANG ================
    function addToCart(itemId) {
        if (!currentUser) {
            showToast('Silakan login terlebih dahulu untuk menambahkan item ke keranjang', 'error');
            return;
        }
        
        const menuItem = menuItems.find(item => item.id === itemId);
        if (!menuItem) return;
        
        // Cek apakah item sudah ada di keranjang
        const existingItem = cart.find(item => item.id === itemId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...menuItem,
                quantity: 1
            });
        }
        
        // Simpan ke localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update UI
        updateCartCount();
        
        // Show success message
        showToast(`${menuItem.name} telah ditambahkan ke keranjang`, 'success');
    }

    function removeFromCart(itemId) {
        cart = cart.filter(item => item.id !== itemId);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        updateOrderSummary();
    }

    function updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        // Tampilkan atau sembunyikan tombol keranjang
        const cartFloating = document.getElementById('cartFloating');
        cartFloating.style.display = currentUser && totalItems > 0 ? 'block' : 'none';
    }

    function updateOrderSummary() {
        const orderSummary = document.getElementById('orderSummary');
        const subtotalElement = document.getElementById('subtotal');
        const taxElement = document.getElementById('tax');
        const totalAmountElement = document.getElementById('totalAmount');
        
        if (cart.length === 0) {
            orderSummary.innerHTML = '<p style="text-align: center; padding: 2rem; color: var(--gray-color);">Keranjang Anda kosong</p>';
            subtotalElement.textContent = formatRupiah(0);
            taxElement.textContent = formatRupiah(0);
            totalAmountElement.textContent = formatRupiah(0);
            return;
        }
        
        let subtotal = 0;
        let html = '';
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            
            html += `
                <div class="order-item" data-id="${item.id}">
                    <div class="order-item-info">
                        <div class="order-item-name">${item.name}</div>
                        <div class="order-item-price">${formatRupiah(item.price)}</div>
                        <div class="order-item-quantity">
                            <button class="quantity-btn minus" data-id="${item.id}">-</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-btn plus" data-id="${item.id}">+</button>
                        </div>
                    </div>
                    <div class="order-item-total">${formatRupiah(itemTotal)}</div>
                    <button class="remove-item" data-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
        });
        
        orderSummary.innerHTML = html;
        
        // Hitung pajak 10%
        const tax = subtotal * 0.1;
        const total = subtotal + tax;
        
        subtotalElement.textContent = formatRupiah(subtotal);
        taxElement.textContent = formatRupiah(tax);
        totalAmountElement.textContent = formatRupiah(total);
        
        // Tambahkan event listeners untuk tombol quantity
        document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
            btn.addEventListener('click', function() {
                const itemId = parseInt(this.getAttribute('data-id'));
                const item = cart.find(item => item.id === itemId);
                if (item) {
                    item.quantity += 1;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    updateCartCount();
                    updateOrderSummary();
                }
            });
        });
        
        document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
            btn.addEventListener('click', function() {
                const itemId = parseInt(this.getAttribute('data-id'));
                const item = cart.find(item => item.id === itemId);
                if (item) {
                    if (item.quantity > 1) {
                        item.quantity -= 1;
                    } else {
                        removeFromCart(itemId);
                        return;
                    }
                    localStorage.setItem('cart', JSON.stringify(cart));
                    updateCartCount();
                    updateOrderSummary();
                }
            });
        });
        
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', function() {
                const itemId = parseInt(this.getAttribute('data-id'));
                removeFromCart(itemId);
            });
        });
    }

    // ================ FUNGSI PEMBAYARAN ================
    function showPaymentModal() {
        if (!currentUser) {
            showToast('Silakan login terlebih dahulu untuk melanjutkan pembayaran', 'error');
            return;
        }
        
        if (cart.length === 0) {
            showToast('Keranjang Anda kosong. Tambahkan item terlebih dahulu.', 'error');
            return;
        }
        
        const paymentModal = document.getElementById('paymentModal');
        paymentModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Reset ke step 1
        currentPaymentStep = 1;
        updatePaymentSteps();
        
        // Update order summary
        updateOrderSummary();
        
        // Generate order code
        const orderCode = `GH-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
        document.getElementById('orderCode').textContent = orderCode;
    }

    function hidePaymentModal() {
        const paymentModal = document.getElementById('paymentModal');
        paymentModal.style.display = 'none';
        document.body.style.overflow = '';
    }

    function updatePaymentSteps() {
        // Sembunyikan semua step
        document.querySelectorAll('.step').forEach(step => {
            step.classList.remove('active');
        });
        
        // Tampilkan step aktif
        document.getElementById(`step${currentPaymentStep}`).classList.add('active');
        
        // Update tombol navigasi
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const payNowBtn = document.getElementById('payNowBtn');
        
        if (currentPaymentStep === 1) {
            prevBtn.textContent = 'Balik ke Beranda';
            prevBtn.onclick = () => {
                hidePaymentModal();
                cart = [];
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartCount();
            };
            nextBtn.style.display = 'inline-flex';
            payNowBtn.style.display = 'none';
        } else if (currentPaymentStep === 2) {
            prevBtn.textContent = 'Kembali';
            prevBtn.onclick = () => {
                currentPaymentStep = 1;
                updatePaymentSteps();
            };
            nextBtn.style.display = 'none';
            payNowBtn.style.display = 'inline-flex';
        } else if (currentPaymentStep === 3) {
            prevBtn.textContent = 'Pesan Lagi';
            prevBtn.onclick = () => {
                hidePaymentModal();
                cart = [];
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartCount();
                showToast('Terima kasih atas pesanan Anda!', 'success');
            };
            nextBtn.style.display = 'none';
            payNowBtn.style.display = 'none';
        }
    }

    function setupPaymentMethods() {
        const paymentMethods = document.querySelectorAll('.payment-method');
        
        paymentMethods.forEach(method => {
            method.addEventListener('click', function() {
                // Hapus active class dari semua method
                paymentMethods.forEach(m => m.classList.remove('active'));
                
                // Tambah active class ke method yang dipilih
                this.classList.add('active');
                
                // Update payment method yang aktif
                currentPaymentMethod = this.getAttribute('data-method');
                
                // Sembunyikan semua payment details
                document.querySelectorAll('.payment-details').forEach(detail => {
                    detail.style.display = 'none';
                });
                
                // Tampilkan payment details yang sesuai
                document.getElementById(`${currentPaymentMethod}Details`).style.display = 'block';
            });
        });
    }

    function processPayment() {
        // Simulasi proses pembayaran
        showToast('Memproses pembayaran...', 'info');
        
        setTimeout(() => {
            currentPaymentStep = 3;
            updatePaymentSteps();
            
            // Kosongkan keranjang setelah pembayaran berhasil
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            
            showToast('Pembayaran berhasil! Pesanan Anda sedang diproses.', 'success');
        }, 2000);
    }

    // ================ FUNGSI RESERVASI ================
    function handleReservation(event) {
        event.preventDefault();
        
        if (!currentUser) {
            showToast('Silakan login terlebih dahulu untuk melakukan reservasi', 'error');
            return;
        }
        
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const guests = document.getElementById('guests').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const occasion = document.getElementById('occasion').value;
        const message = document.getElementById('message').value;
        
        // Validasi
        if (!name || !phone || !email || !guests || !date || !time) {
            showToast('Harap isi semua field yang wajib diisi', 'error');
            return;
        }
        
        // Buat objek reservasi
        const reservation = {
            name,
            phone,
            email,
            guests,
            date,
            time,
            occasion,
            message,
            reservationTime: new Date().toISOString(),
            status: 'pending'
        };
        
        // Simpan ke localStorage (dalam contoh nyata, ini akan dikirim ke server)
        const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
        reservations.push(reservation);
        localStorage.setItem('reservations', JSON.stringify(reservations));
        
        // Reset form
        document.getElementById('reservationForm').reset();
        
        // Set tanggal minimum untuk form
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('date').min = today;
        
        // Tampilkan notifikasi sukses
        showToast(`Reservasi berhasil! Kami akan mengonfirmasi melalui WhatsApp/Email.`, 'success');
        
        // Simulasikan pengiriman WhatsApp
        const whatsappMessage = `Halo, saya ${name} ingin reservasi di Gourmet Haven:
        Tanggal: ${date}
        Waktu: ${time}
        Jumlah Tamu: ${guests}
        ${occasion ? `Kesempatan: ${occasion}` : ''}
        ${message ? `Catatan: ${message}` : ''}`;
        
        const whatsappUrl = `https://wa.me/6285710680912?text=${encodeURIComponent(whatsappMessage)}`;
        
        // Buka WhatsApp di tab baru (opsional)
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
        }, 1000);
    }

    // ================ FUNGSI RENDER ================
    function renderFeatures() {
        const featuresGrid = document.getElementById('featuresGrid');
        if (!featuresGrid) return;
        
        featuresGrid.innerHTML = features.map(feature => `
            <div class="feature-card fade-in">
                <div class="feature-icon">
                    <i class="${feature.icon}"></i>
                </div>
                <h3>${feature.title}</h3>
                <p>${feature.description}</p>
            </div>
        `).join('');
    }

    function renderMenuCategories() {
        const menuCategories = document.getElementById('menuCategories');
        if (!menuCategories) return;
        
        const categories = ['all', 'appetizer', 'main-course', 'dessert'];
        const categoryNames = {
            'all': 'Semua Menu',
            'appetizer': 'Appetizer',
            'main-course': 'Main Course',
            'dessert': 'Dessert'
        };
        
        menuCategories.innerHTML = categories.map(category => `
            <button class="category-btn ${category === currentCategory ? 'active' : ''}" 
                    data-category="${category}">
                ${categoryNames[category]}
            </button>
        `).join('');
        
        // Add event listeners untuk category buttons
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                currentCategory = category;
                
                // Update active class
                document.querySelectorAll('.category-btn').forEach(b => {
                    b.classList.remove('active');
                });
                this.classList.add('active');
                
                // Render menu items berdasarkan kategori
                renderMenuItems();
            });
        });
    }

    function renderMenuItems() {
        const menuItemsContainer = document.getElementById('menuItems');
        if (!menuItemsContainer) return;
        
        let filteredItems = menuItems;
        if (currentCategory !== 'all') {
            filteredItems = menuItems.filter(item => item.category === currentCategory);
        }
        
        menuItemsContainer.innerHTML = filteredItems.map(item => `
            <div class="menu-item fade-in">
                <img src="${item.image}" alt="${item.name}" class="menu-item-img" loading="lazy" onerror="this.src='https://via.placeholder.com/320x220/cccccc/333333?text=${encodeURIComponent(item.name)}'">
                <div class="menu-item-content">
                    <div class="menu-item-header">
                        <h3 class="menu-item-name">${item.name}</h3>
                        <div class="menu-item-price">${formatRupiah(item.price)}</div>
                    </div>
                    <span class="menu-item-category">${item.category === 'appetizer' ? 'Appetizer' : item.category === 'main-course' ? 'Main Course' : 'Dessert'}</span>
                    <p class="menu-item-desc">${item.description}</p>
                    <div class="menu-item-footer">
                        <div class="rating">
                            ${'★'.repeat(Math.floor(item.rating))}${'☆'.repeat(5-Math.floor(item.rating))}
                            <span style="color: var(--gray-color); margin-left: 5px;">(${item.rating})</span>
                        </div>
                        <button class="btn btn-secondary add-to-cart" data-id="${item.id}">
                            <i class="fas fa-cart-plus"></i>
                            Pesan
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Re-setup scroll animations untuk elemen baru dengan cached observer
        const fadeElements = document.querySelectorAll('.menu-item.fade-in');
        
        // Reuse observer atau buat baru jika belum ada
        if (!renderObserver) {
            renderObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
        }
        
        fadeElements.forEach(element => {
            element.classList.remove('visible');
            renderObserver.observe(element);
        });
    }

    function renderChefs() {
        const chefGrid = document.getElementById('chefGrid');
        if (!chefGrid) return;
        
        chefGrid.innerHTML = chefs.map(chef => `
            <div class="chef-card fade-in">
                <img src="${chef.image}" alt="${chef.name}" class="chef-img" loading="lazy" onerror="this.src='https://via.placeholder.com/400x300/cccccc/333333?text=${encodeURIComponent(chef.name)}'">
                <div class="chef-info">
                    <h3>${chef.name}</h3>
                    <p class="chef-role">${chef.role}</p>
                    <p>${chef.bio}</p>
                </div>
            </div>
        `).join('');
    }

    function renderGallery() {
        const galleryGrid = document.getElementById('galleryGrid');
        if (!galleryGrid) return;
        
        galleryGrid.innerHTML = galleryImages.map((image, index) => `
            <div class="gallery-item fade-in">
                <img src="${image}" alt="Gallery Image ${index + 1}" loading="lazy" onerror="this.src='https://via.placeholder.com/400x300/cccccc/333333?text=Gourmet+Haven'">
                <div class="gallery-overlay">
                    <p>Gourmet Haven Experience</p>
                </div>
            </div>
        `).join('');
    }

    // ================ FUNGSI SCROLL & ANIMASI ================
    function setupScrollAnimations() {
        const fadeElements = document.querySelectorAll('.fade-in');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        fadeElements.forEach(element => {
            observer.observe(element);
        });
    }

    function setupScrollHeader() {
        const header = document.getElementById('header');
        const backToTop = document.getElementById('backToTop');
        let ticking = false;
        let lastScrollY = 0;
        
        // Debounce scroll events
        function updateScroll() {
            lastScrollY = window.scrollY;
            
            // Header scroll effect
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Back to top button
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
            
            // Active navigation link
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-link');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
            
            ticking = false;
        }
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(updateScroll);
                ticking = true;
            }
        }, { passive: true });
    }

    // ================ FUNGSI INISIALISASI ================
    function init() {
        // Set tanggal minimum untuk form reservasi
        const today = new Date().toISOString().split('T')[0];
        const dateInput = document.getElementById('date');
        if (dateInput) {
            dateInput.min = today;
            dateInput.value = today;
        }
        
        // Update current year di footer
        document.getElementById('currentYear').textContent = new Date().getFullYear();
        
        // Render semua konten
        renderFeatures();
        renderMenuCategories();
        renderMenuItems();
        renderChefs();
        renderGallery();
        
        // Setup user interface
        updateUserInterface();
        
        // Setup event listeners
        setupEventListeners();
        
        // Setup scroll animations
        setupScrollAnimations();
        setupScrollHeader();
        
        // Setup payment methods
        setupPaymentMethods();
    }

    function setupEventListeners() {
        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', handleLogin);
        }
        
        // Logout button
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', handleLogout);
        }
        
        // User profile button
        const userProfileBtn = document.getElementById('userProfileBtn');
        if (userProfileBtn) {
            userProfileBtn.addEventListener('click', function() {
                const dropdown = document.getElementById('userDropdownMenu');
                dropdown.classList.toggle('active');
            });
            
            // Close dropdown ketika klik di luar
            document.addEventListener('click', function(event) {
                const dropdown = document.getElementById('userDropdownMenu');
                if (!userProfileBtn.contains(event.target) && !dropdown.contains(event.target)) {
                    dropdown.classList.remove('active');
                }
            });
        }
        
        // Mobile menu button
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navLinks = document.getElementById('navLinks');
        if (mobileMenuBtn && navLinks) {
            mobileMenuBtn.addEventListener('click', function() {
                navLinks.classList.toggle('active');
                this.querySelector('i').classList.toggle('fa-bars');
                this.querySelector('i').classList.toggle('fa-times');
            });
            
            // Close mobile menu ketika klik link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                    mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                });
            });
        }
        
        // Close modal ketika klik di luar
        const loginModal = document.getElementById('loginModal');
        if (loginModal) {
            loginModal.addEventListener('click', function(event) {
                if (event.target === this) {
                    hideLoginModal();
                }
            });
        }
        
        // Close login modal button
        const loginModalCloseBtn = document.getElementById('loginModalCloseBtn');
        if (loginModalCloseBtn) {
            loginModalCloseBtn.addEventListener('click', hideLoginModal);
        }
        
        // Cart button
        const cartBtn = document.getElementById('cartBtn');
        if (cartBtn) {
            cartBtn.addEventListener('click', showPaymentModal);
        }
        
        // Menu items - Event delegation untuk add to cart (dicegah duplicate listener)
        const menuItemsContainer = document.getElementById('menuItems');
        if (menuItemsContainer) {
            menuItemsContainer.addEventListener('click', function(e) {
                const btn = e.target.closest('.add-to-cart');
                if (btn) {
                    const itemId = parseInt(btn.getAttribute('data-id'));
                    addToCart(itemId);
                }
            });
        }
        
        // Payment modal
        const paymentCloseBtn = document.getElementById('paymentCloseBtn');
        const paymentModal = document.getElementById('paymentModal');
        if (paymentCloseBtn) {
            paymentCloseBtn.addEventListener('click', hidePaymentModal);
        }
        if (paymentModal) {
            paymentModal.addEventListener('click', function(event) {
                if (event.target === this) {
                    hidePaymentModal();
                }
            });
        }
        
        // Payment navigation buttons
        const nextBtn = document.getElementById('nextBtn');
        const payNowBtn = document.getElementById('payNowBtn');
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (currentPaymentStep === 1) {
                    currentPaymentStep = 2;
                    updatePaymentSteps();
                }
            });
        }
        
        if (payNowBtn) {
            payNowBtn.addEventListener('click', processPayment);
        }
        
        // Reservation form
        const reservationForm = document.getElementById('reservationForm');
        if (reservationForm) {
            reservationForm.addEventListener('submit', handleReservation);
        }
        
        // Newsletter form
        const newsletterForm = document.getElementById('newsletterForm');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', function(event) {
                event.preventDefault();
                const email = this.querySelector('.newsletter-input').value;
                if (validateEmail(email)) {
                    showToast('Terima kasih telah berlangganan newsletter kami!', 'success');
                    this.reset();
                } else {
                    showToast('Masukkan email yang valid', 'error');
                }
            });
        }
        
        // Back to top button
        const backToTop = document.getElementById('backToTop');
        if (backToTop) {
            backToTop.addEventListener('click', function(e) {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
        
        // Close dropdown modal jika user klik escape
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                hideLoginModal();
                hidePaymentModal();
                const dropdown = document.getElementById('userDropdownMenu');
                dropdown.classList.remove('active');
            }
        });
    }

    // ================ INISIALISASI APLIKASI ================
    init();
    
    // Tambahkan event listener untuk tombol login di halaman (jika ada)
    document.querySelectorAll('.btn-login-trigger').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            showLoginModal();
        });
    });
    
    // Tambahkan tombol cancel di modal login
    const loginModalContent = document.querySelector('.login-modal-content');
    if (loginModalContent) {
        const cancelBtn = document.createElement('button');
        cancelBtn.type = 'button';
        cancelBtn.className = 'btn btn-secondary';
        cancelBtn.innerHTML = '<i class="fas fa-times"></i> Batal';
        cancelBtn.style.marginTop = '1rem';
        cancelBtn.style.width = '100%';
        cancelBtn.addEventListener('click', hideLoginModal);
        
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.appendChild(cancelBtn);
        }
    }
});
