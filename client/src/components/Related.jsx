import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListingItem from "./ListingItem";

export default function RelatedProperties({ currentPropertyId, propertyType }) {
  const [relatedListings, setRelatedListings] = useState([]);

  useEffect(() => {
    const fetchRelatedListings = async () => {
      try {
        const res = await fetch(
          `/api/listing/get?type=${propertyType}&limit=4&exclude=${currentPropertyId}`
        );
        const data = await res.json();
        setRelatedListings(data);
      } catch (error) {
        console.error("Error fetching related properties:", error);
      }
    };

    if (propertyType) {
      fetchRelatedListings();
    }
  }, [currentPropertyId, propertyType]);

  if (!relatedListings || relatedListings.length === 0) {
    return null; // Don't render the component if there are no related listings
  }

  return (
    <div className="bg-gray-100 py-8 px-6 mt-10 rounded-lg shadow-md">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-6">
        Related Properties
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {relatedListings.map((listing) => (
          <Link
          key={listing._id}
          to={`/listing/${listing._id}`} // Redirects to the property details page
          onClick={() => window.scrollTo(0, 0)} // Scrolls to the top of the page
          className="block"
        >
          <ListingItem listing={listing} />
        </Link>
        ))}
      </div>
      <div className="mt-6 text-center">
        <Link
          to={`/search?type=${propertyType}`}
          className="text-blue-600 text-sm hover:underline"
        >
          View More {propertyType === "rent" ? "Rentals" : "Sales"}
        </Link>
      </div>
    </div>
  );
}
