import React, { useState } from 'react';

const Report = () => {
  const [selectedConsultation, setSelectedConsultation] = useState(null);

  // Data Dummy untuk Riwayat (History) Konsultasi
  const [reports] = useState([
    {
      id: 1,
      full_name: "Antoni Wijaya",
      phone_number: "081222333444",
      email: "antoni@example.com",
      service_area: "Hukum Pidana",
      problem_details: "Klien meminta pendampingan terkait kasus dugaan pencemaran nama baik di media sosial yang melibatkan pasal ITE.",
      status: "Approved",
      handled_at: "2023-11-20 10:00"
    },
    {
      id: 2,
      full_name: "Siska Putri",
      phone_number: "085566677788",
      email: "siska@example.com",
      service_area: "Hukum Keluarga",
      problem_details: "Konsultasi mengenai hak asuh anak setelah perceraian yang terjadi 3 tahun lalu karena pihak mantan suami menghalangi pertemuan.",
      status: "Rejected",
      handled_at: "2023-11-21 14:30"
    }
  ]);

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

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-50 bg-slate-50/30 flex justify-between items-center">
          <h2 className="font-bold text-slate-700">History Log</h2>
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
              {reports.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900">{item.full_name}</td>
                  <td className="px-6 py-4 text-slate-600">{item.phone_number}</td>
                  <td className="px-6 py-4 text-slate-600">{item.email}</td>
                  <td className="px-6 py-4">
                    <span className="text-[11px] font-medium text-slate-500">{item.service_area}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                      item.status === 'Approved' 
                      ? 'bg-green-100 text-green-700 border border-green-200' 
                      : 'bg-red-100 text-red-700 border border-red-200'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-xs">{item.handled_at}</td>
                  <td className="px-6 py-4 text-center">
                    <button 
                      onClick={() => setSelectedConsultation(item)}
                      className="text-blue-600 hover:underline font-bold text-xs"
                    >
                      Detail Deskripsi
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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