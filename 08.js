// Definisi kelas error khusus
class ValidasiError extends Error {
  constructor(pesan) {
    super(pesan);
    this.name = "ValidasiError";
  }
}

// Fungsi cekUsia
function cekUsia(usia) {
  if (usia < 17) {
    throw new Error("Terjadi kesalahan: Maaf, Anda belum cukup umur!");
  }
  return "Usia valid";
}

// Fungsi cekNama
function cekNama(nama) {
  if (nama.length < 3) {
    throw new ValidasiError("Nama terlalu pendek");
  }
  return "Nama valid";
}


try {  
  let mahasiswa = ["Andi", "Budi", "Citra"];
  console.log(mahasiswa[5].toUpperCase()); // ❌ Index 5 tidak ada, akan error
} catch (error) {
  console.log("Terjadi error: " + error.message);
} finally {  
  console.log("Proses selesai.");
}


try {
  console.log(cekUsia(16)); // ❌ Akan error karena usia < 17
} catch (error) {
  console.log("Terjadi kesalahan: " + error.message);
}


try {  
  console.log(cekNama("Jo")); // ❌ Akan error karena nama < 3 huruf
} catch (error) {
  if (error instanceof ValidasiError) {
    console.log("Terjadi kesalahan validasi: " + error.message);
  } else {  
    console.log("Kesalahan lain: " + error.message);
  }
}
