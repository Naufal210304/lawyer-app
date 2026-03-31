Siap, ini aku tuliskan ulang dalam format **Markdown rapi + profesional** untuk kamu pakai sebagai dokumentasi utama (pengganti yang lama) 🔥

---

# 🗄️ Database Structure - Lawyer Web App (Final Version)

Dokumentasi ini menjelaskan skema database MySQL yang digunakan untuk mendukung fitur **CMS (Admin Dashboard)** dan **Client-Side Website**.

---

## 1. Tabel `roles`

Menyimpan daftar role/level akses pengguna.

| Field  | Type        | Constraint       | Description                       |
| ------ | ----------- | ---------------- | --------------------------------- |
| `id`   | INT         | Primary Key, AI  | ID unik role                      |
| `name` | VARCHAR(50) | Unique, Not Null | Nama role (`superadmin`, `admin`) |

---

## 2. Tabel `users`

Menyimpan data akun untuk Admin Dashboard.

| Field        | Type         | Constraint                  | Description                     |
| ------------ | ------------ | --------------------------- | ------------------------------- |
| `id`         | INT          | Primary Key, AI             | ID unik user                    |
| `username`   | VARCHAR(50)  | Unique, Not Null            | Username untuk login            |
| `email`      | VARCHAR(100) | Unique, Not Null            | Email user                      |
| `password`   | VARCHAR(255) | Not Null                    | Password (hashed dengan bcrypt) |
| `role_id`    | INT          | Foreign Key                 | Relasi ke tabel `roles`         |
| `created_at` | TIMESTAMP    | Default CURRENT_TIMESTAMP   | Waktu dibuat                    |
| `updated_at` | TIMESTAMP    | ON UPDATE CURRENT_TIMESTAMP | Waktu update terakhir           |

---

## 3. Tabel `categories`

Menyimpan kategori artikel blog.

| Field  | Type         | Constraint       | Description      |
| ------ | ------------ | ---------------- | ---------------- |
| `id`   | INT          | Primary Key, AI  | ID unik kategori |
| `name` | VARCHAR(100) | Unique, Not Null | Nama kategori    |

---

## 4. Tabel `blogs`

Menyimpan konten artikel/insight.

| Field         | Type         | Constraint                  | Description               |
| ------------- | ------------ | --------------------------- | ------------------------- |
| `id`          | INT          | Primary Key, AI             | ID unik artikel           |
| `author_id`   | INT          | Foreign Key                 | Relasi ke `users.id`      |
| `category_id` | INT          | Foreign Key                 | Relasi ke `categories.id` |
| `title`       | VARCHAR(255) | Not Null                    | Judul artikel             |
| `slug`        | VARCHAR(255) | Unique, Not Null            | URL SEO                   |
| `type`        | ENUM         | 'latest', 'suggest'         | Tipe tampilan             |
| `content`     | TEXT         | Not Null                    | Isi artikel               |
| `image_url`   | VARCHAR(255) | Nullable                    | Thumbnail                 |
| `status`      | ENUM         | 'draft', 'published'        | Status artikel            |
| `created_at`  | TIMESTAMP    | Default CURRENT_TIMESTAMP   | Waktu dibuat              |
| `updated_at`  | TIMESTAMP    | ON UPDATE CURRENT_TIMESTAMP | Waktu update              |

---

## 5. Tabel `practice_areas`

Mengelola layanan hukum pada website.

| Field           | Type         | Constraint                  | Description        |
| --------------- | ------------ | --------------------------- | ------------------ |
| `id`            | INT          | Primary Key, AI             | ID unik            |
| `slug`          | VARCHAR(100) | Unique, Not Null            | Identifier URL     |
| `title`         | VARCHAR(100) | Not Null                    | Nama layanan       |
| `description`   | TEXT         | Not Null                    | Deskripsi singkat  |
| `detail`        | TEXT         | Not Null                    | Penjelasan lengkap |
| `cases_example` | TEXT         | Not Null                    | Contoh kasus       |
| `created_at`    | TIMESTAMP    | Default CURRENT_TIMESTAMP   | -                  |
| `updated_at`    | TIMESTAMP    | ON UPDATE CURRENT_TIMESTAMP | -                  |

