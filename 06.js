// ==========================================
// ABSTRACT CLASS: KENDARAAN
// ==========================================
// kelompok 25 falah agung aji sabrina
class Kendaraan {
    constructor(merk) {
        this.merk = merk;
        // Mencegah instansiasi langsung dari kelas abstrak
        if (this.constructor === Kendaraan) {
            throw new Error("Kelas abstrak 'Kendaraan' tidak bisa diinstansiasi langsung.");
        }
    }

    // Method abstrak yang harus diimplementasikan oleh subclass
    maju() {
        throw new Error("Method 'maju()' harus diimplementasikan!");
    }
}

// ==========================================
// CONCRETE CLASS: MOBIL
// ==========================================

class Mobil extends Kendaraan {
    maju() {
        return `${this.merk} melaju dengan kecepatan tinggi!`;
    }
}

// Test Mobil
console.log("=== TEST MOBIL ===");
const avanza = new Mobil("Toyota Avanza");
console.log(avanza.maju()); // Toyota Avanza melaju dengan kecepatan tinggi!

// ==========================================
// INTERFACE PATTERN: KENDARAAN
// ==========================================

const kendaraanInterface = {
    maju: function () {
        throw new Error("Method 'maju()' harus diimplementasikan!");
    }
};

// ==========================================
// CONCRETE CLASS: SEPEDA (dengan Interface)
// ==========================================

class Sepeda {
    constructor(merk) {
        this.merk = merk;
    }

    maju() {
        return `${this.merk} melaju dengan tenaga manusia!`;
    }
}

// Test Sepeda
console.log("\n=== TEST SEPEDA ===");
const polygon = new Sepeda("Polygon");
console.log(polygon.maju()); // Polygon melaju dengan tenaga manusia!

// Validasi interface
if (typeof polygon.maju !== "function") {
    throw new Error("Class Sepeda harus mengimplementasikan 'maju()'!");
}
console.log("✓ Sepeda memenuhi interface kendaraanInterface");

// ==========================================
// ABSTRACT CLASS: PEMBAYARAN
// ==========================================

class Pembayaran {
    constructor(jumlah) {
        this.jumlah = jumlah;
        if (this.constructor === Pembayaran) {
            throw new Error("Kelas abstrak 'Pembayaran' tidak bisa diinstansiasi langsung.");
        }
    }

    // Method abstrak
    prosesPembayaran() {
        throw new Error("Method 'prosesPembayaran()' harus diimplementasikan!");
    }
}

// ==========================================
// CONCRETE CLASS: KARTU KREDIT
// ==========================================

class KartuKredit extends Pembayaran {
    prosesPembayaran() {
        return `Rp${this.jumlah.toLocaleString('id-ID')} melalui Kartu Kredit berhasil!`;
    }
}

// ==========================================
// CONCRETE CLASS: PAYPAL
// ==========================================

class PayPal extends Pembayaran {
    prosesPembayaran() {
        return `Rp${this.jumlah.toLocaleString('id-ID')} melalui PayPal berhasil!`;
    }
}

// ==========================================
// TEST PEMBAYARAN
// ==========================================

console.log("\n=== TEST PEMBAYARAN ===");
const bayar1 = new KartuKredit(500000);
console.log(bayar1.prosesPembayaran());

const bayar2 = new PayPal(250000);
console.log(bayar2.prosesPembayaran());

// ==========================================
// DEMO: ERROR HANDLING
// ==========================================

console.log("\n=== DEMO ERROR HANDLING ===");

// Error 1: Instansiasi kelas abstrak
try {
    const kendaraanBaru = new Kendaraan("Generic");
} catch (error) {
    console.log("❌ Error 1:", error.message);
}

// Error 2: Method abstrak tidak diimplementasikan
class Motor extends Kendaraan {
    // Tidak implementasi method maju()
}

try {
    const motor = new Motor("Honda");
    motor.maju(); // Akan throw error
} catch (error) {
    console.log("❌ Error 2:", error.message);
}

// Error 3: Instansiasi kelas abstrak Pembayaran
try {
    const bayar = new Pembayaran(100000);
} catch (error) {
    console.log("❌ Error 3:", error.message);
}

console.log("\n=== PROGRAM SELESAI ===");
