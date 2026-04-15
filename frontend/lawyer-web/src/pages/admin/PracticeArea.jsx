import React, { useState, useEffect } from 'react';
import axios from '../../services/axios';

const PracticeArea = () => {
  const [practiceAreas, setPracticeAreas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    detail: '',
    cases_example: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPracticeAreas();
  }, []);

  const fetchPracticeAreas = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/practice-areas');
      setPracticeAreas(response.data.data || []);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to load practice areas');
    } finally {
      setLoading(false);
    }
  };

  // Auto-generate slug dari judul
  const handleTitleChange = (e) => {
    const title = e.target.value;
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    setFormData({ ...formData, title, slug });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.slug.trim() || !formData.description.trim()) {
      return alert('Judul, slug, dan deskripsi wajib diisi.');
    }

    try {
      const response = await axios.post('/practice-areas', formData);
      setPracticeAreas([...practiceAreas, response.data.data]);
      setIsModalOpen(false);
      setFormData({ title: '', slug: '', description: '', detail: '', cases_example: '' });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to create practice area');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Hapus bidang layanan ini dari website?')) return;

    try {
      await axios.delete(`/practice-areas/${id}`);
      setPracticeAreas(practiceAreas.filter(area => area.id !== id));
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to delete practice area');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">Practice Area Management</h1>
          <p className="text-slate-500 mt-1">Kelola bidang layanan hukum dan detail deskripsi untuk klien.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
        >
          + Tambah Layanan Baru
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 text-slate-600 text-xs uppercase font-semibold">
              <tr>
                <th className="px-6 py-4 border-b">Bidang Layanan</th>
                <th className="px-6 py-4 border-b">Slug</th>
                <th className="px-6 py-4 border-b">Deskripsi Singkat</th>
                <th className="px-6 py-4 border-b text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {loading ? (
                <tr>
                  <td colSpan="4" className="py-20 text-center text-slate-400 italic">
                    Loading practice areas...
                  </td>
                </tr>
              ) : practiceAreas.length > 0 ? (
                practiceAreas.map((area) => (
                  <tr key={area.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900">{area.title}</td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-400">/{area.slug}</td>
                    <td className="px-6 py-4 text-slate-500 max-w-xs truncate">{area.description}</td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => handleDelete(area.id)}
                        className="text-slate-400 hover:text-red-600 transition-colors p-2"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-20 text-center text-slate-400 italic">
                    Belum ada bidang layanan yang ditambahkan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-bold text-lg text-slate-800">Add New Practice Area</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors text-2xl font-light">&times;</button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Judul Layanan</label>
                  <input 
                    type="text" required
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    value={formData.title}
                    onChange={handleTitleChange}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Slug URL</label>
                  <input 
                    type="text" readOnly
                    className="w-full px-4 py-2 border border-slate-100 rounded-lg bg-slate-50 text-slate-400 outline-none font-mono text-xs"
                    value={formData.slug}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Deskripsi Singkat (Card Home)</label>
                <textarea 
                  required rows="2"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Detail Penjelasan (Halaman Detail)</label>
                <textarea 
                  required rows="4"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  value={formData.detail}
                  onChange={(e) => setFormData({...formData, detail: e.target.value})}
                ></textarea>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Contoh Kasus</label>
                <textarea 
                  required rows="2"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  value={formData.cases_example}
                  onChange={(e) => setFormData({...formData, cases_example: e.target.value})}
                ></textarea>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all text-sm">Batal</button>
                <button type="submit" className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all text-sm">Simpan Layanan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PracticeArea;