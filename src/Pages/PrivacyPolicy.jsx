import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl text-orange-500 font-bold text-center mb-8 pb-4 border-b-2 border-orange-500">
        Privacy Policy
      </h1>

      <div className="bg-white shadow-md rounded-lg mb-6 p-6">
        <h2 className="text-2xl font-semibold text-orange-700 mb-4">
          1. Information We Collect
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Personal Information: Name, email, phone number, identification
            details
          </li>
          <li>
            Booking Details: Reservation dates, room preferences, special
            requests
          </li>
          <li>
            Payment Information: Processed through secure payment gateways
          </li>
          <li>
            Technical Data: IP address, device information, browsing behavior
          </li>
        </ul>
      </div>

      <div className="bg-white shadow-md rounded-lg mb-6 p-6">
        <h2 className="text-2xl font-semibold text-orange-700 mb-4">
          2. How We Use Your Information
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Process and manage hostel bookings</li>
          <li>Communicate reservation confirmations</li>
          <li>Provide customer support</li>
          <li>Improve user experience and services</li>
          <li>Comply with legal and regulatory requirements</li>
        </ul>
      </div>

      <div className="bg-white shadow-md rounded-lg mb-6 p-6">
        <h2 className="text-2xl font-semibold text-orange-700 mb-4">
          3. Data Sharing and Protection
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Sharing limited to necessary service providers</li>
          <li>Secure encryption of sensitive information</li>
          <li>No selling of personal data to third parties</li>
          <li>Compliance with data protection regulations</li>
        </ul>
      </div>

      <div className="bg-white shadow-md rounded-lg mb-6 p-6">
        <h2 className="text-2xl font-semibold text-orange-700 mb-4">
          4. User Rights
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Access your personal information</li>
          <li>Request correction of inaccurate data</li>
          <li>Request deletion of personal information</li>
          <li>Opt-out of marketing communications</li>
          <li>Lodge complaints with data protection authorities</li>
        </ul>
      </div>

      <div className="bg-white shadow-md rounded-lg mb-6 p-6">
        <h2 className="text-2xl font-semibold text-orange-700 mb-4">
          5. Contact Information
        </h2>
        <div className="space-y-2">
          <p>Email: privacy@hostelprivacy.com</p>
          <p>Phone: +1 (555) 123-4567</p>
          <p>Address: 123 Hostel Street, City, Country</p>
        </div>
      </div>

      <div className="text-center text-gray-500 mt-8">
        <p>Last Updated: November 2024</p>
        <p>© 2024 Hostel Management. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
