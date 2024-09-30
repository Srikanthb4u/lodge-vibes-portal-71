import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const upcomingEvents = [
  { date: "2023-06-15", title: "Local Wine Tasting", description: "Experience the finest local wines" },
  { date: "2023-07-01", title: "Fourth of July Celebration", description: "Fireworks and BBQ by the lake" },
];

const UpcomingEvents = () => {
  return (
    <section className="mb-12" aria-labelledby="upcoming-events">
      <h2 id="upcoming-events" className="text-2xl sm:text-3xl font-semibold mb-4">Upcoming Events</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {upcomingEvents.map((event, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{event.title}</CardTitle>
              <CardDescription>{event.date}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{event.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default UpcomingEvents;