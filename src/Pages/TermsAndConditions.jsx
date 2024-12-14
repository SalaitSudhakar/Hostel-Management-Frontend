import React, { useState, useEffect } from "react";
import { CheckCircle, AlertCircle, FileText, Shield } from "lucide-react";

const TermsAndConditions = () => {
  /* const [isAgreed, setIsAgreed] = useState(false); */

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const termsCategories = [
    {
      title: "Booking & Reservation",
      icon: FileText,
      points: [
        "Reservations are confirmed only after full payment and receipt of booking confirmation.",
        "Cancellations must be made at least 7 days prior to check-in date for a full refund.",
        "Partial refunds are available between 3-7 days prior to check-in, with a 50% charge.",
        "No refunds for cancellations less than 3 days before check-in.",
      ],
    },
    {
      title: "Check-in & Check-out",
      icon: Shield,
      points: [
        "Standard check-in time is 2:00 PM and check-out time is 11:00 AM.",
        "Late check-out may incur additional charges.",
        "Valid government-issued ID is mandatory for check-in.",
        "Guests under 18 must be accompanied by a guardian.",
      ],
    },
    {
      title: "Facility Usage",
      icon: CheckCircle,
      points: [
        "Shared facilities must be kept clean and used respectfully.",
        "Personal belongings must not obstruct common areas.",
        "Kitchen and laundry facilities have specific operating hours.",
        "Damage to hostel property will be charged to the guest.",
      ],
    },
    {
      title: "Conduct & Behavior",
      icon: AlertCircle,
      points: [
        "Quiet hours are observed between 11:00 PM and 7:00 AM.",
        "Alcohol and smoking are prohibited in dormitory and common areas.",
        "Disruptive behavior may result in immediate eviction without refund.",
        "Respect for other guests' privacy and belongings is mandatory.",
      ],
    },
    {
      title: "Security & Safety",
      icon: Shield,
      points: [
        "Lockers are provided; guests are responsible for their valuables.",
        "CCTV surveillance is active in common areas.",
        "Each guest receives one key/access card; replacement costs apply.",
        "Emergency contact information must be provided during check-in.",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-center text-orange-600 mb-8">
          Terms & Conditions
        </h1>

        <div className="space-y-8">
          {termsCategories.map((category, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-md transition duration-300"
            >
              <div className="flex items-center mb-4">
                <category.icon className="mr-3 text-orange-600 w-8 h-8" />
                <h2 className="text-2xl font-semibold text-gray-900">
                  {category.title}
                </h2>
              </div>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                {category.points.map((point, pointIndex) => (
                  <li key={pointIndex} className="pl-2">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-gray-600 text-sm">
          <p>Last Updated: November 2024</p>
          <p className="mt-2">© 2024 Hostel Haven. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
