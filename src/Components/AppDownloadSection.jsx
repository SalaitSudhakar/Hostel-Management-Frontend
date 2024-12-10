import React from "react";

const AppDownloadSection = () => {
  return (
    <div className="relative bg-gradient-to-br from-orange-600 to-amber-500 text-white py-6 overflow-hidden">
      {/* Polygon Background */}
      <div className="absolute inset-0 z-0"></div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-between">
        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-xl md:text-lg font-bold mb-4 text-white">
            Download HM Hostel App
          </h2>
          <p className=" md:text-lg text-white/80 mb-4">
            Experience seamless booking, real-time updates, and exclusive offers
            right at your fingertips. Download our app and manage your stay with
            ease.
          </p>
          <div className="flex justify-center items-center md:justify-start gap-4 pl-5">
            {/* App Store Button */}
            <button
              onClick={() =>
                window.open("https://www.apple.com/app-store", "_blank")
              }
            >
              <img
                src="app-store.svg"
                alt="App Store"
                className="h-32 rounded-md"
              />
            </button>

            {/* Play Store Button */}
            <button
              onClick={() =>
                window.open("https://play.google.com/store", "_blank")
              }
            >
              <img
                src="google-play.svg"
                alt="Google Play"
                className="h-32 rounded-md"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppDownloadSection;
