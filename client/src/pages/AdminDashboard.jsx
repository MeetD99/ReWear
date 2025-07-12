import React, { useEffect, useState } from 'react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resUsers = await fetch('/api/admin/users');
        const resItems = await fetch('/api/admin/items');

        const usersData = await resUsers.json();
        const itemsData = await resItems.json();

        setUsers(usersData);
        setItems(itemsData);
      } catch (error) {
        console.error('Failed to fetch admin data:', error);
      }
    };

    fetchData();
  }, []);

  // === Handlers ===
  const deleteUser = async (userId) => {
    await fetch(`/api/admin/user/${userId}`, { method: 'DELETE' });
    setUsers(prev => prev.filter(user => user._id !== userId));
  };

  const approveItem = async (itemId) => {
    await fetch(`/api/admin/item/${itemId}/approve`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isApproved: true }),
    });
    setItems(prev =>
      prev.map(item =>
        item._id === itemId ? { ...item, isApproved: true } : item
      )
    );
  };

  const rejectItem = async (itemId) => {
    await fetch(`/api/admin/item/${itemId}/reject`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isApproved: false }),
    });
    setItems(prev =>
      prev.map(item =>
        item._id === itemId ? { ...item, isApproved: false } : item
      )
    );
  };

  const deleteItem = async (itemId) => {
    await fetch(`/api/admin/item/${itemId}`, { method: 'DELETE' });
    setItems(prev => prev.filter(item => item._id !== itemId));
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('users')}
          className={`px-6 py-2 rounded-lg font-semibold border ${
            activeTab === 'users'
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-black'
          }`}
        >
          Manage Users
        </button>
        <button
          onClick={() => setActiveTab('items')}
          className={`px-6 py-2 rounded-lg font-semibold border ${
            activeTab === 'items'
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-black'
          }`}
        >
          Manage Listings
        </button>
      </div>

      {/* === User Management === */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-2">All Users</h2>
          {users.length === 0 ? (
            <p className="text-gray-500">No users found.</p>
          ) : (
            users.map(user => (
              <div
                key={user._id}
                className="flex items-center bg-white p-4 rounded-xl shadow-sm"
              >
                <div className="w-14 h-14 bg-gray-300 rounded-full mr-4" />
                <div className="flex-1">
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  <p className="text-sm text-gray-500">Points: {user.points}</p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => alert('Viewing user details...')}
                    className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* === Item Management === */}
      {activeTab === 'items' && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-2">All Listings</h2>
          {items.length === 0 ? (
            <p className="text-gray-500">No items listed yet.</p>
          ) : (
            items.map(item => (
              <div
                key={item._id}
                className="flex items-center bg-white p-4 rounded-xl shadow-sm"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-xl mr-4 overflow-hidden">
                  <img
                    src={item.images?.[0] || '/placeholder.jpg'}
                    alt={item.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-gray-500">
                    {item.category} • {item.size}
                  </p>
                  <p className="text-sm">
                    Status:{' '}
                    <span
                      className={`font-medium ${
                        item.isApproved ? 'text-green-600' : 'text-yellow-500'
                      }`}
                    >
                      {item.isApproved ? 'Approved' : 'Pending'}
                    </span>
                  </p>
                </div>
                <div className="space-y-1 text-right">
                  {!item.isApproved && (
                    <button
                      onClick={() => approveItem(item._id)}
                      className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Approve
                    </button>
                  )}
                  {item.isApproved && (
                    <button
                      onClick={() => rejectItem(item._id)}
                      className="px-4 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Reject
                    </button>
                  )}
                  <button
                    onClick={() => deleteItem(item._id)}
                    className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
