import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { saveLodgeSettings, getLodgeSettings } from '../utils/firebaseClient';

const LodgeSettings = () => {
  const [lodgeName, setLodgeName] = useState('');
  const [standardRoomPrice, setStandardRoomPrice] = useState('');
  const [deluxeRoomPrice, setDeluxeRoomPrice] = useState('');
  const [suiteRoomPrice, setSuiteRoomPrice] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      const settings = await getLodgeSettings();
      if (settings) {
        setLodgeName(settings.lodgeName || 'Urban Lodge');
        setStandardRoomPrice(settings.standardRoomPrice || '99');
        setDeluxeRoomPrice(settings.deluxeRoomPrice || '149');
        setSuiteRoomPrice(settings.suiteRoomPrice || '249');
        setEmail(settings.email || 'bookings@ourlodge.com');
        setLocation(settings.location || '123 Nature Drive, Scenic Valley, SV 12345');
        setContactNumber(settings.contactNumber || '+1 (555) 123-4567');
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    const settings = {
      lodgeName,
      standardRoomPrice,
      deluxeRoomPrice,
      suiteRoomPrice,
      email,
      location,
      contactNumber
    };
    try {
      await saveLodgeSettings(settings);
      toast.success("Lodge settings updated successfully!");
    } catch (error) {
      toast.error("Failed to update lodge settings. Please try again.");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lodge Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-4">
          <div>
            <Label htmlFor="lodgeName">Lodge Name</Label>
            <Input id="lodgeName" value={lodgeName} onChange={(e) => setLodgeName(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="standardRoomPrice">Standard Room Price ($)</Label>
            <Input id="standardRoomPrice" type="number" value={standardRoomPrice} onChange={(e) => setStandardRoomPrice(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="deluxeRoomPrice">Deluxe Room Price ($)</Label>
            <Input id="deluxeRoomPrice" type="number" value={deluxeRoomPrice} onChange={(e) => setDeluxeRoomPrice(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="suiteRoomPrice">Suite Room Price ($)</Label>
            <Input id="suiteRoomPrice" type="number" value={suiteRoomPrice} onChange={(e) => setSuiteRoomPrice(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="email">Contact Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="location">Lodge Location</Label>
            <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="contactNumber">Contact Number</Label>
            <Input id="contactNumber" type="tel" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
          </div>
          <Button type="submit">Save Settings</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LodgeSettings;