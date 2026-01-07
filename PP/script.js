// Data menu makanan yang lebih lengkap
const menuData = [
    {
        id: 1,
        name: "Lobster Thermidor",
        description: "Lobster segar dengan saus krim, keju gruyère, dan rempah-rempah pilihan. Disajikan dengan puree kentang truffle.",
        price: 450000,
        category: "main",
        rating: 5,
        image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80"
    },
    {
        id: 2,
        name: "Tuna Tartare Avocado",
        description: "Tuna segar sashimi grade dengan alpukat, wijen hitam, dan saus ponzu citrus. Disajikan dengan keripik wonton.",
        price: 165000,
        category: "appetizer",
        rating: 4,
        image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80"
    },
    {
        id: 3,
        name: "Wagyu Beef Ribeye",
        description: "Steak daging wagyu A5 level medium rare dengan kentang truffle, asparagus, dan red wine reduction.",
        price: 650000,
        category: "main",
        rating: 5,
        image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80"
    },
    {
        id: 4,
        name: "Tiramisu Classico",
        description: "Tiramisu klasik dengan mascarpone buatan sendiri, kopi espresso arabica, dan bubuk cokelat Valrhona.",
        price: 95000,
        category: "dessert",
        rating: 4,
        image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80"
    },
    {
        id: 5,
        name: "Truffle Mushroom Risotto",
        description: "Risotto al dente dengan jamur truffle hitam, keju parmesan reggiano, dan kaldu jamur homemade.",
        price: 250000,
        category: "main",
        rating: 4,
        image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-4.0.3&auto=format&fit=crop&w=685&q=80"
    },
    {
        id: 6,
        name: "Pan-Seared Foie Gras",
        description: "Foie gras panggang dengan roti brioche, chutney buah ara, dan reduksi balsamic.",
        price: 225000,
        category: "appetizer",
        rating: 5,
        image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80"
    },
    {
        id: 7,
        name: "Chocolate Lava Cake",
        description: "Kue cokelat dengan lelehan cokelat Valrhona 70% di dalamnya, disajikan dengan es krim vanila Madagascar.",
        price: 85000,
        category: "dessert",
        rating: 5,
        image: "https://images.unsplash.com/photo-1624353365286-3f8d62dadadf?ixlib=rb-4.0.3&auto=format&fit=crop&w=686&q=80"
    },
    {
        id: 8,
        name: "Signature Garden Cocktail",
        description: "Koktail spesial dengan gin botanicals, elderflower, lemon verbena, dan buah segar musiman.",
        price: 145000,
        category: "drink",
        rating: 4,
        image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80"
    },
    {
        id: 9,
        name: "Seafood Platter",
        description: "Beragam seafood segar termasuk kerang, udang, scallop, dan cumi dengan saus lemon butter.",
        price: 380000,
        category: "main",
        rating: 4,
        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
    },
    {
        id: 10,
        name: "Burrata Caprese",
        description: "Burrata Italia segar dengan tomat heirloom, basil pesto, dan balsamic glaze.",
        price: 135000,
        category: "appetizer",
        rating: 5,
        image: "https://images.unsplash.com/photo-1598214886806-c87b84b7078b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1450&q=80"
    }
];

// Shopping Cart System
let shoppingCart = JSON.parse(localStorage.getItem('gourmetCart')) || [];
let currentStep = 1;
let selectedPaymentMethod = 'qris';

// DOM Elements
const menuItemsContainer = document.getElementById('menuItems');
const categoryButtons = document.querySelectorAll('.category-btn');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
const header = document.getElementById('header');
const reservationForm = document.getElementById('reservationForm');
const newsletterForm = document.getElementById('newsletterForm');
const backToTop = document.getElementById('backToTop');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');
const fadeElements = document.querySelectorAll('.fade-in');
const submitBtn = document.getElementById('submitBtn');
const navLinksAll = document.querySelectorAll('.nav-links a');

