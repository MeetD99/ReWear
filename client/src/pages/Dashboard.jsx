import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [uploadedItems, setUploadedItems] = useState([]);
  const [swaps, setSwaps] = useState({ ongoing: [], completed: [] });

  useEffect(() => {
    // Fetch user profile data
    const fetchData = async () => {
      try {
        const userRes = await fetch('/api/user/profile');
        const itemRes = await fetch('/api/user/items');
        const swapRes = await fetch('/api/user/swaps');

        const user = await userRes.json();
        const items = await itemRes.json();
        const swapsData = await swapRes.json();

        setUserData(user);
        setUploadedItems(items);
        setSwaps(swapsData);
      } catch (err) {
        console.error('Dashboard loading error:', err);
      }
    };

    fetchData();
  }, []);

  if (!userData) {
    return <div className="text-center p-10 text-gray-500">Loading dashboard...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Your Dashboard</h1>

      {/* Profile Section */}
      <div className="bg-white rounded-2xl shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-2">Profile Details</h2>
        <p><span className="font-medium">Name:</span> {userData.name}</p>
        <p><span className="font-medium">Email:</span> {userData.email}</p>
        <p><span className="font-medium">Points Balance:</span> {userData.points} pts</p>
      </div>

      {/* Uploaded Items */}
      <div className="bg-white rounded-2xl shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Uploaded Items</h2>
        {uploadedItems.length === 0 ? (
          <p className="text-gray-500">No items uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {uploadedItems.map(item => (
              <div
                key={item._id}
                className="bg-gray-50 border rounded-xl p-4 hover:shadow-md transition"
              >
                <img
                  src={item.images?.[0] || '/placeholder.jpg'}
                  alt={item.title}
                  className="w-full h-40 object-cover rounded-xl mb-2"
                />
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.status}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Swaps Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ongoing Swaps */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Ongoing Swaps</h2>
          {swaps.ongoing.length === 0 ? (
            <p className="text-gray-500">No ongoing swaps.</p>
          ) : (
            <ul className="space-y-3">
              {swaps.ongoing.map(swap => (
                <li key={swap._id} className="border p-3 rounded-xl">
                  <p><span className="font-medium">Item:</span> {swap.itemTitle}</p>
                  <p><span className="font-medium">With:</span> {swap.partnerName}</p>
                  <p className="text-sm text-gray-500">Status: {swap.status}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Completed Swaps */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Completed Swaps</h2>
          {swaps.completed.length === 0 ? (
            <p className="text-gray-500">No completed swaps yet.</p>
          ) : (
            <ul className="space-y-3">
              {swaps.completed.map(swap => (
                <li key={swap._id} className="border p-3 rounded-xl">
                  <p><span className="font-medium">Item:</span> {swap.itemTitle}</p>
                  <p><span className="font-medium">With:</span> {swap.partnerName}</p>
                  <p className="text-sm text-green-600">Completed</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
