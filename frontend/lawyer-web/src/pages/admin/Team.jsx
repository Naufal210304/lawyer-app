import React, { useState, useEffect } from 'react';
import axios from '../../services/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faTrash, faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';

const Team = () => {
  const role = localStorage.getItem('role');
  const [pendingAdmins, setPendingAdmins] = useState([]);
  const [activeTeam, setActiveTeam] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    image: null,
    linkedin_url: '',
    order_index: 0
  });

  console.log('Team component - Current role:', role); // DEBUG
  console.log('Team component - Active team count:', activeTeam.length); // DEBUG

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch pending users - only for superadmin
      if (role === 'superadmin') {
        try {
          const pendingRes = await axios.get('/auth/pending');
          setPendingAdmins(pendingRes.data.data || []);
        } catch (pendingError) {
          console.error('Error fetching pending users:', pendingError);
          // Don't fail completely if pending users can't be fetched
        }
      }

      // Fetch active users from users table - for both admin and superadmin
      try {
        const activeRes = await axios.get('/users');
        setActiveTeam(activeRes.data.data || []);
        console.log('Active team data:', activeRes.data.data); // DEBUG
      } catch (activeError) {
        console.error('Error fetching active users:', activeError);
        alert('Gagal memuat data active team: ' + (activeError.response?.data?.message || activeError.message));
      }

      // Fetch team members
      try {
        const teamRes = await axios.get('/team');
        setTeamMembers(teamRes.data.data || []);
      } catch (teamError) {
        console.error('Error fetching team members:', teamError);
        // Don't fail completely if team members can't be fetched
      }
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
        console.log('Deleting user:', id); // DEBUG
        const response = await axios.delete(`/users/${id}`);
        console.log('Delete response:', response.data); // DEBUG
        setActiveTeam(prev => prev.filter(u => u.id !== id));
        alert('User berhasil dihapus!');
      } catch (error) {
        console.error('Error deleting user:', error.response?.data || error.message);
        const errorMsg = error.response?.data?.message || error.message;
        if (errorMsg.includes('superadmin')) {
          alert('Hanya superadmin yang bisa menghapus user');
        } else {
          alert('Gagal hapus user: ' + errorMsg);
        }
      }
    }
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle add/edit team member
  const handleSubmitTeamMember = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('position', formData.position);
      formDataToSend.append('linkedin_url', formData.linkedin_url);
      formDataToSend.append('order_index', formData.order_index);

      // Add image file if exists
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      let response;
      if (editingMember) {
        // Update
        response = await axios.put(`/team/${editingMember.id}`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        alert('Team member updated successfully');
      } else {
        // Create
        response = await axios.post('/team', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        alert('Team member added successfully');
      }

      // Reset form and refresh data
      setFormData({
        name: '',
        position: '',
        image: null,
        linkedin_url: '',
        order_index: 0
      });
      setShowAddForm(false);
      setEditingMember(null);
      fetchData();
    } catch (error) {
      console.error('Error saving team member:', error);
      alert('Gagal menyimpan team member: ' + (error.response?.data?.message || error.message));
    }
  };

  // Handle edit team member
  const handleEditTeamMember = (member) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      position: member.position,
      image: null, // Reset file input
      linkedin_url: member.linkedin_url || '',
      order_index: member.order_index || 0
    });
    setShowAddForm(true);
  };

  // Handle delete team member
  const handleDeleteTeamMember = async (id) => {
    if (window.confirm('Yakin hapus team member ini?')) {
      try {
        await axios.delete(`/team/${id}`);
        setTeamMembers(prev => prev.filter(m => m.id !== id));
        alert('Team member deleted successfully');
      } catch (error) {
        console.error('Error deleting team member:', error);
        alert('Gagal hapus team member');
      }
    }
  };

  // Cancel form
  const handleCancelForm = () => {
    setShowAddForm(false);
    setEditingMember(null);
    setFormData({
      name: '',
      position: '',
      image: null,
      linkedin_url: '',
      order_index: 0
    });
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl md:text-3xl font-bold text-gray-800">Team & User Management</h1>
        <p className="text-sm md:text-base text-gray-600">
          {role === 'superadmin' 
            ? 'Kelola hak akses admin dan verifikasi pendaftaran akun baru.'
            : 'Lihat daftar anggota tim aktif dan kelola anggota tim.'
          }
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
                <th className="px-4 py-3">Posisi</th>
                <th className="px-4 py-3 text-center">Role</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {activeTeam.length > 0 ? (
                activeTeam.map((member) => (
                  <tr key={member.id} className="border-t hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <div className="font-bold">{member.username}</div>
                      <div className="text-xs text-gray-500">{member.email}</div>
                    </td>
                    <td className="px-4 py-3">
                      {member.role_id === 1 ? 'Superadmin' : 'Admin'}
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
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-400">
                    {loading ? 'Memuat data...' : 'Tidak ada data active team'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="text-center text-xs text-gray-400 py-3">
            Total {activeTeam.length} user
          </div>
        </div>
      </section>

      {/* ================= TEAM MEMBERS ================= */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Team Members</h2>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faPlus} />
            Add Team Member
          </button>
        </div>

        {/* Add/Edit Form */}
        {showAddForm && (
          <div className="bg-white rounded-xl shadow-sm border p-6 mb-4">
            <h3 className="text-lg font-bold mb-4">
              {editingMember ? 'Edit Team Member' : 'Add New Team Member'}
            </h3>
            <form onSubmit={handleSubmitTeamMember} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Position *
                  </label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image *
                  </label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setFormData(prev => ({
                        ...prev,
                        image: file
                      }));
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {editingMember && editingMember.image_url && (
                    <div className="mt-2">
                      <img
                        src={`http://localhost:3001${editingMember.image_url}`}
                        alt="Current"
                        className="w-20 h-20 object-cover rounded"
                      />
                      <p className="text-xs text-gray-500 mt-1">Current image</p>
                    </div>
                  )}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    name="linkedin_url"
                    value={formData.linkedin_url}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingMember ? 'Update' : 'Add'} Team Member
                </button>
                <button
                  type="button"
                  onClick={handleCancelForm}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-xs uppercase">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Position</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.length > 0 ? (
                teamMembers.map((member) => (
                  <tr key={member.id} className="border-t hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <div className="font-bold">{member.name}</div>
                      {member.image_url && (
                        <img
                          src={`http://localhost:3001${member.image_url}`}
                          alt={member.name}
                          className="w-10 h-10 rounded-full mt-1 object-cover"
                        />
                      )}
                    </td>
                    <td className="px-4 py-3">{member.position}</td>
                    <td className="px-4 py-3 text-center space-x-2">
                      <button
                        onClick={() => handleEditTeamMember(member)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-md transition-colors"
                        title="Edit"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        onClick={() => handleDeleteTeamMember(member.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-md transition-colors"
                        title="Delete"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-6 text-gray-400">
                    Tidak ada team member
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="text-center text-xs text-gray-400 py-3">
            Total {teamMembers.length} team member
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;