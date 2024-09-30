import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const FeaturedAmenities = () => {
  return (
    <section className="mb-12" aria-labelledby="featured-amenities">
      <h2 id="featured-amenities" className="text-2xl font-semibold mb-4">Featured Amenities</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-bold">Wi-Fi</h3>
          <p>Stay connected with our high-speed internet</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-bold">Breakfast</h3>
          <p>Start your day with our delicious breakfast options</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-bold">Mini Function Hall</h3>
          <p>Perfect for small gatherings and events</p>
        </div>
      </div>
      <div className="mt-6 text-center">
        <Button asChild>
          <Link to="/amenities">View All Amenities</Link>
        </Button>
      </div>
    </section>
  );
};

export default FeaturedAmenities;