// Payment System DOM Elements
const cartFloating = document.getElementById('cartFloating');
const cartBtn = document.getElementById('cartBtn');
const cartCount = document.getElementById('cartCount');
const paymentModal = document.getElementById('paymentModal');
const paymentCloseBtn = document.getElementById('paymentCloseBtn');
const orderSummary = document.getElementById('orderSummary');
const subtotalElement = document.getElementById('subtotal');
const taxElement = document.getElementById('tax');
const totalAmountElement = document.getElementById('totalAmount');
const paymentMethods = document.querySelectorAll('.payment-method');
const paymentDetails = document.querySelectorAll('.payment-details');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const payNowBtn = document.getElementById('payNowBtn');
const steps = document.querySelectorAll('.step');
const cardForm = document.getElementById('cardForm');
const orderCode = document.getElementById('orderCode');

// Initialize menu items
function renderMenuItems(category = 'all') {
    menuItemsContainer.innerHTML = '';
    
    const filteredMenu = category === 'all' 
        ? menuData 
        : menuData.filter(item => item.category === category);
    
    filteredMenu.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item fade-in';
        menuItem.setAttribute('data-category', item.category);
        
        // Generate star rating
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= item.rating) {
                stars += '<i class="fas fa-star"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }
        
        menuItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="menu-item-img" loading="lazy" onerror="this.onerror=null; this.classList.add('image-fallback'); this.parentElement.innerHTML='<div style=\"height:220px; display:flex; align-items:center; justify-content:center; background:linear-gradient(45deg,#f8f8f8,#e8e8e8); color:#666; font-weight:500;\">${item.name}</div>';">
            <div class="menu-item-content">
                <div class="menu-item-header">
                    <h3 class="menu-item-name">${item.name}</h3>
                    <span class="menu-item-price">Rp ${item.price.toLocaleString('id-ID')}</span>
                </div>
                <span class="menu-item-category">${getCategoryName(item.category)}</span>
                <p class="menu-item-desc">${item.description}</p>
                <div class="menu-item-footer">
                    <div class="rating">${stars}</div>
                    <button class="btn" data-id="${item.id}" style="padding: 0.5rem 1rem; font-size: 0.9rem;">
                        <i class="fas fa-shopping-cart"></i> Pesan
                    </button>
                </div>
            </div>
        `;
        
        menuItemsContainer.appendChild(menuItem);
    });
    
    // Add event listeners to order buttons
    setTimeout(() => {
        document.querySelectorAll('.menu-item-footer .btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const itemId = this.getAttribute('data-id');
                addToCart(itemId);
            });
        });
    }, 100);
    
    // Trigger fade-in animation for new items
    observeFadeElements();
}

// Get category name in Indonesian
function getCategoryName(category) {
    const categories = {
        'appetizer': 'Hidangan Pembuka',
        'main': 'Hidangan Utama',
        'dessert': 'Makanan Penutup',
        'drink': 'Minuman'
    };
    return categories[category] || category;
}

// Category filtering
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter menu items
        const category = button.getAttribute('data-category');
        renderMenuItems(category);
    });
});

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking on a link
navLinksAll.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        document.body.style.overflow = '';
        
        // Update active nav link
        navLinksAll.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Show/hide back to top button
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
    
    // Update active nav link based on scroll position
    updateActiveNavLink();
});

// Update active nav link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinksAll.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Toast notification dengan perbaikan mobile
function showToast(message, type = 'success') {
    toastMessage.textContent = message;
    toast.className = 'toast';
    toast.classList.add(type === 'error' ? 'error' : 'success');
    
    // Hapus toast yang lama jika masih ada
    toast.classList.remove('show');
    
    // Trigger reflow untuk reset animation
    void toast.offsetWidth;
    
    // Tampilkan toast baru
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Sembunyikan otomatis setelah 4 detik
    const hideTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
    
    // Tambahkan event untuk dismiss manual
    toast.onclick = function() {
        clearTimeout(hideTimeout);
        this.classList.remove('show');
    };
}

// Form submission with validation
reservationForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const guests = document.getElementById('guests').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const occasion = document.getElementById('occasion').value;
    const message = document.getElementById('message').value.trim();
    
    // Simple validation
    if (!name || !phone || !email || !guests || !date || !time) {
        showToast('Harap isi semua field yang wajib diisi!', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showToast('Format email tidak valid!', 'error');
        return;
    }
    
    // Phone validation (simple)
    const phoneRegex = /^[0-9+\-\s]{10,15}$/;
    if (!phoneRegex.test(phone)) {
        showToast('Format nomor telepon tidak valid!', 'error');
        return;
    }
    
    // Date validation (not in the past)
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        showToast('Tanggal tidak boleh di masa lalu!', 'error');
        return;
    }
    
    // Show loading state
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<div class="loading"></div> Memproses...';
    submitBtn.disabled = true;
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real app, you would send this data to a server
    const formattedDate = new Date(date).toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    showToast(`Terima kasih ${name}! Reservasi Anda untuk ${guests} orang pada ${formattedDate} pukul ${time} telah diterima. Kami akan mengonfirmasi dalam waktu 24 jam.`);
    
    // Reset form
    reservationForm.reset();
    
    // Reset button
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
    
    // Set minimum date to today
    const todayStr = new Date().toISOString().split('T')[0];
    document.getElementById('date').min = todayStr;
});

// Newsletter form submission
newsletterForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    
    if (!email) {
        showToast('Harap masukkan email Anda!', 'error');
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showToast('Format email tidak valid!', 'error');
        return;
    }
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    showToast('Terima kasih! Anda telah berhasil berlangganan newsletter kami.');
    newsletterForm.reset();
});

// Fade-in animation on scroll
function observeFadeElements() {
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
    
    // Also observe newly created menu items
    document.querySelectorAll('.menu-item.fade-in').forEach(item => {
        observer.observe(item);
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Back to top functionality
backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Payment System Functions

// Update cart count
function updateCartCount() {
    const totalItems = shoppingCart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Show/hide cart button
    if (totalItems > 0) {
        cartFloating.style.display = 'block';
    } else {
        cartFloating.style.display = 'none';
    }
}

// Add item to cart
function addToCart(itemId) {
    const item = menuData.find(i => i.id == itemId);
    if (!item) return;

    const existingItem = shoppingCart.find(i => i.id == itemId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        shoppingCart.push({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: 1,
            image: item.image
        });
    }
    
    saveCart();
    updateCartCount();
    showToast(`"${item.name}" ditambahkan ke keranjang!`);
}

// Remove item from cart
function removeFromCart(itemId) {
    shoppingCart = shoppingCart.filter(item => item.id != itemId);
    saveCart();
    updateCartCount();
    renderOrderSummary();
}

// Update item quantity
function updateQuantity(itemId, change) {
    const item = shoppingCart.find(i => i.id == itemId);
    if (!item) return;

    item.quantity += change;
    
    if (item.quantity < 1) {
        removeFromCart(itemId);
    } else {
        saveCart();
        renderOrderSummary();
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('gourmetCart', JSON.stringify(shoppingCart));
}

// Calculate order total
function calculateTotal() {
    const subtotal = shoppingCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;
    
    return { subtotal, tax, total };
}

// Render order summary
function renderOrderSummary() {
    if (shoppingCart.length === 0) {
        orderSummary.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: var(--gray-color);">
                <i class="fas fa-shopping-cart" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.3;"></i>
                <p>Keranjang belanja kosong</p>
            </div>
        `;
        subtotalElement.textContent = 'Rp 0';
        taxElement.textContent = 'Rp 0';
        totalAmountElement.innerHTML = '<strong>Rp 0</strong>';
        return;
    }

    const { subtotal, tax, total } = calculateTotal();
    
    orderSummary.innerHTML = shoppingCart.map(item => `
        <div class="order-item">
            <div class="order-item-info">
                <div class="order-item-name">${item.name}</div>
                <div class="order-item-price">Rp ${item.price.toLocaleString('id-ID')}</div>
                <div class="order-item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <div class="order-item-total">
                Rp ${(item.price * item.quantity).toLocaleString('id-ID')}
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');

    subtotalElement.textContent = `Rp ${subtotal.toLocaleString('id-ID')}`;
    taxElement.textContent = `Rp ${tax.toLocaleString('id-ID')}`;
    totalAmountElement.innerHTML = `<strong>Rp ${total.toLocaleString('id-ID')}</strong>`;
}

// Generate order code
function generateOrderCode() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const randomNum = Math.floor(Math.random() * 1000);
    return `GH-${year}${month}${day}-${String(randomNum).padStart(3, '0')}`;
}

// Show payment step
function showStep(stepNumber) {
    steps.forEach(step => step.classList.remove('active'));
    document.getElementById(`step${stepNumber}`).classList.add('active');
    currentStep = stepNumber;
    
    // Update buttons
    prevBtn.style.display = stepNumber === 1 ? 'none' : 'inline-flex';
    
    if (stepNumber === 3) {
        nextBtn.style.display = 'none';
        payNowBtn.style.display = 'none';
    } else if (stepNumber === 2) {
        nextBtn.style.display = 'none';
        payNowBtn.style.display = 'inline-flex';
    } else {
        nextBtn.style.display = 'inline-flex';
        payNowBtn.style.display = 'none';
    }
}

// Validate card form
function validateCardForm() {
    const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
    const expiryDate = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value;
    const cardName = document.getElementById('cardName').value.trim();

    if (!cardNumber || cardNumber.length < 16) {
        showToast('Nomor kartu tidak valid', 'error');
        return false;
    }

    if (!expiryDate.match(/^\d{2}\/\d{2}$/)) {
        showToast('Format masa berlaku salah (MM/YY)', 'error');
        return false;
    }

    if (!cvv || cvv.length !== 3) {
        showToast('CVV harus 3 digit', 'error');
        return false;
    }

    if (!cardName) {
        showToast('Nama di kartu harus diisi', 'error');
        return false;
    }

    return true;
}

// Process payment
function processPayment() {
    if (shoppingCart.length === 0) {
        showToast('Keranjang belanja kosong', 'error');
        return;
    }

    if (selectedPaymentMethod === 'card' && !validateCardForm()) {
        return;
    }

    // Generate order code
    const newOrderCode = generateOrderCode();
    orderCode.textContent = newOrderCode;

    // Simulate payment processing
    showToast('Memproses pembayaran...');
    
    setTimeout(() => {
        showStep(3);
        
        // Save order to localStorage
        const order = {
            code: newOrderCode,
            items: shoppingCart,
            total: calculateTotal().total,
            paymentMethod: selectedPaymentMethod,
            date: new Date().toISOString(),
            status: 'completed'
        };
        
        const orders = JSON.parse(localStorage.getItem('gourmetOrders')) || [];
        orders.push(order);
        localStorage.setItem('gourmetOrders', JSON.stringify(orders));
        
        // Clear cart
        shoppingCart = [];
        saveCart();
        updateCartCount();
        
        showToast('Pembayaran berhasil!', 'success');
    }, 2000);
}

// Initialize payment system
function initPaymentSystem() {
    // Update cart count on load
    updateCartCount();
    
    // Open payment modal when cart button is clicked
    cartBtn.addEventListener('click', () => {
        if (shoppingCart.length === 0) {
            showToast('Keranjang belanja kosong', 'error');
            return;
        }
        
        renderOrderSummary();
        showStep(1);
        paymentModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    // Close payment modal
    paymentCloseBtn.addEventListener('click', () => {
        paymentModal.style.display = 'none';
        document.body.style.overflow = '';
    });

    // Close modal when clicking outside
    paymentModal.addEventListener('click', (e) => {
        if (e.target === paymentModal) {
            paymentModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    // Payment method selection
    paymentMethods.forEach(method => {
        method.addEventListener('click', () => {
            paymentMethods.forEach(m => m.classList.remove('active'));
            method.classList.add('active');
            selectedPaymentMethod = method.getAttribute('data-method');
            
            // Show corresponding payment details
            paymentDetails.forEach(detail => detail.style.display = 'none');
            document.getElementById(`${selectedPaymentMethod}Details`).style.display = 'block';
        });
    });

    // Navigation buttons
    prevBtn.addEventListener('click', () => {
        if (currentStep > 1) {
            showStep(currentStep - 1);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentStep < 3) {
            showStep(currentStep + 1);
        }
    });

    payNowBtn.addEventListener('click', processPayment);

    // Format card number input
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '').replace(/\D/g, '');
            let formattedValue = '';
            
            for (let i = 0; i < value.length; i++) {
                if (i > 0 && i % 4 === 0) {
                    formattedValue += ' ';
                }
                formattedValue += value[i];
            }
            
            e.target.value = formattedValue.substring(0, 19);
        });
    }

    // Format expiry date input
    const expiryDateInput = document.getElementById('expiryDate');
    if (expiryDateInput) {
        expiryDateInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            
            e.target.value = value.substring(0, 5);
        });
    }

    // Prevent non-numeric input for CVV
    const cvvInput = document.getElementById('cvv');
    if (cvvInput) {
        cvvInput.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '').substring(0, 3);
        });
    }
}

// Image error handling
window.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        e.target.style.display = 'none';
        const fallback = document.createElement('div');
        fallback.className = 'image-fallback';
        fallback.innerHTML = '<div>🍽️ Gambar Tidak Tersedia</div>';
        e.target.parentNode.insertBefore(fallback, e.target);
        e.target.remove();
    }
}, true);

// Add event listener untuk ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' || e.key === 'Esc') {
        toast.classList.remove('show');
        if (paymentModal.style.display === 'flex') {
            paymentModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    }
});

// Perbaikan untuk swipe dismiss di mobile
let touchStartY = 0;
let touchEndY = 0;

toast.addEventListener('touchstart', function(e) {
    touchStartY = e.changedTouches[0].screenY;
}, { passive: true });

toast.addEventListener('touchend', function(e) {
    touchEndY = e.changedTouches[0].screenY;
    
    // Jika swipe down lebih dari 50px, hide toast
    if (touchStartY - touchEndY > 50) {
        this.classList.remove('show');
    }
}, { passive: true });

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Render initial menu
    renderMenuItems();
    
    // Initialize fade-in observer
    observeFadeElements();
    
    // Set header initial state
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    }
    
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').min = today;
    
    // Set default date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById('date').valueAsDate = tomorrow;
    
    // Initialize active nav link
    updateActiveNavLink();
    
    // Initialize payment system
    initPaymentSystem();
    
    // Add hover effect to menu items
    document.addEventListener('mousemove', (e) => {
        const cards = document.querySelectorAll('.menu-item, .feature-card, .chef-card');
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
});

// Add CSS for mouse effect
const style = document.createElement('style');
style.textContent = `
    .menu-item, .feature-card, .chef-card {
        position: relative;
        overflow: hidden;
    }
    
    .menu-item::before, .feature-card::before, .chef-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(
            600px circle at var(--mouse-x) var(--mouse-y),
            rgba(193, 154, 83, 0.1),
            transparent 40%
        );
        opacity: 0;
        transition: opacity 0.5s;
        pointer-events: none;
    }
    
    .menu-item:hover::before, .feature-card:hover::before, .chef-card:hover::before {
        opacity: 1;
    }
`;
document.head.appendChild(style);

// Make functions available globally
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
