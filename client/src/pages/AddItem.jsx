import React, { useState } from 'react';

const AddItem = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    type: '',
    size: '',
    condition: '',
    tags: '',
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      images: Array.from(e.target.files),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = new FormData();
    for (const key in formData) {
      if (key === 'images') {
        formData.images.forEach((file) => body.append('images', file));
      } else {
        body.append(key, formData[key]);
      }
    }

    try {
      const res = await fetch('/api/items', {
        method: 'POST',
        body,
      });

      if (res.ok) {
        alert('Item listed successfully!');
        setFormData({
          title: '',
          description: '',
          category: '',
          type: '',
          size: '',
          condition: '',
          tags: '',
          images: [],
        });
      } else {
        alert('Failed to list item.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">List a New Item</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded-xl p-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-xl p-2"
            rows="4"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Category</label>
            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded-xl p-2"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Type</label>
            <input
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border rounded-xl p-2"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Size</label>
            <input
              name="size"
              value={formData.size}
              onChange={handleChange}
              className="w-full border rounded-xl p-2"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Condition</label>
            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              className="w-full border rounded-xl p-2"
              required
            >
              <option value="">Select</option>
              <option value="New">New</option>
              <option value="Like New">Like New</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Used">Used</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">Tags (comma-separated)</label>
          <input
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full border rounded-xl p-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Upload Images</label>
          <input
            type="file"
            name="images"
            multiple
            onChange={handleFileChange}
            className="w-full border rounded-xl p-2"
            accept="image/*"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 transition"
        >
          Submit Item
        </button>
      </form>
    </div>
  );
};

export default AddItem;
