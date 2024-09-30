import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const localAttractions = [
  { name: "Scenic Hiking Trails", description: "Explore breathtaking nature paths just minutes from our lodge." },
  { name: "Local Winery Tours", description: "Taste exquisite wines at nearby vineyards." },
  { name: "Historic Downtown", description: "Discover charming shops and restaurants in our historic town center." },
  { name: "Lake Activities", description: "Enjoy fishing, boating, and swimming in our pristine lake." },
];

const LocalAttractions = () => {
  return (
    <section className="mb-12" aria-labelledby="local-attractions">
      <h2 id="local-attractions" className="text-2xl sm:text-3xl font-semibold mb-4">Local Attractions Guide</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {localAttractions.map((attraction, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{attraction.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{attraction.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-6 text-center">
        <Button variant="outline">Explore More Local Attractions</Button>
      </div>
    </section>
  );
};

export default LocalAttractions;