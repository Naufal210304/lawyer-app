import React, { useState, useEffect, useMemo } from 'react';
import axios from '../../services/axios';

const Report = () => {
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState('latest');
  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceAreaFilter, setServiceAreaFilter] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');
  const [serviceAreas, setServiceAreas] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/reports');
      const items = response.data.data || [];
      setReports(items);
      setServiceAreas(Array.from(new Set(items.map((item) => item.service_area))).sort());
      setError(null);
    } catch (err) {
      setError('Failed to load reports');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (value) => {
    if (!value) return '-';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '-';
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const toDateInputValue = (value) => {
    if (!value) return '';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '';
    return date.toISOString().split('T')[0];
  };

  const filteredReports = useMemo(() => {
    return [...reports]
      .filter((item) => {
        if (statusFilter !== 'all' && item.status !== statusFilter) {
          return false;
        }
        if (serviceAreaFilter !== 'all' && item.service_area !== serviceAreaFilter) {
          return false;
        }
        if (selectedDate) {
          const itemDate = toDateInputValue(item.created_at || item.updated_at);
          return itemDate === selectedDate;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortOption === 'a-z') {
          return a.full_name.localeCompare(b.full_name);
        }
        if (sortOption === 'z-a') {
          return b.full_name.localeCompare(a.full_name);
        }

        const dateA = new Date(a.created_at || a.updated_at).getTime();
        const dateB = new Date(b.created_at || b.updated_at).getTime();
        if (sortOption === 'oldest') {
          return dateA - dateB;
        }
        return dateB - dateA;
      });
  }, [reports, statusFilter, serviceAreaFilter, selectedDate, sortOption]);

  const closeModal = () => setSelectedConsultation(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl md:text-3xl font-bold text-gray-800">Consultation Report</h1>
        <p className="text-sm md:text-base text-gray-600">
          Riwayat seluruh konsultasi yang telah diproses oleh tim admin.
        </p>
      </div>

      {/* Controls */}
      <div className="grid gap-3 md:grid-cols-4 mb-4">
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-[1px]">Sort</label>
          <select
            className="w-full mt-2 px-3 py-2 border border-slate-200 rounded-lg bg-white text-sm"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="latest">Terbaru berdasarkan tanggal</option>
            <option value="oldest">Terlama berdasarkan tanggal</option>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-[1px]">Status</label>
          <select
            className="w-full mt-2 px-3 py-2 border border-slate-200 rounded-lg bg-white text-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Semua Status</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-[1px]">Bidang Hukum</label>
          <select
            className="w-full mt-2 px-3 py-2 border border-slate-200 rounded-lg bg-white text-sm"
            value={serviceAreaFilter}
            onChange={(e) => setServiceAreaFilter(e.target.value)}
          >
            <option value="all">Semua Bidang</option>
            {serviceAreas.map((area) => (
              <option key={area} value={area}>{area}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-[1px]">Pilih Tanggal</label>
          <input
            type="date"
            className="w-full mt-2 px-3 py-2 border border-slate-200 rounded-lg bg-white text-sm"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
      </div>

      {selectedDate && (
        <div className="text-slate-500 text-sm mb-4">
          Menampilkan laporan untuk tanggal: <strong>{selectedDate}</strong>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
          <p className="text-gray-600">Loading reports...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-700 font-semibold">{error}</p>
          <button 
            onClick={fetchReports}
            className="mt-2 text-xs bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredReports.length === 0 && !error && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
          <p className="text-gray-600">No reports match the selected filters.</p>
        </div>
      )}

      {/* Table Section */}
      {!loading && filteredReports.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-50 bg-slate-50/30 flex flex-col md:flex-row md:justify-between md:items-center gap-3">
            <div>
              <h2 className="font-bold text-slate-700">History Log</h2>
              <p className="text-slate-500 text-sm">Menampilkan {filteredReports.length} laporan.</p>
            </div>
            <button className="text-xs bg-emerald-600 text-white px-3 py-1.5 rounded font-bold hover:bg-emerald-700 transition-colors">
              📥 Export Excel
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 text-slate-600 text-xs uppercase font-semibold">
                <tr>
                  <th className="px-6 py-4 border-b">Nama Lengkap</th>
                  <th className="px-6 py-4 border-b">No. Handphone</th>
                  <th className="px-6 py-4 border-b">Email</th>
                  <th className="px-6 py-4 border-b">Bidang</th>
                  <th className="px-6 py-4 border-b">Status</th>
                  <th className="px-6 py-4 border-b">Tanggal Proses</th>
                  <th className="px-6 py-4 border-b text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredReports.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900">{item.full_name}</td>
                    <td className="px-6 py-4 text-slate-600">{item.phone_number}</td>
                    <td className="px-6 py-4 text-slate-600">{item.email}</td>
                    <td className="px-6 py-4 text-[11px] font-medium text-slate-500">{item.service_area}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                        item.status === 'Approved'
                          ? 'bg-green-100 text-green-700 border border-green-200'
                          : 'bg-red-100 text-red-700 border border-red-200'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-xs">{formatDate(item.created_at || item.updated_at)}</td>
                    <td className="px-6 py-4 text-center space-y-2 sm:space-y-0 sm:flex sm:justify-center sm:gap-2">
                      <button
                        onClick={() => setSelectedConsultation(item)}
                        className="text-blue-600 hover:underline font-bold text-xs"
                      >
                        Detail
                      </button>
                      <button
                        onClick={() => handleDeleteReport(item.id)}
                        className="text-red-600 hover:underline font-bold text-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Detail (Sama dengan Pending agar konsisten) */}
      {selectedConsultation && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-bold text-lg text-slate-800">Detail Konsultasi</h3>
              <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                selectedConsultation.status === 'Approved' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
              }`}>
                {selectedConsultation.status}
              </div>
            </div>
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Nama Klien</label>
                  <p className="text-slate-900 font-bold">{selectedConsultation.full_name}</p>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Kontak</label>
                  <p className="text-slate-600">{selectedConsultation.phone_number}</p>
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-2">Pesan / Deskripsi Masalah</label>
                <div className="bg-slate-50 p-4 rounded-xl text-slate-700 leading-relaxed text-sm border border-slate-100 whitespace-pre-wrap">
                  {selectedConsultation.problem_details}
                </div>
              </div>
            </div>
            <div className="p-6 bg-slate-50 flex justify-end">
              <button 
                onClick={closeModal}
                className="px-6 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 rounded-lg text-sm font-bold transition-all"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Report;