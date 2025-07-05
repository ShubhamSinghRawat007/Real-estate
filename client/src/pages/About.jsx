import React from 'react';
import Footer from '../components/Footer';

export default function About() {
  return (
    <div className="py-16 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto bg-gray-50">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-800">
          About <span className="text-blue-600">Real Estate</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Your trusted partner in finding your dream property.
        </p>
      </div>

      {/* Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Text Content */}
        <div className="text-gray-700 space-y-6">
          <p className="leading-relaxed">
            Sahand Estate is a leading real estate agency that specializes in
            helping clients buy, sell, and rent properties in the most desirable
            neighborhoods. Our team of experienced agents is dedicated to
            providing exceptional service and making the buying and selling
            process as smooth as possible.
          </p>
          <p className="leading-relaxed">
            Our mission is to help our clients achieve their real estate goals
            by providing expert advice, personalized service, and a deep
            understanding of the local market. Whether you are looking to buy,
            sell, or rent a property, we are here to help you every step of the
            way.
          </p>
          <p className="leading-relaxed">
            Our team of agents has a wealth of experience and knowledge in the
            real estate industry, and we are committed to providing the highest
            level of service to our clients. We believe that buying or selling a
            property should be an exciting and rewarding experience, and we are
            dedicated to making that a reality for each and every one of our
            clients.
          </p>
        </div>

        {/* Image Content */}
        <div className="relative">
          <img
            src="https://img.freepik.com/free-photo/group-people-working-out-business-plan-office_1303-15854.jpg?t=st=1737629158~exp=1737632758~hmac=6faee16c1e195f1a63ae98b58371b5ff62f9a121e91c8ebd3f9e195e1d63a137&w=900"
            alt="Sahand Estate team"
            className="rounded-lg shadow-lg w-full"
          />
          <div className="absolute bottom-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-md shadow-md">
            <p className="text-sm font-medium">Your Trusted Partner</p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Why Choose Us?
        </h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-blue-600">
              Experienced Agents
            </h3>
            <p className="mt-2 text-gray-600">
              Our agents are experts in the field, ready to guide you through
              every step of your real estate journey.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-blue-600">
              Personalized Service
            </h3>
            <p className="mt-2 text-gray-600">
              We provide tailored solutions to meet your unique real estate
              needs.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-blue-600">
              Local Expertise
            </h3>
            <p className="mt-2 text-gray-600">
              We know the neighborhoods and markets inside out, ensuring you get
              the best advice.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="my-16 bg-blue-600 text-white text-center py-8 px-4 rounded-lg">
        <h3 className="text-2xl font-bold">
          Ready to start your real estate journey?
        </h3>
        <p className="mt-4 text-lg">
          Contact us today and let us help you find your dream property.
        </p>
        {/* <button className="mt-6 px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition">
          Get in Touch
        </button> */}
      </div>
      <Footer/>
    </div>
  );
}
