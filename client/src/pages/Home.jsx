import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ListingItem from '../components/ListingItem';
import Footer from '../components/Footer';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [featuredImage, setFeaturedImage] = useState('');
  
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        if (data.length > 0) setFeaturedImage(data[0].imageUrls[0]); // Use the first offer listing's image
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('https://real-estate-backend-rai3.onrender.com/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListings();
  }, []);

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div
        className="relative flex items-center justify-center text-center h-[60vh] sm:h-[70vh] lg:h-[80vh] bg-cover bg-center"
        style={{
          backgroundImage: `url(${featuredImage || 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 px-6 max-w-4xl">
          <h1 className="text-white font-extrabold text-2xl sm:text-4xl lg:text-5xl">
            Your Dream <span className="text-blue-400">Home</span> Awaits
          </h1>
          <p className="text-gray-300 text-sm sm:text-base lg:text-lg mt-4">
            Discover your next perfect home with Sahand Estate. We offer a wide
            range of properties to match your dreams.
          </p>
          <Link
            to="/search"
            className="inline-block text-sm sm:text-base text-white bg-blue-600 px-6 py-3 mt-6 rounded-full shadow-md hover:bg-blue-700 transition"
          >
            Find Your Home
          </Link>
        </div>
      </div>

      {/* Listing Sections */}
      <div className="max-w-7xl mx-auto p-6 lg:p-10 flex flex-col gap-12">
        {/* Offers Section */}
        {offerListings && offerListings.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-700">
                Latest Offers
              </h2>
              <Link
                to="/search?offer=true"
                className="text-sm text-blue-600 hover:underline"
              >
                View All Offers
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {/* Rent Section */}
        {rentListings && rentListings.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-700">
                Places for Rent
              </h2>
              <Link
                to="/search?type=rent"
                className="text-sm text-blue-600 hover:underline"
              >
                View All Rentals
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {/* Sale Section */}
        {saleListings && saleListings.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-700">
                Places for Sale
              </h2>
              <Link
                to="/search?type=sale"
                className="text-sm text-blue-600 hover:underline"
              >
                View All Sales
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
}
