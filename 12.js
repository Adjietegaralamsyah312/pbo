// simpanMahasiswa.js
function simpanMahasiswa(key, data) {
  try {
    const json = JSON.stringify(data);
    localStorage.setItem(key, json);
    console.log("Data tersimpan di localStorage:", key);
  } catch (err) {
    console.error("Gagal menyimpan ke localStorage:", err);
  }
}

function muatMahasiswa(key) {
  try {
    const json = localStorage.getItem(key);
    if (!json) {
      console.warn("Tidak ada data untuk kunci:", key);
      return [];
    }
    const parsed = JSON.parse(json);
    if (!Array.isArray(parsed)) {
      console.warn("Format data tidak seperti yang diharapkan (array).");
      return [];
    }
    return parsed;
  } catch (err) {
    console.error("Gagal memuat/parse data:", err);
    return [];
  }
}

// Validasi sederhana
function validasiMahasiswaArray(arr) {
  if (!Array.isArray(arr)) return false;
  return arr.every(m => m && typeof m.nama === "string" && typeof m.jurusan === "string");
}

// Contoh pemakaian
const mahasiswa = [
  { nama: "Andi", umur: 21, jurusan: "Informatika" },
  { nama: "Budi", umur: 22, jurusan: "Sistem Informasi" }
];

if (validasiMahasiswaArray(mahasiswa)) {
  simpanMahasiswa("mahasiswa", mahasiswa);
}

const mahasiswaList = muatMahasiswa("mahasiswa");
console.log("Daftar Mahasiswa:");
mahasiswaList.forEach(m => console.log(`${m.nama} - ${m.jurusan}`));
