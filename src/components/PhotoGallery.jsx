import React from 'react';

const galleryImages = [
  "/placeholder.svg",
  "/placeholder.svg",
  "/placeholder.svg",
  "/placeholder.svg",
];

const PhotoGallery = () => {
  return (
    <section className="mb-12" aria-labelledby="photo-gallery">
      <h2 id="photo-gallery" className="text-2xl sm:text-3xl font-semibold mb-4">Photo Gallery</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {galleryImages.map((image, index) => (
          <img key={index} src={image} alt={`Gallery image ${index + 1}`} className="w-full h-48 object-cover rounded-lg shadow-md" loading="lazy" />
        ))}
      </div>
    </section>
  );
};

export default PhotoGallery;