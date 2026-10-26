# Undangan Pernikahan Digital Adat Jawa

Undangan pernikahan digital bertema Jawa, dibuat untuk **Tugas Mandiri mata kuliah PBP**.
Website ini memadukan motif batik (kawung, truntum, parang), siluet gunungan wayang,
dan pita tumpal dengan palet hijau lumut, maroon, emas, dan gading.

**Demo:** https://undanganpernikahan-baried.vercel.app/

## Fitur

- Cover pembuka bergaya gunungan, dengan nama tamu dari URL (`?to=Budi+Santoso`)
- Musik latar gamelan dengan tombol putar dan jeda
- Hitung mundur menuju hari pernikahan
- Profil kedua mempelai, kisah perjalanan, dan detail acara dengan tautan peta
- Penjelasan rangkaian adat Jawa: Siraman, Midodareni, Panggih, Sungkeman
- Formulir konfirmasi kehadiran (RSVP)
- Kartu ucapan dan doa dari para tamu
- Tanda kasih dengan tombol salin nomor rekening
- Dashboard admin untuk melihat data kehadiran dan ucapan, dengan ekspor CSV
- Responsif untuk HP dan mendukung `prefers-reduced-motion`

## Teknologi

- HTML5 dan CSS3
- Bootstrap 5.3 dan Bootstrap Icons
- JavaScript (vanilla)
- Google Apps Script dan Google Sheets (penyimpanan data, opsional)
- Vercel (hosting)

## Struktur Folder

```
├── index.html          Halaman undangan
├── css/style.css       Gaya dan motif batik
├── js/script.js        Logika cover, musik, hitung mundur, RSVP, ucapan
├── admin/index.html    Dashboard data kehadiran
├── apps-script/Code.gs Skrip penyimpanan ke Google Sheets
└── assets/             Foto, logo bank, dan musik
```

## Menjalankan di Komputer

1. Clone repo ini:
   ```bash
   git clone https://github.com/USERNAME/undangan-jawa.git
   ```
2. Buka foldernya di VS Code, lalu jalankan dengan ekstensi **Live Server** (klik *Go Live*).

## Mengubah Data Undangan

- **Nama, orang tua, acara, lokasi, rekening:** `index.html`
- **Tanggal hitung mundur:** konstanta `weddingDate` di `js/script.js`
- **Foto dan musik:** simpan di folder `assets/`, lalu sesuaikan atribut `src`
- **Warna dan motif:** variabel di bagian atas `css/style.css`

## Menyimpan Data Kehadiran (Opsional)

Secara bawaan, data RSVP dan ucapan hanya tersimpan di browser masing-masing tamu.
Agar tersimpan terpusat:

1. Buat Google Sheet, buka **Extensions > Apps Script**, lalu tempel isi `apps-script/Code.gs`.
2. Ganti nilai `KUNCI` dengan kata sandi admin milikmu.
3. Deploy sebagai **Web app** (Execute as: Me, Who has access: Anyone), lalu salin URL `/exec`.
4. Isi `SHEET_URL` di `js/script.js` dan `admin/index.html` dengan URL tersebut.
5. Buka `/admin/` dan masukkan kata sandi untuk melihat data.

## Deploy ke Vercel

1. Login ke [vercel.com](https://vercel.com) dengan akun GitHub.
2. **Add New > Project**, lalu pilih repo ini.
3. Framework Preset: **Other**, kosongkan Build Command, lalu klik **Deploy**.

## Catatan

- Foto, musik, dan logo bank pada demo adalah contoh. Ganti dengan milik sendiri.
- Pastikan musik yang dipakai bebas royalti atau cantumkan kreditnya.

## Pembuat

Nama Kamu · NIM · Mata Kuliah PBP
