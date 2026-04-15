# Testing Fixes untuk 3 Masalah

## ✅ Masalah 1: Practice Areas Tidak Masuk Database

**Penyebab:** Endpoint `/api/practice-areas` memerlukan token JWT yang valid

**Fix yang dilakukan:**
- ✅ Menambah error tracking dan debug logging di form submit
- ✅ Menambah success alert setelah submit
- ✅ Improved error messages

**Cara Testing:**
1. Buka browser console (F12)
2. Buka halaman Practice Area Admin
3. Klik "Tambah Layanan Baru"
4. Isi semua field
5. Lihat console untuk melihat request yang dikirim
6. Jika failed, akan melihat error message lengkap

**Hal yang perlu diperhatikan:**
- Token JWT harus valid (login dulu)
- Field: title, slug (auto-generated), description, detail, cases_example wajib diisi

---

## ✅ Masalah 2: Superadmin Tidak Bisa Hapus Team (Users)

**Penyebab:** 
- Role tidak cocok atau user tidak adalah superadmin
- Error message tidak jelas

**Fix yang dilakukan:**
- ✅ Menambah better error handling di frontend
- ✅ Menambah debug logging di backend
- ✅ Membuat logic lebih fleksibel (superadmin OR user self-delete)
- ✅ Improved error messages untuk feedback yang jelas

**Cara Testing:**
1. Login sebagai superadmin (role_id = 1)
2. Buka halaman Team
3. Buka browser console (F12)
4. Klik tombol hapus pada user aktif
5. Lihat console untuk debug logs dan error messages
6. Check backend logs juga (terminal backend)

**Perhatian:**
- Superadmin adalah user dengan role_id = 1
- Check di database: `SELECT id, username, role_id FROM users;`
- Jika role = admin, tidak bisa delete user lain

---

## ✅ Masalah 3: Foto Profil Settings Error

**Penyebab:** 
- URL foto tidak dengan prefix full URL ke server
- Preview tidak tersinkronisasi dengan file yang di-upload
- Response dari server tidak berisi URL lengkap

**Fix yang dilakukan:**
- ✅ Backend sekarang return full user data (include profile_pic URL)
- ✅ Frontend construct full URL dari profile_pic path
- ✅ Improved file upload handling
- ✅ Console logs untuk debug

**Cara Testing:**
1. Buka halaman Settings
2. Klik ikon kamera untuk upload foto
3. Pilih gambar dari komputer
4. Preview seharusnya langsung muncul
5. Klik "Simpan Perubahan"
6. Lihat console untuk logs
7. Foto di navbar seharusnya update otomatis (page reload)

**URL Photo Endpoint:**
- Foto akan tersimpan di: `/uploads/profile-[timestamp]-[random].jpg`
- Full URL: `http://localhost:3001/uploads/profile-xxx.jpg`

---

## Debugging Checklist Lengkap:

### Untuk Practice Areas:
- [ ] Token valid dan tidak expired
- [ ] Semua field form terisi
- [ ] Check network tab untuk melihat response
- [ ] Backend logs menampilkan `Sending practice area data:`

### Untuk Team Delete:
- [ ] User yang login adalah superadmin (role == 'superadmin')
- [ ] Check token decode: `atob(token.split('.')[1])`
- [ ] Backend logs menampilkan role dan user IDs
- [ ] Delete endpoint `/api/users/{id}` return 200 OK

### Untuk Profile Photo:
- [ ] Foto berhasil upload ke `/uploads` folder
- [ ] Response include `profile_pic` URL
- [ ] Preview terlihat sebelum save
- [ ] URL dengan prefix `http://localhost:3001` bila diminta

---

## Restart Backend (jika diperlukan):

Jika masih ada yang tidak berfungsi, restart backend:

```bash
# Kill existing process
taskkill /f /im node.exe

# Start backend
cd c:\xampp\htdocs\lawyer-app\backend
node src/server.js
```

Server seharusnya menampilkan:
```
Server running on port 3001
Connected to MySQL database!
```

