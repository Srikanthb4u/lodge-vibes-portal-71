import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const specialOffers = [
  { title: "Summer Getaway", description: "20% off on all bookings in July and August", code: "SUMMER20" },
  { title: "Weekend Retreat", description: "Stay 2 nights, get the 3rd night free", code: "WEEKEND3" },
];

const SpecialOffers = () => {
  return (
    <section className="mb-12" aria-labelledby="special-offers">
      <h2 id="special-offers" className="text-2xl sm:text-3xl font-semibold mb-4">Special Offers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {specialOffers.map((offer, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{offer.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{offer.description}</p>
            </CardContent>
            <CardFooter>
              <p className="font-semibold">Use code: {offer.code}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default SpecialOffers;