---

## 6. Tabel `team_members`

Data anggota tim/pengacara.

| Field          | Type         | Constraint      | Description   |
| -------------- | ------------ | --------------- | ------------- |
| `id`           | INT          | Primary Key, AI | ID unik       |
| `name`         | VARCHAR(150) | Not Null        | Nama lengkap  |
| `position`     | VARCHAR(100) | Not Null        | Jabatan       |
| `image_url`    | VARCHAR(255) | Nullable        | Foto          |
| `bio`          | TEXT         | Nullable        | Biografi      |
| `linkedin_url` | VARCHAR(255) | Nullable        | Link LinkedIn |
| `order_index`  | INT          | Default 0       | Urutan tampil |

---

## 7. Tabel `partners`

Data partner/klien.

| Field      | Type         | Constraint               | Description   |
| ---------- | ------------ | ------------------------ | ------------- |
| `id`       | INT          | Primary Key, AI          | ID unik       |
| `name`     | VARCHAR(100) | Not Null                 | Nama partner  |
| `logo_url` | VARCHAR(255) | Not Null                 | Logo          |
| `category` | ENUM         | 'strategic', 'corporate' | Jenis partner |

---

## 8. Tabel `consultations`

Data form konsultasi dari client.

| Field             | Type         | Constraint                       | Description          |
| ----------------- | ------------ | -------------------------------- | -------------------- |
| `id`              | INT          | Primary Key, AI                  | ID unik              |
| `full_name`       | VARCHAR(150) | Not Null                         | Nama pengirim        |
| `phone_number`    | VARCHAR(20)  | Not Null                         | Nomor kontak         |
| `email`           | VARCHAR(100) | Not Null                         | Email                |
| `service_area`    | VARCHAR(100) | Not Null                         | Layanan yang dipilih |
| `problem_details` | TEXT         | Not Null                         | Detail masalah       |
| `status`          | ENUM         | 'pending', 'contacted', 'closed' | Status               |
| `admin_notes`     | TEXT         | Nullable                         | Catatan admin        |
| `created_at`      | TIMESTAMP    | Default CURRENT_TIMESTAMP        | Waktu kirim          |

---

## 9. Tabel `faqs`

Daftar pertanyaan umum.

| Field      | Type         | Constraint      | Description |
| ---------- | ------------ | --------------- | ----------- |
| `id`       | INT          | Primary Key, AI | ID unik     |
| `question` | VARCHAR(255) | Not Null        | Pertanyaan  |
| `answer`   | TEXT         | Not Null        | Jawaban     |

---

## 10. Tabel `web_settings`

Konfigurasi data dinamis website.

| Field      | Type         | Constraint       | Description |
| ---------- | ------------ | ---------------- | ----------- |
| `id`       | INT          | Primary Key, AI  | ID unik     |
| `key_name` | VARCHAR(50)  | Unique, Not Null | Key setting |
| `value`    | VARCHAR(100) | Not Null         | Nilai       |
| `type`     | ENUM         | 'text', 'number' | Tipe data   |

---

# 🔗 Relationships

1. **Roles → Users (1:N)**
   Satu role dapat dimiliki oleh banyak user.

2. **Users → Blogs (1:N)**
   Satu user dapat membuat banyak artikel.

3. **Categories → Blogs (1:N)**
   Satu kategori memiliki banyak artikel.

4. **Consultations**
   Tidak memiliki foreign key langsung, namun `service_area` dapat divalidasi dari `practice_areas`.

---

# 🔐 Catatan Keamanan

* Password disimpan dalam bentuk **hash (bcrypt)**
* Role user ditentukan dari backend (tidak dari frontend)
* Gunakan JWT untuk autentikasi
* Hindari menyimpan data sensitif dalam bentuk plaintext

---

# 🎯 Tujuan Struktur

Database ini dirancang untuk:

* ✅ Mendukung CMS (Admin & Superadmin)
* ✅ Mengelola konten website secara dinamis
* ✅ Mendukung sistem autentikasi & role-based access
* ✅ Siap dikembangkan untuk skala lebih besar

---



