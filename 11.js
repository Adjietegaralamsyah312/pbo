// MAP mahasiswa
let mahasiswa = new Map();
mahasiswa.set("001", "Andi");
mahasiswa.set("002", "Budi");
mahasiswa.set("003", "Citra");
mahasiswa.set("002", "Citra"); // menimpa Budi

console.log(mahasiswa.get("001"));
console.log(mahasiswa.get("003"));
console.log(mahasiswa.get("002"));
console.log(mahasiswa.get("001"));


// FUNCTION printItems
function printItems(items) {
    for (let item of items) {
        console.log(item);
    }
}

printItems([1, 2, 3]);
printItems(["A", "B", "C"]);
printItems([1, 2, 3, "A", "B", "C"]);


// SET tugas
let tugas = new Set();
tugas.add("Belajar OOP");
tugas.add("Mengerjakan Tugas");
tugas.add("Belajar OOP "); // beda karena ada spasi

console.log(tugas);
