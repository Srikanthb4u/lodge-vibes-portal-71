import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import AdminEnquiries from '../components/AdminEnquiries';
import AdminBookings from '../components/AdminBookings';
import LodgeSettings from '../components/LodgeSettings';

const AdminDashboard = () => {
  const bookingsData = [
    { month: 'Jan', bookings: 65 },
    { month: 'Feb', bookings: 59 },
    { month: 'Mar', bookings: 80 },
    { month: 'Apr', bookings: 81 },
    { month: 'May', bookings: 56 },
    { month: 'Jun', bookings: 55 },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <nav className="container mx-auto px-6 py-4">
          <ul className="flex space-x-4">
            <li><Link to="/" className="text-blue-600 hover:text-blue-800">Home</Link></li>
            <li><Link to="/admin" className="text-blue-600 hover:text-blue-800">Admin Dashboard</Link></li>
          </ul>
        </nav>
      </header>
      
      <main className="container mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Total Bookings: 152</p>
              <Button className="mt-4">View All Bookings</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Inquiries</CardTitle>
            </CardHeader>
            <CardContent>
              <p>New Inquiries: 5</p>
              <Button className="mt-4">Respond to Inquiries</Button>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Booking Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={bookingsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="bookings" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <AdminBookings />
        
        <AdminEnquiries />
        
        <LodgeSettings />
      </main>
    </div>
  );
};

export default AdminDashboard;