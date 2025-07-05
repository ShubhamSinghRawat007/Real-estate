import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from 'react-icons/fa';
import Contact from '../components/Contact';
import RelatedProperties from '../components/Related';

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://real-estate-backend-rai3.onrender.com/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <main className="bg-gray-50 min-h-screen">
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <div className="container mx-auto p-4">
          {/* Image Slider */}
          <div className="relative">
            <Swiper navigation>
              {listing.imageUrls.map((url) => (
                <SwiperSlide key={url}>
                  <div
                    className="h-[500px] sm:h-[600px] lg:h-[700px] bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${url})`,
                    }}
                  ></div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="absolute top-4 right-4 z-10">
              <button
                className="bg-white p-3 rounded-full shadow-md hover:shadow-lg"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
              >
                <FaShare className="text-gray-600" />
              </button>
            </div>
            {copied && (
              <p className="absolute top-16 right-4 bg-white p-2 rounded-md shadow-md">
                Link copied!
              </p>
            )}
          </div>

          {/* Listing Details */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {listing.name} - ${' '}
                {listing.offer
                  ? listing.discountPrice.toLocaleString('en-US')
                  : listing.regularPrice.toLocaleString('en-US')}
                {listing.type === 'rent' && ' / month'}
              </h1>
              <p className="flex items-center text-gray-600 mb-4">
                <FaMapMarkerAlt className="text-green-600 mr-2" />
                {listing.address}
              </p>
              <div className="flex items-center gap-4 mb-4">
                <span className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium">
                  {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
                </span>
                {listing.offer && (<>
                  <span className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium">Org Price: 
                    ${+listing.regularPrice} 
                  </span>
                  <span className='px-4 py-2 bg-yellow-500 text-white rounded-lg text-sm font-medium' >Discount : $({listing.discountPrice})</span>
                  </>
                )}
              </div>
              <p className="text-gray-700 mb-4">
                <span className="font-semibold">Description: </span>
                {listing.description}
              </p>
              <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-gray-800 text-sm font-semibold">
                <li className="flex items-center">
                  <FaBed className="text-lg mr-2" />
                  {listing.bedrooms > 1
                    ? `${listing.bedrooms} Beds`
                    : `${listing.bedrooms} Bed`}
                </li>
                <li className="flex items-center">
                  <FaBath className="text-lg mr-2" />
                  {listing.bathrooms > 1
                    ? `${listing.bathrooms} Baths`
                    : `${listing.bathrooms} Bath`}
                </li>
                <li className="flex items-center">
                  <FaParking className="text-lg mr-2" />
                  {listing.parking ? 'Parking Spot' : 'No Parking'}
                </li>
                <li className="flex items-center">
                  <FaChair className="text-lg mr-2" />
                  {listing.furnished ? 'Furnished' : 'Unfurnished'}
                </li>
              </ul>
            </div>

            {/* Right Column */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              
              {currentUser && listing.userRef !== currentUser._id && !contact && (
                <button
                  onClick={() => setContact(true)}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Contact Landlord
                </button>
              )}
              {contact && <Contact listing={listing} />}
              {!currentUser? <p>Sign In to contact the seller</p> : ""}
            </div>
          </div>
        </div>
      )}
      {listing?<RelatedProperties currentPropertyId={listing._id}
          propertyType={listing.type} />:""}
      
    </main>
  );
}
