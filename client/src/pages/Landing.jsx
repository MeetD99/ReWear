import React from 'react';
import { Link } from 'react-router-dom';

const featuredItems = [
  {
    id: '1',
    title: 'Blue Denim Jacket',
    image: '/images/denim.jpg',
  },
  {
    id: '2',
    title: 'Floral Summer Dress',
    image: '/images/dress.jpg',
  },
  {
    id: '3',
    title: 'Casual White Sneakers',
    image: '/images/sneakers.jpg',
  },
];

const LandingPage = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-indigo-600 text-white py-16 px-6 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Welcome to ReWear</h1>
        <p className="text-lg sm:text-xl max-w-2xl mx-auto">
          Join our community clothing exchange and give your unused clothes a new life. Reduce textile waste and earn points for every swap.
        </p>

        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <Link
            to="/login"
            className="bg-white text-indigo-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition"
          >
            Start Swapping
          </Link>
          <Link
            to="/items"
            className="bg-white text-indigo-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition"
          >
            Browse Items
          </Link>
          <Link
            to="/add-item"
            className="bg-white text-indigo-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition"
          >
            List an Item
          </Link>
        </div>
      </section>

      {/* Featured Items Carousel */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">Featured Items</h2>

        <div className="flex overflow-x-auto space-x-6 pb-2">
          {featuredItems.map((item) => (
            <div
              key={item.id}
              className="min-w-[250px] bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-52 object-cover rounded-t-2xl"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <Link
                  to={`/item/${item.id}`}
                  className="text-sm text-indigo-600 mt-2 inline-block"
                >
                  View Item →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
