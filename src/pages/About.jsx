import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navigation />
      
      <main className="flex-grow container mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold mb-6">About Our Lodge</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our History</h2>
            <p className="mb-4">
              Founded in 1985, our lodge has been a haven for travelers and locals alike for over three decades. What started as a small family-run retreat has grown into a beloved destination in the heart of the city.
            </p>
            <p>
              Throughout the years, we've maintained our commitment to providing a warm, welcoming atmosphere while continuously improving our facilities and services to meet the evolving needs of our guests.
            </p>
          </div>
          <div>
            <img src="/lodge-exterior.jpg" alt="Lodge exterior" className="w-full h-auto object-cover rounded-lg shadow-md" />
          </div>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="mb-4">
            At our lodge, we strive to create unforgettable experiences for our guests by:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>Providing exceptional hospitality and personalized service</li>
            <li>Offering comfortable accommodations that blend urban convenience with a touch of home</li>
            <li>Promoting sustainable practices to minimize our environmental impact</li>
            <li>Supporting the local community and showcasing the best of our city</li>
          </ul>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4">Unique Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-bold">Central Location</h3>
              <p>Enjoy easy access to the city's main attractions and business districts</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-bold">Modern Amenities</h3>
              <p>Experience comfort with our up-to-date facilities and services</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-bold">Community Connection</h3>
              <p>Immerse yourself in local culture with our community events and partnerships</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;