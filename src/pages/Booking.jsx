import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PhoneIcon, MailIcon, MapPinIcon } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import BookingForm from '../components/BookingForm';
import { getLodgeSettings } from '../utils/firebaseClient';

const Booking = () => {
  const [lodgeSettings, setLodgeSettings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const settings = await getLodgeSettings();
        setLodgeSettings(settings);
      } catch (error) {
        console.error('Error fetching lodge settings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleBooking = (bookingData) => {
    console.log('Booking:', bookingData);
    alert(`Booking confirmed! A confirmation will be sent to ${bookingData.mobileNumber}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navigation />
      
      <main className="flex-grow container mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold mb-6">Book Your Stay</h1>
        
        <Tabs defaultValue="individual" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="individual">Individual Booking</TabsTrigger>
            <TabsTrigger value="group">Group Booking</TabsTrigger>
          </TabsList>
          <TabsContent value="individual">
            <Card>
              <CardHeader>
                <CardTitle>Room Reservation</CardTitle>
                <CardDescription>Book your perfect room for your stay.</CardDescription>
              </CardHeader>
              <CardContent>
                <BookingForm isGroup={false} onSubmit={handleBooking} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="group">
            <Card>
              <CardHeader>
                <CardTitle>Group Booking</CardTitle>
                <CardDescription>Book multiple rooms for your event or group stay.</CardDescription>
              </CardHeader>
              <CardContent>
                <BookingForm isGroup={true} onSubmit={handleBooking} />
              </CardContent>
              <CardFooter>
                <p className="text-sm text-gray-500">For group bookings, our team will contact you to confirm details and discuss any available discounts or packages.</p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Room Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Standard Room</CardTitle>
              </CardHeader>
              <CardContent>
                <img src="/placeholder.svg" alt="Standard Room" className="w-full h-48 object-cover mb-4 rounded-md" />
                <p>Comfortable room with essential amenities. Perfect for solo travelers or couples.</p>
              </CardContent>
              <CardFooter>
                <p className="font-semibold">From ₹{lodgeSettings?.standardRoomPrice}/night</p>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Deluxe Room</CardTitle>
              </CardHeader>
              <CardContent>
                <img src="/placeholder.svg" alt="Deluxe Room" className="w-full h-48 object-cover mb-4 rounded-md" />
                <p>Spacious room with upgraded amenities and beautiful views. Ideal for those seeking extra comfort.</p>
              </CardContent>
              <CardFooter>
                <p className="font-semibold">From ₹{lodgeSettings?.deluxeRoomPrice}/night</p>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Suite</CardTitle>
              </CardHeader>
              <CardContent>
                <img src="/placeholder.svg" alt="Suite" className="w-full h-48 object-cover mb-4 rounded-md" />
                <p>Luxurious suite with separate living area and premium amenities. Perfect for extended stays or special occasions.</p>
              </CardContent>
              <CardFooter>
                <p className="font-semibold">From ₹{lodgeSettings?.suiteRoomPrice}/night</p>
              </CardFooter>
            </Card>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <Card>
            <CardHeader>
              <CardTitle>Need Help with Your Booking?</CardTitle>
              <CardDescription>Our team is here to assist you with any questions or special requests.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <PhoneIcon className="h-5 w-5 text-gray-500" />
                  <span>{lodgeSettings?.contactNumber}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MailIcon className="h-5 w-5 text-gray-500" />
                  <span>{lodgeSettings?.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPinIcon className="h-5 w-5 text-gray-500" />
                  <span>{lodgeSettings?.location}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-gray-500">Our booking office is open 24/7 to assist you with your reservations and inquiries.</p>
            </CardFooter>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Booking;