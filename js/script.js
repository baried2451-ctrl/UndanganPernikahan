document.addEventListener("DOMContentLoaded", () => {
const $ = id => document.getElementById(id);

// Bootstrap toast untuk notifikasi
const toast = bootstrap.Toast.getOrCreateInstance($("appToast"), {
    delay: 3000
});

function showToast(message) {
    $("toastMessage").textContent = message;
    toast.show();
}

// URL Google Apps Script untuk menyimpan data ke Google Sheets.
// Kosongkan jika belum dipakai (data tetap tersimpan di browser).
const SHEET_URL = "https://script.google.com/a/macros/mhs.unesa.ac.id/s/AKfycbyg88b-yn-mS1GR1vuESsWKsjfGMStZxdayM69Xp4Ym6i8t4R1Up5bDsXPzvYO79jcm/exec";

function kirimKeSheet(data) {
    if (!SHEET_URL) return;
    fetch(SHEET_URL, { method: "POST", mode: "no-cors", body: JSON.stringify(data) })
    .catch(() => {});
}

// 1. Membuka cover undangan
$("openInvitation").addEventListener("click", async () => {
    $("opening").classList.add("closed");
    document.body.classList.remove("locked");
    document.body.classList.add("dibuka");
    $("home").scrollIntoView({ behavior: "smooth" });

// Browser mungkin menolak musik jika file tidak tersedia.
    try {
    await $("weddingMusic").play();
    $("musicToggle").classList.add("playing");
    $("musicToggle").innerHTML = '<i class="bi bi-pause-fill"></i>';
    } catch {
    showToast("Undangan dibuka. Musik dapat diputar melalui tombol musik.");
    }
});

// 2. Kontrol musik
$("musicToggle").addEventListener("click", async () => {
    const music = $("weddingMusic");
    const button = $("musicToggle");

    if (music.paused) {
    try {
        await music.play();
        button.classList.add("playing");
        button.innerHTML = '<i class="bi bi-pause-fill"></i>';
    } catch {
        showToast("Tambahkan file assets/music.mp3 terlebih dahulu.");
    }
    } else {
    music.pause();
    button.classList.remove("playing");
    button.innerHTML = '<i class="bi bi-music-note"></i>';
    }
});

// 3. Countdown menuju tanggal pernikahan
// Ubah tanggal ini jika tanggal pada undangan diganti.
const weddingDate = new Date("2026-12-20T08:00:00+07:00").getTime();

function updateCountdown() {
    const distance = weddingDate - Date.now();

    if (distance <= 0) {
    ["days", "hours", "minutes", "seconds"].forEach(id => {
        $(id).textContent = "00";
    });
    $("countdownMessage").textContent =
        "Hari bahagia telah tiba. Terima kasih atas doa Anda.";
    return;
    }

    $("days").textContent = String(
    Math.floor(distance / 86400000)
    ).padStart(2, "0");

    $("hours").textContent = String(
    Math.floor((distance % 86400000) / 3600000)
    ).padStart(2, "0");

    $("minutes").textContent = String(
    Math.floor((distance % 3600000) / 60000)
    ).padStart(2, "0");

    $("seconds").textContent = String(
    Math.floor((distance % 60000) / 1000)
    ).padStart(2, "0");

    $("countdownMessage").textContent =
    "Kami menantikan kehadiran dan doa terbaik Anda.";
}

updateCountdown();
setInterval(updateCountdown, 1000);

// 4. RSVP: simpan data di browser menggunakan localStorage
$("rsvpForm").addEventListener("submit", event => {
    event.preventDefault();

    const name = $("guestName").value.trim();
    const attendance = $("attendance").value;
    const guests = $("guestCount").value;

    if (!name || !attendance) {
    showToast("Silakan lengkapi formulir RSVP.");
    return;
    }

    const entries = JSON.parse(
    localStorage.getItem("weddingRsvp") || "[]"
    );

    entries.push({
    name,
    attendance,
    guests,
    createdAt: new Date().toISOString()
    });

    localStorage.setItem("weddingRsvp", JSON.stringify(entries));
    kirimKeSheet({ jenis: "RSVP", nama: name, kehadiran: attendance, jumlah: guests });

    $("rsvpResult").textContent =
    `Terima kasih, ${name}. Konfirmasi: ${attendance}, jumlah tamu ${guests} orang.`;

    $("rsvpResult").classList.remove("d-none");
    $("rsvpForm").reset();
});

// 5. Buku tamu digital
const wishList = $("wishList");

function renderWish(wish, prepend = false) {
    const card = document.createElement("article");
    card.className = "wish-item";

    const name = document.createElement("strong");
    name.textContent = wish.name;

    const message = document.createElement("p");
    message.textContent = wish.message;

// textContent mencegah masukan diperlakukan sebagai HTML.
    card.append(name, message);

    if (prepend) wishList.prepend(card);
    else wishList.append(card);
}

const savedWishes = JSON.parse(
    localStorage.getItem("weddingWishes") || "[]"
);

savedWishes.slice().reverse().forEach(wish => renderWish(wish));

$("wishForm").addEventListener("submit", event => {
    event.preventDefault();

    const name = $("wishName").value.trim();
    const message = $("wishText").value.trim();

    if (!name || !message) {
    showToast("Nama dan ucapan wajib diisi.");
    return;
    }

    const wishes = JSON.parse(
    localStorage.getItem("weddingWishes") || "[]"
    );

    const newWish = {
    name,
    message,
    createdAt: new Date().toISOString()
    };

    wishes.push(newWish);
    localStorage.setItem("weddingWishes", JSON.stringify(wishes));
    kirimKeSheet({ jenis: "Ucapan", nama: name, pesan: message });

    renderWish(newWish, true);
    $("wishForm").reset();
    showToast("Ucapan berhasil ditambahkan. Terima kasih!");
});

// 6. Menyalin nomor rekening contoh
$("copyAccount").addEventListener("click", async () => {
    const number = $("accountNumber").textContent.trim();

    try {
    await navigator.clipboard.writeText(number);
    $("copyMessage").textContent = "Nomor berhasil disalin.";
    } catch {
    $("copyMessage").textContent = `Silakan salin manual: ${number}`;
    }
});

// 7. Menutup navbar mobile setelah tautan diklik
document.querySelectorAll(".navbar .nav-link").forEach(link => {
    link.addEventListener("click", () => {
    const menu = $("navMenu");

    if (menu.classList.contains("show")) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }
    });
});
});
// Nama tamu dari URL, contoh: index.html?to=Budi+Santoso
document.addEventListener("DOMContentLoaded", () => {
const guest = new URLSearchParams(location.search).get("to");
if (guest) document.getElementById("guestGreeting").textContent = guest;
});