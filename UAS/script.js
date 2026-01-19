// script.js - Gourmet Haven Restaurant (OOP Version)

// ============================================================
// CLASS: MenuItem - Untuk data item menu
// ============================================================
class MenuItem {
    constructor(id, name, description, price, category, rating, image) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.rating = rating;
        this.image = image;
    }

    getCategoryLabel() {
        const labels = {
            'appetizer': 'Appetizer',
            'main-course': 'Main Course',
            'dessert': 'Dessert'
        };
        return labels[this.category] || this.category;
    }

    getFormattedPrice() {
        return Formatter.formatRupiah(this.price);
    }
}

// ============================================================
// CLASS: CartItem - Untuk item yang ada di keranjang
// ============================================================
class CartItem {
    constructor(menuItem, quantity = 1) {
        this.id = menuItem.id;
        this.name = menuItem.name;
        this.price = menuItem.price;
        this.image = menuItem.image;
        this.quantity = quantity;
    }

    getTotal() {
        return this.price * this.quantity;
    }

    getFormattedPrice() {
        return Formatter.formatRupiah(this.price);
    }

    getFormattedTotal() {
        return Formatter.formatRupiah(this.getTotal());
    }

    incrementQuantity() {
        this.quantity += 1;
    }

    decrementQuantity() {
        if (this.quantity > 1) {
            this.quantity -= 1;
            return true;
        }
        return false;
    }
}

// ============================================================
// CLASS: User - Untuk manajemen user/pelanggan
// ============================================================
class User {
    constructor(name, phone, email) {
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.loginTime = new Date().toISOString();
    }

    static fromJSON(data) {
        if (!data) return null;
        const user = new User(data.name, data.phone, data.email);
        user.loginTime = data.loginTime;
        return user;
    }

    toJSON() {
        return {
            name: this.name,
            phone: this.phone,
            email: this.email,
            loginTime: this.loginTime
        };
    }

    getInitial() {
        return this.name.charAt(0).toUpperCase();
    }

    isValid() {
        return this.name && this.phone && this.email;
    }
}

// ============================================================
// CLASS: Cart - Untuk manajemen keranjang belanja
// ============================================================
class Cart {
    constructor() {
        this.items = [];
        this.loadFromStorage();
    }

    addItem(menuItem) {
        const existingItem = this.items.find(item => item.id === menuItem.id);
        
        if (existingItem) {
            existingItem.incrementQuantity();
        } else {
            this.items.push(new CartItem(menuItem));
        }
        
        this.saveToStorage();
    }

    removeItem(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
        this.saveToStorage();
    }

    updateQuantity(itemId, quantity) {
        const item = this.items.find(item => item.id === itemId);
        if (item && quantity > 0) {
            item.quantity = quantity;
            this.saveToStorage();
        }
    }

    incrementItem(itemId) {
        const item = this.items.find(item => item.id === itemId);
        if (item) {
            item.incrementQuantity();
            this.saveToStorage();
        }
    }

    decrementItem(itemId) {
        const item = this.items.find(item => item.id === itemId);
        if (item) {
            if (!item.decrementQuantity()) {
                this.removeItem(itemId);
            } else {
                this.saveToStorage();
            }
        }
    }

    isEmpty() {
        return this.items.length === 0;
    }

    getTotalItems() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }

    getSubtotal() {
        return this.items.reduce((sum, item) => sum + item.getTotal(), 0);
    }

    getTax(percentage = 10) {
        return this.getSubtotal() * (percentage / 100);
    }

    getTotal(taxPercentage = 10) {
        return this.getSubtotal() + this.getTax(taxPercentage);
    }

    clear() {
        this.items = [];
        this.saveToStorage();
    }

    saveToStorage() {
        const data = this.items.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: item.quantity
        }));
        localStorage.setItem('cart', JSON.stringify(data));
    }

    loadFromStorage() {
        const data = JSON.parse(localStorage.getItem('cart')) || [];
        this.items = data.map(item => {
            const cartItem = new CartItem(
                { id: item.id, name: item.name, price: item.price, image: item.image },
                item.quantity
            );
            return cartItem;
        });
    }
}

