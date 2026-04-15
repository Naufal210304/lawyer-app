import React, { useState, useEffect } from 'react';
import axios from '../../services/axios';

const Consultation = () => {
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    fetchConsultations();
  }, []);

  const fetchConsultations = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/consultations');
      setConsultations(response.data.data || []);
      setError(null);
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to load consultations';
      setError(message);
      console.error('Consultation fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      setActionLoading(id);
      await axios.put(`/consultations/${id}/approve`, {});
      setConsultations(consultations.filter(c => c.id !== id));
      setSelectedConsultation(null);
      alert('Consultation approved and moved to report');
    } catch (err) {
      alert('Failed to approve: ' + (err.response?.data?.message || err.message));
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (id) => {
    try {
      setActionLoading(id);
      await axios.put(`/consultations/${id}/reject`, {});
      setConsultations(consultations.filter(c => c.id !== id));
      setSelectedConsultation(null);
      alert('Consultation rejected and moved to report');
    } catch (err) {
      alert('Failed to reject: ' + (err.response?.data?.message || err.message));
    } finally {
      setActionLoading(null);
    }
  };

  const closeModal = () => setSelectedConsultation(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl md:text-3xl font-bold text-gray-800">Pending Consultations</h1>
        <p className="text-sm md:text-base text-gray-600">
          Daftar permintaan konsultasi masuk yang perlu segera ditinjau.
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
          <p className="text-gray-600">Loading consultations...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-700 font-semibold">{error}</p>
          <button 
            onClick={fetchConsultations}
            className="mt-2 text-xs bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && consultations.length === 0 && !error && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
          <p className="text-gray-600">No pending consultations</p>
        </div>
      )}

      {/* Table Section */}
      {!loading && consultations.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 text-slate-600 text-xs uppercase font-semibold">
                <tr>
                  <th className="px-6 py-4 border-b">Nama Lengkap</th>
                  <th className="px-6 py-4 border-b">No. Handphone</th>
                  <th className="px-6 py-4 border-b">Email</th>
                  <th className="px-6 py-4 border-b">Bidang Layanan</th>
                  <th className="px-6 py-4 border-b">Deskripsi</th>
                  <th className="px-6 py-4 border-b text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {consultations.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900">{item.full_name}</td>
                    <td className="px-6 py-4 text-slate-600">{item.phone_number}</td>
                    <td className="px-6 py-4 text-slate-600">{item.email}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-[10px] font-bold uppercase border border-blue-100">
                        {item.service_area}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 max-w-[200px] truncate">
                      {item.problem_details}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex gap-2 justify-center">
                        <button 
                          onClick={() => setSelectedConsultation(item)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-xs font-bold transition-all shadow-sm"
                        >
                          Detail
                        </button>
                        <button 
                          onClick={() => handleApprove(item.id)}
                          disabled={actionLoading === item.id}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded text-xs font-bold transition-all shadow-sm disabled:opacity-50"
                        >
                          {actionLoading === item.id ? '...' : 'Approve'}
                        </button>
                        <button 
                          onClick={() => handleReject(item.id)}
                          disabled={actionLoading === item.id}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-xs font-bold transition-all shadow-sm disabled:opacity-50"
                        >
                          {actionLoading === item.id ? '...' : 'Reject'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Detail Deskripsi */}
      {selectedConsultation && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-bold text-lg text-slate-800">Detail Masalah Hukum</h3>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-600 transition-colors text-2xl font-light">&times;</button>
            </div>
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Klien</label>
                  <p className="text-slate-900 font-bold">{selectedConsultation.full_name}</p>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Layanan</label>
                  <p className="text-blue-600 font-bold">{selectedConsultation.service_area}</p>
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Deskripsi Lengkap</label>
                <div className="bg-slate-50 p-4 rounded-xl text-slate-700 leading-relaxed text-sm border border-slate-100 whitespace-pre-wrap max-h-[300px] overflow-y-auto">
                  {selectedConsultation.problem_details}
                </div>
              </div>
            </div>
            <div className="p-6 bg-slate-50 flex gap-3 justify-end">
              <button 
                onClick={closeModal}
                className="px-6 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 rounded-lg text-sm font-bold transition-all"
              >
                Tutup
              </button>
              <button 
                onClick={() => handleReject(selectedConsultation.id)}
                disabled={actionLoading === selectedConsultation.id}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-bold transition-all disabled:opacity-50"
              >
                {actionLoading === selectedConsultation.id ? 'Processing...' : 'Reject'}
              </button>
              <button 
                onClick={() => handleApprove(selectedConsultation.id)}
                disabled={actionLoading === selectedConsultation.id}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-bold transition-all disabled:opacity-50"
              >
                {actionLoading === selectedConsultation.id ? 'Processing...' : 'Approve'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Consultation;