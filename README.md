# 🏛️ Lawyer Web App

## 📌 Deskripsi Project
Lawyer Web App adalah aplikasi website yang digunakan untuk agency atau firma hukum dalam mempromosikan layanan mereka secara online. Website ini terdiri dari dua bagian utama, yaitu:

1. **Website Utama (Client Side)**
   Digunakan oleh pengunjung untuk melihat informasi seperti:
   - Home
   - Practice Area
   - Our Team
   - Our Partner
   - Blog

2. **Admin Dashboard (CMS)**
   Digunakan oleh admin dan superadmin untuk mengelola konten website seperti:
   - Manajemen blog
   - Manajemen team
   - Consultation (pending & history)
   - Dashboard monitoring

---

## ⚙️ Teknologi yang Digunakan

### 🎨 Frontend
- React.js → Library utama untuk membangun UI
- Tailwind CSS → Styling cepat dan responsive
- React Router → Navigasi halaman
- Axios / Fetch API → Komunikasi dengan backend

### 🧠 Backend
- Node.js → Runtime JavaScript
- Express.js → Framework backend
- MySQL (XAMPP) → Database
- Multer → Upload file (thumbnail blog)
- Slugify → Generate URL SEO-friendly

---

## 🧱 Arsitektur Project

Project ini menggunakan konsep **Separation of Concerns**, yaitu memisahkan antara:
- UI (tampilan)
- Logic (proses)
- Data (database)

---


## 📌 Penjelasan Backend

- **config/db.js**  
  Mengatur koneksi ke database MySQL.

- **modules/**  
  Berisi fitur utama aplikasi (modular system):
  - controller → handle request & response
  - service → logic bisnis / algoritma
  - model → query database
  - routes → endpoint API
  - validation → validasi input (opsional)

- **middlewares/**  
  Fungsi tambahan seperti:
  - autentikasi user
  - handling error

- **utils/**  
  Helper function seperti:
  - slug generator
  - format response API

- **routes/index.js**  
  Menggabungkan semua route dari module.

- **app.js**  
  Setup express (middleware, cors, dll)

- **server.js**  
  Menjalankan server backend

- **uploads/**  
  Menyimpan file upload seperti gambar blog

---


## 📌 Penjelasan Frontend

- **assets/**  
  Menyimpan gambar, icon, dan file statis lainnya.

- **components/**  
  Komponen UI reusable:
  - ui → button, input, card
  - layout → navbar, footer

- **features/**  
  Logic berdasarkan fitur (best practice modern):
  - API call
  - state logic
  - komponen khusus fitur

- **pages/**  
  Halaman utama aplikasi (gabungan component & logic)

- **routes/**  
  Mengatur routing aplikasi

- **services/**  
  Konfigurasi API (axios)

- **hooks/**  
  Custom React hooks

- **context/**  
  Global state (misalnya auth user)

- **utils/**  
  Helper function frontend

- **App.jsx**  
  Root component

- **main.jsx**  
  Entry point React

---

## 🔧 Konfigurasi & Root Files

- **.env**  
  Menyimpan variabel sensitif (Environment Variables) seperti koneksi database, JWT Secret, dan API URL.

- **package.json**  
  Mengelola daftar library (dependency) dan script untuk menjalankan aplikasi.

- **vite.config.js** & **tailwind.config.js**  
  Konfigurasi untuk build tool (Vite) dan styling (Tailwind CSS).

- **index.html**  
  File HTML utama yang menjadi pintu masuk aplikasi di browser (tempat me-load `main.jsx`).

---

##  Sistem Role

- **Superadmin**
  - Akses semua fitur
  - CRUD team
  - Registrasi admin

- **Admin**
  - Dashboard
  - Consultation
  - Akses terbatas

---

## ✍️ Fitur Utama

- Blog CMS dengan rich text editor
- Dynamic blog (slug URL)
- Upload gambar
- Role-based access (admin & superadmin)
- Consultation management

---

## 🚀 Tujuan Project

Project ini dibuat untuk:
- Membangun website profesional untuk lawyer
- Menerapkan arsitektur scalable
- Melatih best practice fullstack development

---

## 📌 Catatan

Project ini menggunakan arsitektur modular dan scalable yang umum digunakan di dunia kerja, sehingga mudah dikembangkan untuk fitur tambahan di masa depan.
