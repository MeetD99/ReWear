import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import Shirt from '../components/three/Shirt';
import axios from 'axios';

const ItemDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [show3D, setShow3D] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios.get(`/api/items/${id}`)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load item.');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }
  if (!product) {
    return null;
  }

  // Use the first image for main display and 3D texture
  const mainImage = product.images && product.images.length > 0 ? product.images[0] : '';
  const textureUrl = product.texture && product.texture.length > 0 ? product.texture : '';

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* Page Title */}
        <h1 className="text-2xl font-bold mb-6 text-center">{product.title}</h1>
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-lg shadow p-6 mb-10">
          {/* Product Image */}
          <div>
            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
              {mainImage ? (
                <img
                  src={mainImage}
                  alt={product.title}
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-gray-400">No image</span>
              )}
            </div>
            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 mt-2 justify-center">
                {product.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`thumb-${idx}`}
                    className="w-16 h-16 object-cover rounded border"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col h-full">
            <div className="mb-2">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mr-2 mb-2 bg-blue-100 text-blue-800">
                {product.category}
              </span>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mr-2 mb-2 bg-purple-100 text-purple-800">
                {product.type}
              </span>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mr-2 mb-2 bg-gray-100 text-gray-800">
                Size: {product.size}
              </span>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mr-2 mb-2 bg-green-100 text-green-800">
                {product.condition}
              </span>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${product.isAvailable ? 'bg-green-200 text-green-900' : 'bg-red-200 text-red-900'}`}>
                {product.isAvailable ? 'Available' : 'Not Available'}
              </span>
            </div>
            <div className="bg-gray-100 rounded p-4 min-h-[120px] mb-4">
              <p className="text-gray-700 whitespace-pre-line">{product.description}</p>
            </div>
            <div className="mb-2">
              <span className="font-semibold">Tags: </span>
              {product.tags && product.tags.length > 0 ? (
                product.tags.map((tag, idx) => (
                  <span key={idx} className="inline-block px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-xs mr-1">{tag}</span>
                ))
              ) : (
                <span className="text-gray-400">No tags</span>
              )}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Points: </span>
              <span>{product.pointValue}</span>
            </div>
            <button
              className="w-fit px-6 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors mt-2"
              onClick={() => setShow3D(true)}
            >
              3D Preview
            </button>
          </div>
        </div>
      </div>

      {/* 3D Preview Modal */}
      {show3D && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white rounded-lg shadow-lg p-4 relative w-[90vw] max-w-2xl h-[80vh] flex flex-col">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-red-600 text-2xl font-bold"
              onClick={() => setShow3D(false)}
            >
              &times;
            </button>
            <div className="flex-1 flex items-center justify-center">
              <Canvas camera={{ position: [0, 0, 2.2], fov: 50 }}>
                <ambientLight intensity={0.7} />
                <directionalLight position={[2, 2, 2]} intensity={0.7} />
                <Shirt textureUrl={textureUrl} />
              </Canvas>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail; 