# 🧪 Testing Guide - Login & Navbar Fixes

## Quick Start

### 1. Backend Server
```bash
cd backend
node src/server.js
```
Server akan running di `http://localhost:3001`

### 2. Frontend Development Server
```bash
cd frontend/lawyer-web
npm run dev
```
Frontend akan running di `http://localhost:5173` (atau port lain yang ditunjukkan)

---

## Test Scenario 1: Admin Login 401 Error (FIXED ✅)

### Test Steps:
1. Buka browser → `http://localhost:5173/admin/login`
2. Gunakan credentials:
   - **Superadmin Login:**
     - Username/Email: `admin@email.com` atau `AbuSaminan12`
     - Password: `admin123`
   - **Admin Login:**
     - Username/Email: `desintads@gmail.com` atau `Desinta Maharani`
     - Password: `admin123`

### Expected Result:
- ✅ Login berhasil (tidak ada 401 error)
- ✅ Redirect ke `/admin/dashboard`
- ✅ Token disimpan di localStorage
- ✅ Can access admin pages

### If Error:
- Check browser console (F12) untuk error message
- Verify backend server running di port 3001
- Check Network tab untuk melihat response dari `/api/auth/login`

---

## Test Scenario 2: Navbar Flexibility (FIXED ✅)

### Setup:
1. Login sebagai **Superadmin** (AbuSaminan12)
2. Navigate ke `/admin/dashboard`
3. **OBSERVE navbar di atas** (dengan nama dan foto profil)

### Test Steps:

**Step 1: Verify Initial Login**
- Nama di navbar harus menunjukkan: `AbuSaminan12 (superadmin)`
- Avatar/foto harus menunjuk foto superadmin (atau initial "A" jika belum ada foto)

**Step 2: Logout and Switch Account**
1. Click tombol Logout di sidebar
2. Kembali ke login page
3. Login sebagai **Admin** (Desinta Maharani)
4. **OBSERVE navbar - HARUS LANGSUNG BERUBAH** (tanpa perlu refresh atau ke Settings)
   - Nama: `Desinta Maharani (admin)`
   - Avatar: Initial "D" (atau foto Desinta)

**Step 3: Logout and Login Back**
1. Logout lagi
2. Login kembali sebagai **Superadmin** (AbuSaminan12)
3. **VERIFY navbar otomatis kembali** ke data superadmin

### Key Points:
- ✅ Navbar harus update LANGSUNG saat login/logout (tidak perlu refresh)
- ✅ Tidak perlu pergi ke Settings untuk update data
- ✅ Setiap account change langsung reflect di navbar
- ✅ Nama dan foto profil konsisten dengan account yang login

### If Not Working:
- Check browser console untuk errors
- Verify AuthContext di `useAuth()` returns correct `username` & `profilePic`
- Check localStorage → values harus update saat login/logout
- Verify admin Navbar.jsx menggunakan `useAuth` hook (bukan localStorage langsung)

---

## Test Scenario 3: Profile Picture Upload (Optional)

### Setup:
1. Login sebagai admin
2. Go to `/admin/settings`
3. Upload profile picture

### Expected:
- Photo upload works
- `profile_pic` field terisi dengan URL
- Next login akan menampilkan foto di navbar (bukan initial)

---

## Files Modified

### Backend
```
backend/src/modules/auth/auth.controller.js
- Login endpoint → returns profile_pic
- /me endpoint → returns profile_pic

backend/reset_password.js (NEW)
backend/reset_password_admin.js (NEW)
```

### Frontend
```
frontend/lawyer-web/src/context/AuthContext.jsx
- Increased state management
- Now tracks: user, token, role, username, profilePic

frontend/lawyer-web/src/components/layout/admin/Navbar.jsx
- Changed from localStorage to useAuth hook
- Now reactive to auth state changes
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| 401 Unauthorized | Verify password reset scripts ran, check database |
| Navbar not updating | Check browser console, verify AuthContext setup |
| Session lost on refresh | Check localStorage values are being saved |
| Photo not showing | Check `/uploads` folder permission, verify URL format |

---

## Notes

- Backend server needs restart to load new code
- Frontend auto-reloads with Vite dev server
- Passwords are bcrypt hashed in database
- localStorage persists data across page refreshes
- Token expires in 24 hours (set in auth.controller.js)
