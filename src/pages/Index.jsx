import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Helmet } from 'react-helmet';
import { MessageCircle } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SpecialOffers from '../components/SpecialOffers';
import UpcomingEvents from '../components/UpcomingEvents';
import PhotoGallery from '../components/PhotoGallery';
import BlogPosts from '../components/BlogPosts';
import FeaturedAmenities from '../components/FeaturedAmenities';
import LocalAttractions from '../components/LocalAttractions';
import '../styles/Index.css';
import { getLodgeSettings } from '../utils/firebaseClient';

const Index = () => {
  const [lodgeName, setLodgeName] = useState('Urban Lodge');

  useEffect(() => {
    const fetchSettings = async () => {
      const settings = await getLodgeSettings();
      if (settings) {
        setLodgeName(settings.lodgeName || 'Urban Lodge');
      }
    };
    fetchSettings();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Helmet>
        <title>Welcome to {lodgeName} - Your Perfect Urban Retreat</title>
        <meta name="description" content={`Experience comfort and convenience at ${lodgeName}. Book your stay for a unique retreat in the heart of the city. Special offers available!`} />
        <meta name="keywords" content="lodge, urban retreat, comfortable stay, special offers, events, city life, local cuisine, local attractions" />
      </Helmet>

      <Navigation />
      
      <main className="flex-grow">
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Welcome to {lodgeName}</h1>
            <p className="text-xl mb-6">Experience the perfect blend of comfort and city life</p>
            <Button asChild className="cta-button">
              <Link to="/booking">Book Your Stay</Link>
            </Button>
          </div>
        </section>

        <div className="container mx-auto px-4 sm:px-6 py-12">
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-center section-title">Discover Our Lodge</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div>
                <p className="text-lg mb-4">
                  Located in the heart of the bustling city, {lodgeName} offers a unique retreat for both business and leisure travelers. We combine modern amenities with a touch of local charm to ensure an unforgettable stay.
                </p>
                <div className="space-x-4">
                  <Button asChild variant="outline" className="cta-button">
                    <Link to="/about">Learn More About Us</Link>
                  </Button>
                </div>
              </div>
              <div>
                <img src="/placeholder.svg" alt="Lodge exterior" className="w-full h-64 object-cover rounded-lg shadow-md" loading="lazy" />
              </div>
            </div>
          </section>
          
          <SpecialOffers />
          <UpcomingEvents />
          <PhotoGallery />
          <BlogPosts />
          <FeaturedAmenities />
          <LocalAttractions />
        </div>
      </main>

      <Footer />

      <div className="fixed bottom-4 right-4 z-50">
        <Button className="rounded-full p-4" aria-label="Open live chat">
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default Index;