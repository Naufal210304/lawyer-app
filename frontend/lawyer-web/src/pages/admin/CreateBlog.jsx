import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateBlog = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category_id: '',
    type: 'latest',
    status: 'draft',
    content: '',
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // Fungsi untuk generate slug otomatis saat judul diketik
  const handleTitleChange = (e) => {
    const title = e.target.value;
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    setFormData({ ...formData, title, slug });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Menyiapkan FormData karena ada file (image_url)
      const data = new FormData();
      data.append('title', formData.title);
      data.append('slug', formData.slug);
      data.append('category_id', formData.category_id);
      data.append('type', formData.type);
      data.append('status', formData.status);
      data.append('content', formData.content);
      
      // Ambil author_id dari localStorage (pastikan di Login.jsx kamu menyimpannya)
      // Jika belum ada, sementara kita hardcode '1' sesuai data dummy di Blog.jsx
      const userId = localStorage.getItem('userId') || '1';
      data.append('author_id', userId);

      if (image) {
        data.append('image', image);
      }

      const token = localStorage.getItem('token');
      
      await axios.post('http://localhost:3001/api/blogs', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      alert('Artikel berhasil dipublikasikan!');
      navigate('/admin/blogs');
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal menyimpan artikel. Coba lagi nanti.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Buat Artikel Baru</h1>
        <p className="text-slate-500 mt-1">Lengkapi form di bawah untuk mempublikasikan wawasan hukum baru.</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Kolom Utama: Konten */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Judul Artikel</label>
              <input
                type="text"
                required
                placeholder="Contoh: Pentingnya Perlindungan Hak Cipta..."
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all text-lg font-medium"
                value={formData.title}
                onChange={handleTitleChange}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Permalink (URL)</label>
              <input
                type="text"
                required
                readOnly
                className="w-full px-4 py-2 border border-slate-100 rounded-lg bg-slate-50 text-slate-400 outline-none font-mono text-xs"
                value={formData.slug}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Isi Konten</label>
              <textarea
                required
                rows="15"
                placeholder="Tuliskan isi artikel lengkap di sini..."
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none leading-relaxed"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              ></textarea>
            </div>
          </div>
        </div>

        {/* Kolom Samping: Metadata & Gambar */}
        <div className="space-y-6">
          {/* Pengaturan Card */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-5">
            <h3 className="font-bold text-slate-800 border-b border-slate-50 pb-3 mb-2">Pengaturan</h3>
            
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Kategori</label>
              <select 
                required
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                value={formData.category_id}
                onChange={(e) => setFormData({...formData, category_id: e.target.value})}
              >
                <option value="">Pilih Kategori</option>
                <option value="1">Corporate Law</option>
                <option value="2">Property & Land</option>
                <option value="3">Criminal Defense</option>
                <option value="4">Family Law</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Tipe Tampilan</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                  <input type="radio" name="type" value="latest" checked={formData.type === 'latest'} onChange={(e) => setFormData({...formData, type: e.target.value})} className="accent-blue-600" />
                  Latest
                </label>
                <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                  <input type="radio" name="type" value="suggest" checked={formData.type === 'suggest'} onChange={(e) => setFormData({...formData, type: e.target.value})} className="accent-blue-600" />
                  Suggest
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Status Publikasi</label>
              <select 
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 font-bold text-blue-600 cursor-pointer"
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
              >
                <option value="draft">📁 Draft (Simpan Saja)</option>
                <option value="published">🚀 Published (Terbitkan)</option>
              </select>
            </div>
          </div>

          {/* Image Upload Card */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-800">Thumbnail Artikel</h3>
            <div className="aspect-video bg-slate-50 border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center relative overflow-hidden group hover:border-blue-400 transition-colors">
              {preview ? (
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center">
                  <span className="text-3xl">🖼️</span>
                  <p className="text-[10px] text-slate-400 mt-2 uppercase font-bold tracking-widest">Click to upload image</p>
                </div>
              )}
              <input 
                type="file" 
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer" 
                onChange={handleImageChange}
              />
            </div>
            {preview && (
              <button type="button" onClick={() => {setPreview(null); setImage(null)}} className="w-full text-xs text-red-500 font-bold hover:underline">Hapus & Ganti Gambar</button>
            )}
          </div>

          {/* Tombol Aksi */}
          <div className="flex flex-col gap-3 pt-2">
            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-100 transition-all ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700 hover:-translate-y-0.5'}`}
            >
              {isLoading ? 'Sedang Memproses...' : 'Simpan Artikel'}
            </button>
            <button type="button" disabled={isLoading} onClick={() => navigate('/admin/blogs')} className="w-full bg-slate-100 text-slate-600 font-bold py-4 rounded-xl hover:bg-slate-200 transition-all">
              Batal
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;