// ============================================================
// CLASS: Formatter - Untuk utility formatting
// ============================================================
class Formatter {
    static formatRupiah(amount) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    }

    static validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    static validatePhone(phone) {
        const re = /^[0-9]{10,13}$/;
        return re.test(phone);
    }

    static getCategoryLabel(category) {
        const labels = {
            'appetizer': 'Appetizer',
            'main-course': 'Main Course',
            'dessert': 'Dessert'
        };
        return labels[category] || category;
    }
}

// ============================================================
// CLASS: NotificationManager - Untuk menampilkan toast
// ============================================================
class NotificationManager {
    static show(message, type = 'info') {
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
        
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(0)';
        }, 10);
        
        toast.querySelector('.toast-close').addEventListener('click', () => {
            NotificationManager.hide(toast);
        });
        
        setTimeout(() => {
            if (toast.parentNode) {
                NotificationManager.hide(toast);
            }
        }, 5000);
    }

    static hide(toast) {
        toast.classList.add('hiding');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }
}

// ============================================================
// CLASS: AuthManager - Untuk manajemen login/logout
// ============================================================
class AuthManager {
    constructor() {
        this.user = User.fromJSON(JSON.parse(localStorage.getItem('currentUser')));
    }

    login(name, phone, email) {
        const user = new User(name, phone, email);
        
        if (!user.isValid()) {
            NotificationManager.show('Harap isi semua field dengan benar', 'error');
            return false;
        }
        
        if (!Formatter.validateEmail(email)) {
            NotificationManager.show('Format email tidak valid', 'error');
            return false;
        }
        
        if (!Formatter.validatePhone(phone)) {
            NotificationManager.show('Format nomor telepon tidak valid', 'error');
            return false;
        }
        
        this.user = user;
        localStorage.setItem('currentUser', JSON.stringify(user.toJSON()));
        NotificationManager.show(`Selamat datang, ${name}! Anda sekarang dapat memesan menu favorit.`, 'success');
        return true;
    }

    logout() {
        this.user = null;
        localStorage.removeItem('currentUser');
        NotificationManager.show('Anda telah logout', 'info');
    }

    isLoggedIn() {
        return this.user !== null;
    }

    getCurrentUser() {
        return this.user;
    }
}

