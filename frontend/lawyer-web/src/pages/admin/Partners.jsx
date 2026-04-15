import React, { useState, useEffect } from 'react';
import axios from '../../services/axios';

const Partners = () => {
  const [partners, setPartners] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPartner, setNewPartner] = useState({ name: '', category: 'strategic' });
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/partners');
      setPartners(response.data.data || []);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to load partners');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPartner.name.trim()) {
      return alert('Nama partner harus diisi.');
    }

    const formData = new FormData();
    formData.append('name', newPartner.name.trim());
    formData.append('category', newPartner.category);
    if (file) {
      formData.append('logo', file);
    }

    try {
      const response = await axios.post('/partners', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setPartners((prev) => [...prev, response.data.data]);
      setIsModalOpen(false);
      setNewPartner({ name: '', category: 'strategic' });
      setPreview(null);
      setFile(null);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to create partner');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Hapus partner ini dari daftar?')) return;

    try {
      await axios.delete(`/partners/${id}`);
      setPartners((prev) => prev.filter((partner) => partner.id !== id));
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to delete partner');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">Partner Management</h1>
          <p className="text-slate-500 mt-1">Kelola daftar mitra strategis dan korporasi untuk ditampilkan di website.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
        >
          + Tambah Partner Baru
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 text-slate-600 text-xs uppercase font-semibold">
              <tr>
                <th className="px-6 py-4 border-b">Logo</th>
                <th className="px-6 py-4 border-b">Nama Perusahaan</th>
                <th className="px-6 py-4 border-b">Kategori</th>
                <th className="px-6 py-4 border-b text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {loading ? (
                <tr>
                  <td colSpan="4" className="py-20 text-center text-slate-400 italic">
                    Loading partners...
                  </td>
                </tr>
              ) : partners.length > 0 ? (
                partners.map((partner) => (
                  <tr key={partner.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="h-12 w-24 bg-white border border-slate-100 rounded flex items-center justify-center p-2">
                        <img src={partner.logo_url} alt={partner.name} className="max-h-full max-w-full object-contain" />
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-900">{partner.name}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${
                        partner.category === 'strategic' 
                          ? 'bg-purple-100 text-purple-700 border border-purple-200' 
                          : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                      }`}>
                        {partner.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => handleDelete(partner.id)}
                        className="text-slate-400 hover:text-red-600 transition-colors p-2 text-lg"
                        title="Hapus Partner"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-20 text-center text-slate-400 italic">
                    Belum ada partner yang ditambahkan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Partner Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-bold text-lg text-slate-800">Add New Partner</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors text-2xl font-light">&times;</button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Nama Perusahaan</label>
                <input 
                  type="text" 
                  required
                  placeholder="Contoh: PT. Adhi Karya"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  value={newPartner.name}
                  onChange={(e) => setNewPartner({...newPartner, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Kategori Partner</label>
                <select 
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer font-medium"
                  value={newPartner.category}
                  onChange={(e) => setNewPartner({...newPartner, category: e.target.value})}
                >
                  <option value="strategic">Strategic Partner</option>
                  <option value="corporate">Corporate Partner</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Logo Perusahaan</label>
                <div className="aspect-video bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center relative overflow-hidden group hover:border-blue-400 transition-colors">
                  {preview ? (
                    <img src={preview} alt="Preview" className="w-full h-full object-contain p-4" />
                  ) : (
                    <div className="text-center">
                      <span className="text-3xl">🏢</span>
                      <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-tighter">Click to upload logo</p>
                    </div>
                  )}
                  <input type="file" accept="image/*" required={!preview} className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleImageChange} />
                </div>
              </div>
              <div className="flex gap-3 pt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all text-sm">Batal</button>
                <button type="submit" className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all text-sm shadow-md shadow-blue-100">Simpan Partner</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Partners;