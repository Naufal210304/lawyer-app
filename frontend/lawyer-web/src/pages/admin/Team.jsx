import React, { useState, useEffect } from 'react';
import axios from '../../services/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faTrash } from '@fortawesome/free-solid-svg-icons';

const Team = () => {
  const role = localStorage.getItem('role');
  const [pendingAdmins, setPendingAdmins] = useState([]);
  const [activeTeam, setActiveTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch pending users
      const pendingRes = await axios.get('/auth/pending');
      setPendingAdmins(pendingRes.data.data || []);

      // Fetch active users from users table
      const activeRes = await axios.get('/users');
      setActiveTeam(activeRes.data.data || []);
    } catch (error) {
      console.error('Error fetching team data:', error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ APPROVE
  const handleApprove = async (user) => {
    try {
      await axios.put(`/auth/pending/${user.id}/approve`);
      // Remove from pending
      setPendingAdmins(prev => prev.filter(u => u.id !== user.id));
      // Refresh active team
      fetchData();
    } catch (error) {
      console.error('Error approving user:', error);
      alert('Gagal approve user');
    }
  };

  // ❌ REJECT
  const handleReject = async (id) => {
    if (window.confirm('Yakin reject user ini?')) {
      try {
        await axios.delete(`/auth/pending/${id}/reject`);
        setPendingAdmins(prev => prev.filter(u => u.id !== id));
      } catch (error) {
        console.error('Error rejecting user:', error);
        alert('Gagal reject user');
      }
    }
  };

  // 🗑️ DELETE
  const handleDelete = async (id) => {
    if (window.confirm('Yakin hapus user ini?')) {
      try {
        await axios.delete(`/users/${id}`);
        setActiveTeam(prev => prev.filter(u => u.id !== id));
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Gagal hapus user');
      }
    }
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl md:text-3xl font-bold text-gray-800">Team & User Management</h1>
        <p className="text-sm md:text-base text-gray-600">
          Kelola hak akses admin dan verifikasi pendaftaran akun baru.
        </p>
      </div>

      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      )}

      {/* ================= PENDING ================= */}
      {role === 'superadmin' ? (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-8 bg-orange-500 rounded-full"></div>
            <h2 className="text-lg font-bold text-slate-800">Pending Approval</h2>
            <span className="bg-orange-100 text-orange-600 text-xs font-bold px-2.5 py-0.5 rounded-full">
              {pendingAdmins.length} Perlu Review
            </span>
          </div>

          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-xs uppercase">
                <tr>
                  <th className="px-4 py-3">Username</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Tanggal</th>
                  <th className="px-4 py-3 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {pendingAdmins.length > 0 ? (
                  pendingAdmins.map((user) => (
                    <tr key={user.id} className="border-t hover:bg-slate-50">
                      <td className="px-4 py-3 font-bold">{user.username}</td>
                      <td className="px-4 py-3">{user.email}</td>
                      <td className="px-4 py-3 text-sm">{user.phone_number || '-'}</td>
                      <td className="px-4 py-3 text-sm">{new Date(user.created_at).toLocaleDateString('id-ID')}</td>
                      <td className="px-4 py-3 text-center space-x-2">
                        <button
                          onClick={() => handleApprove(user)}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors"
                          title="Approve"
                        >
                          <FontAwesomeIcon icon={faCheckCircle} /> Approve
                        </button>
                        <button
                          onClick={() => handleReject(user.id)}
                          className="bg-red-100 text-red-600 px-3 py-1 rounded text-xs hover:bg-red-200 transition-colors"
                          title="Reject"
                        >
                          <FontAwesomeIcon icon={faTimesCircle} /> Reject
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-6 text-gray-400">
                      Tidak ada data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      ) : (
        <div className="bg-blue-50 p-4 rounded">
          Login sebagai <b>Superadmin</b> untuk approve user
        </div>
      )}

      {/* ================= ACTIVE TEAM ================= */}
      <section>
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-bold">Active Team</h2>
        </div>

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-xs uppercase">
              <tr>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3 text-center">Role</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {activeTeam.map((member) => (
                <tr key={member.id} className="border-t hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="font-bold">{member.username}</div>
                    <div className="text-xs text-gray-500">{member.email}</div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-xs font-bold ${member.role_id === 1 ? 'text-purple-600' : 'text-blue-600'}`}>
                      {member.role_id === 1 ? 'Superadmin' : 'Admin'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center text-green-600 font-semibold">
                    Active
                  </td>
                  <td className="px-4 py-3 text-right">
                    {role === 'superadmin' && (
                      <button
                        onClick={() => handleDelete(member.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-md transition-colors"
                        title="Hapus User"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-center text-xs text-gray-400 py-3">
            Total {activeTeam.length} user
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;