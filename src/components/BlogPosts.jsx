import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const blogPosts = [
  { title: "Top 5 Hiking Trails Near Our Lodge", date: "2023-05-20" },
  { title: "A Guide to Local Cuisine", date: "2023-05-15" },
];

const BlogPosts = () => {
  return (
    <section className="mb-12" aria-labelledby="blog-news">
      <h2 id="blog-news" className="text-2xl sm:text-3xl font-semibold mb-4">Latest from Our Blog</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {blogPosts.map((post, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>{post.date}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Read more about local attractions and lodge updates...</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Read More</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default BlogPosts;