// ============================================================
// CLASS: Menu - Untuk manajemen data menu
// ============================================================
class Menu {
    constructor() {
        this.items = [
            new MenuItem(1, 'Lobster Thermidor', 'Lobster segar dengan saus thermidor klasik, keju gruyère, dan remah roti panggang.', 450000, 'appetizer', 4.9, 'https://static01.nyt.com/images/2024/02/09/multimedia/LH-lobster-thermidor-plzk/LH-lobster-thermidor-plzk-master768.jpg?quality=75&auto=webp'),
            new MenuItem(2, 'Wagyu Beef Steak', 'Daging wagyu A5 premium dengan saus truffle dan kentang dauphinoise.', 850000, 'main-course', 5.0, 'https://image.idntimes.com/post/20240612/img-20240612-160446-4ff506ecf74a17f22c11b39143537d58-39231715f6560e4cdb4a24545770525a.jpg?tr=w-1200,f-webp,q-75&width=1200&format=webp&quality=75'),
            new MenuItem(3, 'Foie Gras Terrine', 'Terrine foie gras dengan chutney buah ara dan roti brioche panggang.', 350000, 'appetizer', 4.8, 'https://d3h1lg3ksw6i6b.cloudfront.net/media/image/2018/10/05/661a1472ec334a2893102faa531d8252_Foie+Gras+Terrine+with+65%25+Dark+Chocolate+and+Roasted+Cacao+Nibs+1_PORTA.jpg'),
            new MenuItem(4, 'Black Cod Miso', 'Cod hitam dengan fermentasi miso 48 jam dan sayuran musiman.', 380000, 'main-course', 4.7, 'https://i0.wp.com/wishbonekitchen.com/wp-content/uploads/2022/11/IMG_9689_jpg-2.jpg?w=1125&ssl=1'),
            new MenuItem(5, 'Truffle Risotto', 'Risotto dengan truffle hitam segar dan parmesan reggiano.', 320000, 'main-course', 4.8, 'https://alwaysfromscratch.com/wp-content/uploads/2023/10/Mushroom-truffle-risotto-13.jpg'),
            new MenuItem(6, 'Chocolate Soufflé', 'Soufflé cokelat Belgia dengan es krim vanilla Madagascar.', 180000, 'dessert', 4.9, 'https://media-cdn2.greatbritishchefs.com/media/4cgla1l1/img10652.whqc_900x600q90.webp'),
            new MenuItem(7, 'Salmon Tartare', 'Salmon tartare dengan avocado, capers, dan dressing lemon-dill.', 280000, 'appetizer', 4.6, 'https://images.immediate.co.uk/production/volatile/sites/2/2015/10/15144.jpg?quality=90&crop=2px,0px,596px,542px&resize=600,545'),
            new MenuItem(8, 'Tiramisu Classico', 'Tiramisu klasik dengan mascarpone dan espresso robusta.', 150000, 'dessert', 4.7, 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'),
            new MenuItem(9, 'Sushi Omakase', 'Koleksi 12 pieces sushi premium pilihan chef dengan ikan segar dari Tokyo, disajikan dengan wasabi autentik dan ginger pickled.', 520000, 'appetizer', 5.0, 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')
        ];
        this.categories = ['all', 'appetizer', 'main-course', 'dessert'];
    }

    getItemById(id) {
        return this.items.find(item => item.id === id);
    }

    getItemsByCategory(category) {
        if (category === 'all') {
            return this.items;
        }
        return this.items.filter(item => item.category === category);
    }

    getAllItems() {
        return this.items;
    }

    getCategories() {
        return this.categories;
    }
}

// ============================================================
// CLASS: Restaurant - Data restoran (fitur, chef, galeri)
// ============================================================
class Restaurant {
    constructor() {
        this.features = [
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

        this.chefs = [
            {
                name: 'Chef Marco Alessandro',
                role: 'Executive Chef',
                bio: 'Pengalaman 20+ tahun di restoran Michelin-starred di Eropa',
                image: 'https://www.escoffier.edu/wp-content/uploads/2022/03/Smiling-male-chef-with-white-coat-and-hat-768.jpg'
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

        this.gallery = [
            'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ];
    }

    getFeatures() {
        return this.features;
    }

    getChefs() {
        return this.chefs;
    }

    getGallery() {
        return this.gallery;
    }
}

// ============================================================
// CLASS: PaymentProcessor - Untuk proses pembayaran
// ============================================================
class PaymentProcessor {
    constructor(cart) {
        this.cart = cart;
        this.currentStep = 1;
        this.currentMethod = 'qris';
    }

    nextStep() {
        if (this.currentStep < 3) {
            this.currentStep += 1;
            return true;
        }
        return false;
    }

    previousStep() {
        if (this.currentStep > 1) {
            this.currentStep -= 1;
            return true;
        }
        return false;
    }

    setPaymentMethod(method) {
        this.currentMethod = method;
    }

    getCurrentMethod() {
        return this.currentMethod;
    }

    processPayment() {
        return new Promise((resolve) => {
            NotificationManager.show('Memproses pembayaran...', 'info');
            setTimeout(() => {
                this.cart.clear();
                NotificationManager.show('Pembayaran berhasil! Pesanan Anda sedang diproses.', 'success');
                resolve(true);
            }, 2000);
        });
    }

    generateOrderCode() {
        return `GH-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    }
}

// ============================================================
// CLASS: UIRenderer - Untuk rendering elemen UI
// ============================================================
class UIRenderer {
    static renderFeatures(features) {
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

    static renderMenuCategories(categories, currentCategory, callback) {
        const menuCategories = document.getElementById('menuCategories');
        if (!menuCategories) return;
        
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
        
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                callback(category);
            });
        });
    }

    static renderMenuItems(items) {
        const menuItemsContainer = document.getElementById('menuItems');
        if (!menuItemsContainer) return;
        
        menuItemsContainer.innerHTML = items.map(item => `
            <div class="menu-item fade-in">
                <img src="${item.image}" alt="${item.name}" class="menu-item-img" loading="lazy" onerror="this.src='https://via.placeholder.com/320x220/cccccc/333333?text=${encodeURIComponent(item.name)}'">
                <div class="menu-item-content">
                    <div class="menu-item-header">
                        <h3 class="menu-item-name">${item.name}</h3>
                        <div class="menu-item-price">${item.getFormattedPrice()}</div>
                    </div>
                    <span class="menu-item-category">${item.getCategoryLabel()}</span>
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
        
        UIRenderer.setupScrollAnimations();
    }

    static renderChefs(chefs) {
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

    static renderGallery(images) {
        const galleryGrid = document.getElementById('galleryGrid');
        if (!galleryGrid) return;
        
        galleryGrid.innerHTML = images.map((image, index) => `
            <div class="gallery-item fade-in">
                <img src="${image}" alt="Gallery Image ${index + 1}" loading="lazy" onerror="this.src='https://via.placeholder.com/400x300/cccccc/333333?text=Gourmet+Haven'">
                <div class="gallery-overlay">
                    <p>Gourmet Haven Experience</p>
                </div>
            </div>
        `).join('');
    }

    static updateUserInterface(authManager, cart) {
        const userAvatar = document.getElementById('userAvatar');
        const dropdownAvatar = document.getElementById('dropdownAvatar');
        const dropdownUserName = document.getElementById('dropdownUserName');
        const dropdownUserEmail = document.getElementById('dropdownUserEmail');
        const cartFloating = document.getElementById('cartFloating');
        const logoutBtn = document.getElementById('logoutBtn');
        const logoutBtnText = document.getElementById('logoutBtnText');
        const logoutBtnIcon = logoutBtn.querySelector('i');
        
        if (authManager.isLoggedIn()) {
            const user = authManager.getCurrentUser();
            const initial = user.getInitial();
            userAvatar.textContent = initial;
            dropdownAvatar.textContent = initial;
            dropdownUserName.textContent = user.name;
            dropdownUserEmail.textContent = user.email;
            
            cartFloating.style.display = 'block';
            logoutBtn.style.display = 'flex';
            logoutBtnText.textContent = 'Logout';
            logoutBtnIcon.className = 'fas fa-sign-out-alt';
        } else {
            userAvatar.textContent = 'G';
            dropdownAvatar.textContent = 'G';
            dropdownUserName.textContent = 'Guest';
            dropdownUserEmail.textContent = 'Silakan login untuk memesan';
            
            cartFloating.style.display = 'none';
            logoutBtn.style.display = 'flex';
            logoutBtnText.textContent = 'Login';
            logoutBtnIcon.className = 'fas fa-sign-in-alt';
        }
        
        UIRenderer.updateCartCount(cart);
    }

    static updateCartCount(cart) {
        const cartCount = document.getElementById('cartCount');
        cartCount.textContent = cart.getTotalItems();
        
        const cartFloating = document.getElementById('cartFloating');
        cartFloating.style.display = cart.getTotalItems() > 0 ? 'block' : 'none';
    }

    static updateOrderSummary(cart) {
        const orderSummary = document.getElementById('orderSummary');
        const subtotalElement = document.getElementById('subtotal');
        const taxElement = document.getElementById('tax');
        const totalAmountElement = document.getElementById('totalAmount');
        
        if (cart.isEmpty()) {
            orderSummary.innerHTML = '<p style="text-align: center; padding: 2rem; color: var(--gray-color);">Keranjang Anda kosong</p>';
            subtotalElement.textContent = Formatter.formatRupiah(0);
            taxElement.textContent = Formatter.formatRupiah(0);
            totalAmountElement.textContent = Formatter.formatRupiah(0);
            return;
        }
        
        let html = '';
        
        cart.items.forEach(item => {
            html += `
                <div class="order-item" data-id="${item.id}">
                    <div class="order-item-info">
                        <div class="order-item-name">${item.name}</div>
                        <div class="order-item-price">${item.getFormattedPrice()}</div>
                        <div class="order-item-quantity">
                            <button class="quantity-btn minus" data-id="${item.id}">-</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-btn plus" data-id="${item.id}">+</button>
                        </div>
                    </div>
                    <div class="order-item-total">${item.getFormattedTotal()}</div>
                    <button class="remove-item" data-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
        });
        
        orderSummary.innerHTML = html;
        
        const tax = cart.getTax(10);
        const total = cart.getTotal(10);
        
        subtotalElement.textContent = Formatter.formatRupiah(cart.getSubtotal());
        taxElement.textContent = Formatter.formatRupiah(tax);
        totalAmountElement.textContent = Formatter.formatRupiah(total);
    }

    static updatePaymentSteps(paymentProcessor) {
        document.querySelectorAll('.step').forEach(step => {
            step.classList.remove('active');
        });
        
        document.getElementById(`step${paymentProcessor.currentStep}`).classList.add('active');
    }

    static setupScrollAnimations() {
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

    static setupScrollHeader() {
        const header = document.getElementById('header');
        const backToTop = document.getElementById('backToTop');
        let ticking = false;
        
        function updateScroll() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
            
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
}

// ============================================================
// CLASS: GourmetHavenApp - Main Application
// ============================================================
class GourmetHavenApp {
    constructor() {
        this.authManager = new AuthManager();
        this.cart = new Cart();
        this.menu = new Menu();
        this.restaurant = new Restaurant();
        this.paymentProcessor = new PaymentProcessor(this.cart);
        this.currentCategory = 'all';
    }

    init() {
        this.setupDateInputs();
        this.setupFooterYear();
        this.renderAllContent();
        this.setupAllEventListeners();
        UIRenderer.setupScrollAnimations();
        UIRenderer.setupScrollHeader();
    }

    setupDateInputs() {
        const today = new Date().toISOString().split('T')[0];
        const dateInput = document.getElementById('date');
        if (dateInput) {
            dateInput.min = today;
            dateInput.value = today;
        }
    }

    setupFooterYear() {
        document.getElementById('currentYear').textContent = new Date().getFullYear();
    }

    renderAllContent() {
        UIRenderer.renderFeatures(this.restaurant.getFeatures());
        UIRenderer.renderMenuCategories(this.menu.getCategories(), this.currentCategory, (category) => this.onCategoryChange(category));
        UIRenderer.renderMenuItems(this.menu.getItemsByCategory(this.currentCategory));
        UIRenderer.renderChefs(this.restaurant.getChefs());
        UIRenderer.renderGallery(this.restaurant.getGallery());
        UIRenderer.updateUserInterface(this.authManager, this.cart);
    }

    onCategoryChange(category) {
        this.currentCategory = category;
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-category="${category}"]`).classList.add('active');
        UIRenderer.renderMenuItems(this.menu.getItemsByCategory(category));
    }

    setupAllEventListeners() {
        this.setupLoginForm();
        this.setupLogoutButton();
        this.setupUserProfileButton();
        this.setupMobileMenu();
        this.setupModalClosing();
        this.setupCartButton();
        this.setupMenuItemsAddToCart();
        this.setupPaymentModal();
        this.setupPaymentMethods();
        this.setupPaymentNavigation();
        this.setupReservationForm();
        this.setupNewsletterForm();
        this.setupBackToTopButton();
        this.setupEscapeKey();
    }

    setupLoginForm() {
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('customerName').value.trim();
                const phone = document.getElementById('customerPhone').value.trim();
                const email = document.getElementById('customerEmail').value.trim();
                
                if (this.authManager.login(name, phone, email)) {
                    this.hideLoginModal();
                    loginForm.reset();
                    UIRenderer.updateUserInterface(this.authManager, this.cart);
                }
            });
        }
    }

    setupLogoutButton() {
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                if (this.authManager.isLoggedIn()) {
                    this.authManager.logout();
                    UIRenderer.updateUserInterface(this.authManager, this.cart);
                } else {
                    this.showLoginModal();
                }
            });
        }
    }

    setupUserProfileButton() {
        const userProfileBtn = document.getElementById('userProfileBtn');
        if (userProfileBtn) {
            userProfileBtn.addEventListener('click', () => {
                const dropdown = document.getElementById('userDropdownMenu');
                dropdown.classList.toggle('active');
            });
            
            document.addEventListener('click', (event) => {
                const dropdown = document.getElementById('userDropdownMenu');
                if (!userProfileBtn.contains(event.target) && !dropdown.contains(event.target)) {
                    dropdown.classList.remove('active');
                }
            });
        }
    }

    setupMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navLinks = document.getElementById('navLinks');
        if (mobileMenuBtn && navLinks) {
            mobileMenuBtn.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
                mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
            });
            
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                    mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                });
            });
        }
    }

    setupModalClosing() {
        const loginModal = document.getElementById('loginModal');
        if (loginModal) {
            loginModal.addEventListener('click', (event) => {
                if (event.target === loginModal) {
                    this.hideLoginModal();
                }
            });
        }
        
        const loginModalCloseBtn = document.getElementById('loginModalCloseBtn');
        if (loginModalCloseBtn) {
            loginModalCloseBtn.addEventListener('click', () => this.hideLoginModal());
        }
    }

    setupCartButton() {
        const cartBtn = document.getElementById('cartBtn');
        if (cartBtn) {
            cartBtn.addEventListener('click', () => this.showPaymentModal());
        }
    }

    setupMenuItemsAddToCart() {
        const menuItemsContainer = document.getElementById('menuItems');
        if (menuItemsContainer) {
            menuItemsContainer.addEventListener('click', (e) => {
                const btn = e.target.closest('.add-to-cart');
                if (btn) {
                    const itemId = parseInt(btn.getAttribute('data-id'));
                    this.addToCart(itemId);
                }
            });
        }
    }

    addToCart(itemId) {
        if (!this.authManager.isLoggedIn()) {
            NotificationManager.show('Silakan login terlebih dahulu untuk menambahkan item ke keranjang', 'error');
            return;
        }
        
        const menuItem = this.menu.getItemById(itemId);
        if (!menuItem) return;
        
        this.cart.addItem(menuItem);
        UIRenderer.updateCartCount(this.cart);
        NotificationManager.show(`${menuItem.name} telah ditambahkan ke keranjang`, 'success');
    }

    setupPaymentModal() {
        const paymentCloseBtn = document.getElementById('paymentCloseBtn');
        if (paymentCloseBtn) {
            paymentCloseBtn.addEventListener('click', () => this.hidePaymentModal());
        }
        
        const paymentModal = document.getElementById('paymentModal');
        if (paymentModal) {
            paymentModal.addEventListener('click', (event) => {
                if (event.target === paymentModal) {
                    this.hidePaymentModal();
                }
            });
        }
    }

    showPaymentModal() {
        if (!this.authManager.isLoggedIn()) {
            NotificationManager.show('Silakan login terlebih dahulu untuk melanjutkan pembayaran', 'error');
            return;
        }
        
        if (this.cart.isEmpty()) {
            NotificationManager.show('Keranjang Anda kosong. Tambahkan item terlebih dahulu.', 'error');
            return;
        }
        
        const paymentModal = document.getElementById('paymentModal');
        paymentModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        this.paymentProcessor.currentStep = 1;
        UIRenderer.updatePaymentSteps(this.paymentProcessor);
        UIRenderer.updateOrderSummary(this.cart);
        
        const orderCode = this.paymentProcessor.generateOrderCode();
        document.getElementById('orderCode').textContent = orderCode;
        
        this.setupOrderSummaryQuantityButtons();
    }

    hidePaymentModal() {
        const paymentModal = document.getElementById('paymentModal');
        paymentModal.style.display = 'none';
        document.body.style.overflow = '';
    }

    setupOrderSummaryQuantityButtons() {
        document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const itemId = parseInt(btn.getAttribute('data-id'));
                this.cart.incrementItem(itemId);
                UIRenderer.updateCartCount(this.cart);
                UIRenderer.updateOrderSummary(this.cart);
                this.setupOrderSummaryQuantityButtons();
            });
        });
        
        document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const itemId = parseInt(btn.getAttribute('data-id'));
                this.cart.decrementItem(itemId);
                UIRenderer.updateCartCount(this.cart);
                UIRenderer.updateOrderSummary(this.cart);
                this.setupOrderSummaryQuantityButtons();
            });
        });
        
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const itemId = parseInt(btn.getAttribute('data-id'));
                this.cart.removeItem(itemId);
                UIRenderer.updateCartCount(this.cart);
                UIRenderer.updateOrderSummary(this.cart);
                this.setupOrderSummaryQuantityButtons();
            });
        });
    }

    setupPaymentMethods() {
        const paymentMethods = document.querySelectorAll('.payment-method');
        
        paymentMethods.forEach(method => {
            method.addEventListener('click', () => {
                paymentMethods.forEach(m => m.classList.remove('active'));
                method.classList.add('active');
                
                const methodType = method.getAttribute('data-method');
                this.paymentProcessor.setPaymentMethod(methodType);
                
                document.querySelectorAll('.payment-details').forEach(detail => {
                    detail.style.display = 'none';
                });
                
                document.getElementById(`${methodType}Details`).style.display = 'block';
            });
        });
    }

    setupPaymentNavigation() {
        const nextBtn = document.getElementById('nextBtn');
        const prevBtn = document.getElementById('prevBtn');
        const payNowBtn = document.getElementById('payNowBtn');
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.paymentProcessor.nextStep();
                UIRenderer.updatePaymentSteps(this.paymentProcessor);
                this.updatePaymentButtonStates();
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (this.paymentProcessor.currentStep === 1) {
                    this.hidePaymentModal();
                    this.cart.clear();
                    UIRenderer.updateCartCount(this.cart);
                } else {
                    this.paymentProcessor.previousStep();
                    UIRenderer.updatePaymentSteps(this.paymentProcessor);
                    this.updatePaymentButtonStates();
                }
            });
        }
        
        if (payNowBtn) {
            payNowBtn.addEventListener('click', async () => {
                await this.paymentProcessor.processPayment();
                this.paymentProcessor.currentStep = 3;
                UIRenderer.updatePaymentSteps(this.paymentProcessor);
                UIRenderer.updateCartCount(this.cart);
                this.updatePaymentButtonStates();
            });
        }
    }

    updatePaymentButtonStates() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const payNowBtn = document.getElementById('payNowBtn');
        
        if (this.paymentProcessor.currentStep === 1) {
            prevBtn.textContent = 'Balik ke Beranda';
            nextBtn.style.display = 'inline-flex';
            payNowBtn.style.display = 'none';
        } else if (this.paymentProcessor.currentStep === 2) {
            prevBtn.textContent = 'Kembali';
            nextBtn.style.display = 'none';
            payNowBtn.style.display = 'inline-flex';
        } else if (this.paymentProcessor.currentStep === 3) {
            prevBtn.textContent = 'Pesan Lagi';
            nextBtn.style.display = 'none';
            payNowBtn.style.display = 'none';
            
            prevBtn.onclick = () => {
                this.hidePaymentModal();
                this.cart.clear();
                UIRenderer.updateCartCount(this.cart);
                NotificationManager.show('Terima kasih atas pesanan Anda!', 'success');
            };
        }
    }

    setupReservationForm() {
        const reservationForm = document.getElementById('reservationForm');
        if (reservationForm) {
            reservationForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                if (!this.authManager.isLoggedIn()) {
                    NotificationManager.show('Silakan login terlebih dahulu untuk melakukan reservasi', 'error');
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
                
                if (!name || !phone || !email || !guests || !date || !time) {
                    NotificationManager.show('Harap isi semua field yang wajib diisi', 'error');
                    return;
                }
                
                const reservation = {
                    name, phone, email, guests, date, time, occasion, message,
                    reservationTime: new Date().toISOString(),
                    status: 'pending'
                };
                
                const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
                reservations.push(reservation);
                localStorage.setItem('reservations', JSON.stringify(reservations));
                
                reservationForm.reset();
                const today = new Date().toISOString().split('T')[0];
                document.getElementById('date').value = today;
                
                NotificationManager.show('Reservasi berhasil! Kami akan mengonfirmasi melalui WhatsApp/Email.', 'success');
                
                const whatsappMessage = `Halo, saya ${name} ingin reservasi di Gourmet Haven:
                Tanggal: ${date}
                Waktu: ${time}
                Jumlah Tamu: ${guests}
                ${occasion ? `Kesempatan: ${occasion}` : ''}
                ${message ? `Catatan: ${message}` : ''}`;
                
                const whatsappUrl = `https://wa.me/6285710680912?text=${encodeURIComponent(whatsappMessage)}`;
                
                setTimeout(() => {
                    window.open(whatsappUrl, '_blank');
                }, 1000);
            });
        }
    }

    setupNewsletterForm() {
        const newsletterForm = document.getElementById('newsletterForm');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = newsletterForm.querySelector('.newsletter-input').value;
                
                if (Formatter.validateEmail(email)) {
                    NotificationManager.show('Terima kasih telah berlangganan newsletter kami!', 'success');
                    newsletterForm.reset();
                } else {
                    NotificationManager.show('Masukkan email yang valid', 'error');
                }
            });
        }
    }

    setupBackToTopButton() {
        const backToTop = document.getElementById('backToTop');
        if (backToTop) {
            backToTop.addEventListener('click', (e) => {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    setupEscapeKey() {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                this.hideLoginModal();
                this.hidePaymentModal();
                const dropdown = document.getElementById('userDropdownMenu');
                dropdown.classList.remove('active');
            }
        });
    }

    showLoginModal() {
        const loginModal = document.getElementById('loginModal');
        loginModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    hideLoginModal() {
        const loginModal = document.getElementById('loginModal');
        loginModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ============================================================
// INITIALIZATION
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    const app = new GourmetHavenApp();
    app.init();
    
    // Setup cancel button di login modal
    const loginModalContent = document.querySelector('.login-modal-content');
    if (loginModalContent) {
        const cancelBtn = document.createElement('button');
        cancelBtn.type = 'button';
        cancelBtn.className = 'btn btn-secondary';
        cancelBtn.innerHTML = '<i class="fas fa-times"></i> Batal';
        cancelBtn.style.marginTop = '1rem';
        cancelBtn.style.width = '100%';
        cancelBtn.addEventListener('click', () => app.hideLoginModal());
        
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.appendChild(cancelBtn);
        }
    }
});
