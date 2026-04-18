import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import axios from '../../services/axios';

const Dashboard = () => {

  const role = localStorage.getItem('role');
  const username = localStorage.getItem('username') || 'Admin';

  // State untuk stats
  const [stats, setStats] = useState({
    totalBlogs: 0,
    pendingConsultations: 0,
    totalTeam: 0,
    pendingUsers: 0,
    loading: true,
    error: null
  });

  // Fetch stats saat component mount
  useEffect(() => {
    const fetchStats = async () => {
      const endpoints = [
        { key: 'totalBlogs', url: '/blogs/stats/count' },
        { key: 'pendingConsultations', url: '/consultations/stats/count' },
        { key: 'totalTeam', url: '/team/stats/count' },
        { key: 'pendingUsers', url: '/auth/pending/count' }
      ];

      try {
        const results = await Promise.allSettled(
          endpoints.map((endpoint) => axios.get(endpoint.url))
        );

        const newStats = {
          totalBlogs: 0,
          pendingConsultations: 0,
          totalTeam: 0,
          pendingUsers: 0,
          loading: false,
          error: null
        };

        results.forEach((result, index) => {
          if (result.status === 'fulfilled') {
            const count = result.value.data?.data?.count;
            newStats[endpoints[index].key] = typeof count === 'number' ? count : 0;
          } else {
            console.warn(`Failed loading ${endpoints[index].key}:`, result.reason);
          }
        });

        setStats(newStats);
      } catch (error) {
        console.error('Error fetching stats:', error);
        setStats((prev) => ({
          ...prev,
          loading: false,
          error: 'Gagal memuat data'
        }));
      }
    };

    fetchStats();
  }, []);

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

  const recentActivities = [
    { id: 1, name: "Budi Santoso", status: "Approved", time: "5 menit yang lalu" },
    { id: 2, name: "Siti Aminah", status: "Pending", time: "1 jam yang lalu" },
    { id: 3, name: "Andi Wijaya", status: "Approved", time: "3 jam yang lalu" },
    { id: 4, name: "Rina Kartika", status: "Pending", time: "5 jam yang lalu" },
    { id: 5, name: "Dedi Kurniawan", status: "Approved", time: "Yesterday" },
  ];

  const statCards = [
    { title: "Total Blog", value: stats.totalBlogs },
    { title: "Konsultasi Pending", value: stats.pendingConsultations },
    { title: "Total Team", value: stats.totalTeam },
    { title: "Akun Pending", value: stats.pendingUsers }
  ];

  return (
    <div>

      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-xl md:text-3xl font-bold text-gray-800">
          Dashboard Overview
        </h1>
        <p className="text-sm md:text-base text-gray-600">
          Selamat datang kembali,
          <span className="font-semibold text-blue-600"> {username}</span> ({role})
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">

        {statCards.map((card, i) => (
          <div key={i} className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-slate-200 hover:border-blue-300 transition-colors">
            <h3 className="text-gray-500 text-sm">{card.title}</h3>
            <p className="text-xl md:text-2xl font-bold text-slate-900">{card.value}</p>
          </div>
        ))}

      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">

        {/* Chart */}
        <div className="lg:col-span-2 bg-white p-4 md:p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-base md:text-lg font-bold mb-4 md:mb-6">
            Statistik Konsultasi Disetujui (1 Tahun)
          </h2>

          <div className="h-64 md:h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total">
                  {chartData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={index === 11 ? '#2563eb' : '#e2e8f0'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activity */}
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-base md:text-lg font-bold mb-4 md:mb-6">
            Aktivitas Konsultasi
          </h2>

          {recentActivities.map((item) => (
            <div key={item.id} className="mb-3 md:mb-4">
              <p className="font-medium text-sm md:text-base text-slate-900">{item.name}</p>
              <p className="text-xs md:text-sm text-gray-500">
                <span className={item.status === 'Approved' ? 'text-blue-600' : 'text-orange-500'}>{item.status}</span> • {item.time}
              </p>
            </div>
          ))}

          <button className="w-full mt-4 md:mt-6 py-2 text-sm text-blue-600 font-semibold border border-blue-100 rounded-lg hover:bg-blue-50 transition-colors">
            Lihat Semua
          </button>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;