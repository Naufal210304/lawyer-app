import React, { useState } from 'react';

const Team = () => {
  const role = localStorage.getItem('role');

  // Pending Admins
  const [pendingAdmins, setPendingAdmins] = useState([
    { id: 1, username: "rudi_lawyer", email: "rudi@example.com", phone: "08123456789", date: "2023-11-20" },
    { id: 2, username: "sara_admin", email: "sara@example.com", phone: "08987654321", date: "2023-11-21" },
  ]);

  // Active Team
  const [activeTeam, setActiveTeam] = useState([
    { id: 101, username: "ahmad_sujadi", email: "ahmad@lawyer.com", role: "admin", status: "Active" },
    { id: 102, username: "sinta_clara", email: "sinta@lawyer.com", role: "admin", status: "Active" },
    { id: 103, username: "super_root", email: "master@lawyer.com", role: "superadmin", status: "Active" },
  ]);

  // ✅ APPROVE
  const handleApprove = (user) => {
    setActiveTeam((prev) => [
      ...prev,
      { ...user, role: "admin", status: "Active" }
    ]);

    setPendingAdmins((prev) =>
      prev.filter((item) => item.id !== user.id)
    );
  };

  // ❌ REJECT
  const handleReject = (id) => {
    setPendingAdmins((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  // 🗑️ DELETE
  const handleDelete = (id) => {
    setActiveTeam((prev) =>
      prev.filter((item) => item.id !== id)
    );
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
                  <th className="px-4 py-3">Tanggal</th>
                  <th className="px-4 py-3 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {pendingAdmins.length > 0 ? (
                  pendingAdmins.map((user) => (
                    <tr key={user.id} className="border-t">
                      <td className="px-4 py-3 font-bold">{user.username}</td>
                      <td className="px-4 py-3">{user.email}</td>
                      <td className="px-4 py-3">{user.date}</td>
                      <td className="px-4 py-3 text-center space-x-2">
                        <button
                          onClick={() => handleApprove(user)}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-xs"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(user.id)}
                          className="bg-red-100 text-red-600 px-3 py-1 rounded text-xs"
                        >
                          Reject
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
                <tr key={member.id} className="border-t">
                  <td className="px-4 py-3">
                    <div className="font-bold">{member.username}</div>
                    <div className="text-xs text-gray-500">{member.email}</div>
                  </td>
                  <td className="px-4 py-3 text-center">{member.role}</td>
                  <td className="px-4 py-3 text-center text-green-600">
                    {member.status}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {role === 'superadmin' && (
                      <button
                        onClick={() => handleDelete(member.id)}
                        className="text-red-600"
                      >
                        🗑️
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