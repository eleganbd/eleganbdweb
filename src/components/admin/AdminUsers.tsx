import React, { useState } from 'react';
import { ShieldCheck, Plus, Trash2, UserCheck, Mail, Phone, Lock, Key } from 'lucide-react';
import { AdminUser } from '../../types';

interface AdminUsersProps {
  adminUsers: AdminUser[];
  onAddAdmin: (user: AdminUser) => void;
  onDeleteAdmin: (id: string) => void;
}

export const AdminUsers: React.FC<AdminUsersProps> = ({
  adminUsers,
  onAddAdmin,
  onDeleteAdmin
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<AdminUser['role']>('Order Manager');

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    const newUser: AdminUser = {
      id: `adm-${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      role,
      status: 'active',
      lastLogin: 'Never',
      phone: phone.trim()
    };

    onAddAdmin(newUser);
    setIsAddModalOpen(false);
    setName('');
    setEmail('');
    setPhone('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-sans font-bold text-xl sm:text-2xl text-gray-900">
            Admin Team & Access Roles
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            ম্যানেজমেন্ট ইউজার, রোল ও পারমিশন কন্ট্রোল (Total: {adminUsers.length})
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 bg-[#725b38] hover:bg-[#856b43] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Admin User</span>
        </button>
      </div>

      {/* Admin Users Table */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-50 text-gray-500 uppercase font-semibold text-[10px] tracking-wider border-b border-gray-200">
            <tr>
              <th className="py-3.5 px-4">User & Name</th>
              <th className="py-3.5 px-4">Email Address</th>
              <th className="py-3.5 px-4">Role & Access Level</th>
              <th className="py-3.5 px-4">Phone</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {adminUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50/70">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-black text-white font-bold flex items-center justify-center text-xs">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-sm">{user.name}</div>
                      <div className="text-[10px] text-gray-400">Last: {user.lastLogin}</div>
                    </div>
                  </div>
                </td>

                <td className="py-4 px-4 font-mono text-gray-800">
                  {user.email}
                </td>

                <td className="py-4 px-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    user.role === 'Super Admin'
                      ? 'bg-purple-100 text-purple-800 border border-purple-200'
                      : user.role === 'Order Manager'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {user.role}
                  </span>
                </td>

                <td className="py-4 px-4 text-gray-600 font-mono">
                  {user.phone || '-'}
                </td>

                <td className="py-4 px-4">
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold rounded text-[10px]">
                    ● Active
                  </span>
                </td>

                <td className="py-4 px-4 text-right">
                  {user.email !== 'eleganbd@gmail.com' ? (
                    <button
                      onClick={() => {
                        if (confirm(`Remove admin account for ${user.name}?`)) {
                          onDeleteAdmin(user.id);
                        }
                      }}
                      className="text-gray-400 hover:text-red-600 p-1.5 rounded hover:bg-red-50 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  ) : (
                    <span className="text-[10px] font-bold text-gray-400">Primary Root</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Admin Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 text-xs" onClick={e => e.stopPropagation()}>
            <h3 className="font-bold text-base text-gray-900 mb-4 pb-2 border-b border-gray-100">
              Add New Admin User
            </h3>
            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Shakil Ahmed"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="e.g. staff@eleganbd.com"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="e.g. 01711000000"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">Assign Role & Permission *</label>
                <select
                  value={role}
                  onChange={e => setRole(e.target.value as any)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl cursor-pointer"
                >
                  <option value="Order Manager">Order Manager (অর্ডার ও শিপিং)</option>
                  <option value="Inventory Manager">Inventory Manager (ইনভেন্টরি ও স্টক)</option>
                  <option value="Finance Manager">Finance Manager (হিসেব ও খরচ)</option>
                  <option value="Super Admin">Super Admin (সম্পূর্ণ অ্যাক্সেস)</option>
                </select>
              </div>

              <div className="pt-3 border-t border-gray-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#725b38] text-white rounded-xl font-bold"
                >
                  Create Admin User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
