import React, { useEffect, useState } from 'react';

const Listing = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch('https://--------/api/items'); // Update your endpoint
        const data = await res.json();

        // ✅ Only include approved items
        const approvedItems = data.filter(item => item.isApproved === true);
        setItems(approvedItems);

        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch items:', err);
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Browse Items</h2>

      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : items.length === 0 ? (
        <div className="text-center text-gray-500">No approved items available yet.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-4"
            >
              <img
                src={item.images?.[0] || '/placeholder.jpg'}
                alt={item.title}
                className="w-full h-48 object-cover rounded-xl mb-3"
              />
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.category} • {item.size}</p>
              <p className="text-sm text-gray-500 truncate">{item.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className={`text-sm font-medium ${item.available ? 'text-green-600' : 'text-red-500'}`}>
                  {item.available ? 'Available' : 'Not Available'}
                </span>
                <a
                  href={`/item/${item._id}`}
                  className="text-sm bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
                >
                  View
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Listing;
