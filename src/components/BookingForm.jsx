import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { addBooking } from '../utils/firebaseClient';

const BookingForm = ({ isGroup, onSubmit }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(isGroup ? '5' : '1');
  const [roomType, setRoomType] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookingData = { checkIn, checkOut, guests, roomType, mobileNumber };
    
    try {
      await addBooking(bookingData);
      
      console.log(`Sending WhatsApp confirmation to ${mobileNumber}`);
      
      onSubmit(bookingData);
      toast.success("Booking request submitted! You'll receive a confirmation on WhatsApp soon.");
    } catch (error) {
      console.error('Error submitting booking:', error);
      toast.error("There was an error submitting your booking. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="checkIn">Check-in Date</Label>
          <Input id="checkIn" type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} required />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="checkOut">Check-out Date</Label>
          <Input id="checkOut" type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} required />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="guests">Number of Guests</Label>
          <Input id="guests" type="number" min={isGroup ? "5" : "1"} value={guests} onChange={(e) => setGuests(e.target.value)} required />
        </div>
        {!isGroup && (
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="roomType">Room Type</Label>
            <Select onValueChange={setRoomType} required>
              <SelectTrigger id="roomType">
                <SelectValue placeholder="Select room type" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="standard">Standard Room</SelectItem>
                <SelectItem value="deluxe">Deluxe Room</SelectItem>
                <SelectItem value="suite">Suite</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="mobileNumber">Mobile Number (for WhatsApp confirmation)</Label>
          <Input id="mobileNumber" type="tel" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} required />
        </div>
      </div>
      <Button type="submit" className="mt-4">Submit Booking Request</Button>
    </form>
  );
};

export default BookingForm;