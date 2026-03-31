import React from 'react';
import Sidebar from '../../components/layout/sidebar';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const Dashboard = () => {
  const role = localStorage.getItem('role');
  const username = localStorage.getItem('username') || 'Admin';

  // Data Mock untuk Diagram Batang (Konsultasi Disetujui per Bulan)
  const chartData = [
    { name: 'Jan', total: 12 },
    { name: 'Feb', total: 19 },
    { name: 'Mar', total: 15 },
    { name: 'Apr', total: 22 },
    { name: 'Mei', total: 30 },
    { name: 'Jun', total: 25 },
    { name: 'Jul', total: 35 },
    { name: 'Agu', total: 28 },
    { name: 'Sep', total: 32 },
    { name: 'Okt', total: 40 },
    { name: 'Nov', total: 38 },
    { name: 'Des', total: 45 },
  ];

  // Data Mock untuk Aktivitas Konsultasi Terbaru
  const recentActivities = [
    { id: 1, name: "Budi Santoso", status: "Approved", time: "5 menit yang lalu" },
    { id: 2, name: "Siti Aminah", status: "Pending", time: "1 jam yang lalu" },
    { id: 3, name: "Andi Wijaya", status: "Approved", time: "3 jam yang lalu" },
    { id: 4, name: "Rina Kartika", status: "Pending", time: "5 jam yang lalu" },
    { id: 5, name: "Dedi Kurniawan", status: "Approved", time: "Yesterday" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
          <p className="text-gray-600">Selamat datang kembali, <span className="font-semibold text-[#C5A02E]">{username}</span> ({role})</p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Blog */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <h3 className="text-gray-500 text-sm font-medium">Total Blog</h3>
            <p className="text-2xl font-bold text-gray-800">24</p>
          </div>

          {/* Konsultasi Pending */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
            </div>
            <h3 className="text-gray-500 text-sm font-medium">Konsultasi Pending</h3>
            <p className="text-2xl font-bold text-gray-800">8</p>
          </div>

          {/* Total Team */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857" />
                </svg>
              </div>
            </div>
            <h3 className="text-gray-500 text-sm font-medium">Total Team</h3>
            <p className="text-2xl font-bold text-gray-800">12</p>
          </div>

          {/* Akun Pending */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-red-50 rounded-lg text-red-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-gray-500 text-sm font-medium">Akun Pending</h3>
            <p className="text-2xl font-bold text-gray-800">3</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart Section */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold text-gray-800 mb-6">Statistik Konsultasi Disetujui (1 Tahun)</h2>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                  <Tooltip 
                    cursor={{fill: '#f9fafb'}}
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                  />
                  <Bar dataKey="total" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 11 ? '#C5A02E' : '#e5e7eb'} className="hover:fill-[#C5A02E] transition-colors duration-300" />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Activity Table */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold text-gray-800 mb-6">Aktivitas Konsultasi</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-400 text-xs uppercase tracking-wider border-b border-gray-100">
                    <th className="pb-3 font-medium">Nama Klien</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Waktu</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recentActivities.map((activity) => (
                    <tr key={activity.id} className="text-sm">
                      <td className="py-4 font-medium text-gray-700">{activity.name}</td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                          activity.status === 'Approved' 
                            ? 'bg-green-50 text-green-600' 
                            : 'bg-orange-50 text-orange-600'
                        }`}>
                          {activity.status}
                        </span>
                      </td>
                      <td className="py-4 text-gray-400 text-xs">{activity.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className="w-full mt-6 py-2 text-sm text-[#C5A02E] font-semibold hover:bg-gray-50 rounded-lg transition-colors border border-gray-100">
              Lihat Semua Konsultasi
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;