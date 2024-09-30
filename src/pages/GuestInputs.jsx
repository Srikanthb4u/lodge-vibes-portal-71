import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const GuestInputs = () => {
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState('5');
  const [reviewText, setReviewText] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send this data to your backend
    console.log('Contact Form:', { contactName, contactEmail, contactMessage });
    toast.success("Thank you for your message. We'll get back to you soon!");
    setContactName('');
    setContactEmail('');
    setContactMessage('');
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send this data to your backend
    console.log('Review:', { reviewName, reviewRating, reviewText });
    toast.success("Thank you for your review!");
    setReviewName('');
    setReviewRating('5');
    setReviewText('');
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send this data to your backend
    console.log('Newsletter Subscription:', { newsletterEmail });
    toast.success("You've been subscribed to our newsletter!");
    setNewsletterEmail('');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navigation />
      
      <main className="flex-grow container mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold mb-6">Guest Inputs</h1>
        
        <Tabs defaultValue="contact" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="contact">Contact Us</TabsTrigger>
            <TabsTrigger value="review">Leave a Review</TabsTrigger>
            <TabsTrigger value="newsletter">Newsletter</TabsTrigger>
          </TabsList>
          
          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Contact Form</CardTitle>
                <CardDescription>Have a question? Get in touch with us!</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit}>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="contactName">Name</Label>
                      <Input id="contactName" value={contactName} onChange={(e) => setContactName(e.target.value)} required />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="contactEmail">Email</Label>
                      <Input id="contactEmail" type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} required />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="contactMessage">Message</Label>
                      <Textarea id="contactMessage" value={contactMessage} onChange={(e) => setContactMessage(e.target.value)} required />
                    </div>
                  </div>
                  <Button type="submit" className="mt-4">Send Message</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="review">
            <Card>
              <CardHeader>
                <CardTitle>Leave a Review</CardTitle>
                <CardDescription>Share your experience with us and future guests!</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleReviewSubmit}>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="reviewName">Name</Label>
                      <Input id="reviewName" value={reviewName} onChange={(e) => setReviewName(e.target.value)} required />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="reviewRating">Rating</Label>
                      <Input id="reviewRating" type="number" min="1" max="5" value={reviewRating} onChange={(e) => setReviewRating(e.target.value)} required />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="reviewText">Your Review</Label>
                      <Textarea id="reviewText" value={reviewText} onChange={(e) => setReviewText(e.target.value)} required />
                    </div>
                  </div>
                  <Button type="submit" className="mt-4">Submit Review</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="newsletter">
            <Card>
              <CardHeader>
                <CardTitle>Subscribe to Our Newsletter</CardTitle>
                <CardDescription>Stay updated with our latest offers and news!</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleNewsletterSubmit}>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="newsletterEmail">Email</Label>
                    <Input id="newsletterEmail" type="email" value={newsletterEmail} onChange={(e) => setNewsletterEmail(e.target.value)} required />
                  </div>
                  <Button type="submit" className="mt-4">Subscribe</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default GuestInputs;