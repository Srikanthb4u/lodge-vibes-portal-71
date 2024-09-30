import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const Amenities = () => {
  const amenities = [
    { name: "Wi-Fi", description: "Complimentary high-speed internet throughout the lodge" },
    { name: "Breakfast", description: "Daily buffet breakfast with local and international options" },
    { name: "Mini Function Hall", description: "Versatile space for meetings, events, or small gatherings" },
    { name: "Outdoor Pool", description: "Refreshing swimming pool with scenic views" },
    { name: "Fitness Center", description: "Well-equipped gym with modern exercise machines" },
    { name: "Spa Services", description: "Relaxing treatments and massages available" },
    { name: "Restaurant", description: "On-site dining featuring local and international cuisine" },
    { name: "Parking", description: "Free parking for guests" },
    { name: "Laundry Service", description: "Same-day laundry and dry cleaning services" }
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navigation />
      
      <main className="flex-grow container mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold mb-6">Our Amenities</h1>
        
        <p className="text-lg mb-8">
          At our lodge, we offer a wide range of amenities to ensure your stay is comfortable, convenient, and enjoyable. Whether you're here for relaxation or adventure, we have everything you need for a memorable experience.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {amenities.map((amenity, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">{amenity.name}</h2>
              <p>{amenity.description}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Amenities;