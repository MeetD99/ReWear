import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Shirt from '../components/three/Shirt';

const dummyItem = {
  title: 'Classic White T-Shirt',
  description: 'A comfortable, classic white t-shirt made from 100% organic cotton. Perfect for everyday wear.',
  category: 'Men',
  type: 'Tops',
  size: 'M',
  condition: 'Like new',
  tags: ['cotton', 'white', 'casual', 'eco-friendly'],
  images: [
    '/tshirtexture.jpg',
    'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=500&fit=crop'
  ],
  uploader: 'user123',
  isAvailable: true,
  isApproved: true,
  pointValue: 25,
  createdAt: '2024-07-15T10:00:00Z'
};

const ItemDetail = () => {
  const [show3D, setShow3D] = useState(false);
  const mainImage = dummyItem.images[0];
  const textureUrl = mainImage;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6 text-center">{dummyItem.title}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-lg shadow p-6 mb-10">
          <div>
            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
              <img src={mainImage} alt={dummyItem.title} className="object-cover w-full h-full" />
            </div>
            {dummyItem.images.length > 1 && (
              <div className="flex gap-2 mt-2 justify-center">
                {dummyItem.images.map((img, idx) => (
                  <img key={idx} src={img} alt={`thumb-${idx}`} className="w-16 h-16 object-cover rounded border" />
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-col h-full">
            <div className="mb-2">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mr-2 mb-2 bg-blue-100 text-blue-800">{dummyItem.category}</span>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mr-2 mb-2 bg-purple-100 text-purple-800">{dummyItem.type}</span>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mr-2 mb-2 bg-gray-100 text-gray-800">Size: {dummyItem.size}</span>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mr-2 mb-2 bg-green-100 text-green-800">{dummyItem.condition}</span>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${dummyItem.isAvailable ? 'bg-green-200 text-green-900' : 'bg-red-200 text-red-900'}`}>{dummyItem.isAvailable ? 'Available' : 'Not Available'}</span>
            </div>
            <div className="bg-gray-100 rounded p-4 min-h-[120px] mb-4">
              <p className="text-gray-700 whitespace-pre-line">{dummyItem.description}</p>
            </div>
            <div className="mb-2">
              <span className="font-semibold">Tags: </span>
              {dummyItem.tags.length > 0 ? (
                dummyItem.tags.map((tag, idx) => (
                  <span key={idx} className="inline-block px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-xs mr-1">{tag}</span>
                ))
              ) : (
                <span className="text-gray-400">No tags</span>
              )}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Points: </span>
              <span>{dummyItem.pointValue}</span>
            </div>
            <div className="mb-2">
              <span className="font-semibold">Created At: </span>
              <span>{new Date(dummyItem.createdAt).toLocaleString()}</span>
            </div>
            <button className="w-fit px-6 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors mt-2" onClick={() => setShow3D(true)}>3D Preview</button>
          </div>
        </div>
      </div>
      {show3D && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white rounded-lg shadow-lg p-4 relative w-[90vw] max-w-2xl h-[80vh] flex flex-col">
            <button className="absolute top-2 right-2 text-gray-600 hover:text-red-600 text-2xl font-bold" onClick={() => setShow3D(false)}>&times;</button>
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

export default ItemDetail; 