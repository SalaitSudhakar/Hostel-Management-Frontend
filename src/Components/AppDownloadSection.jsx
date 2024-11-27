import React from 'react';

const AppDownloadSection = () => {
  return (
    <div className="relative bg-gradient-to-br from-orange-600 to-amber-500 text-white py-6 overflow-hidden">
      {/* Polygon Background */}
      <div className="absolute inset-0 z-0">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1440 320" 
          className="md:hidden absolute top-0 left-0 w-full h-full"
        >
          <path 
            fill="rgba(255,255,255,0.1)" 
            fillOpacity="1" 
            d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,170.7C672,149,768,139,864,144C960,149,1056,171,1152,192C1248,213,1344,235,1392,245.3L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0L192,0L96,0L0,0Z"
          ></path>
        </svg>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1440 320" 
          className="absolute top-1/4 left-0 w-full h-full"
        >
          <path 
            fill="rgba(255,255,255,0.05)" 
            fillOpacity="1" 
            d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,229.3C672,224,768,192,864,170.7C960,149,1056,139,1152,154.7C1248,171,1344,213,1392,234.7L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0L192,0L96,0L0,0Z"
          ></path>
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-between">
        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-xl md:text-lg font-bold mb-4 text-white">
            Download HM Hostel App
          </h2>
          <p className=" md:text-lg text-white/80 mb-4">
            Experience seamless booking, real-time updates, and exclusive offers right at your fingertips. 
            Download our app and manage your stay with ease.
          </p>
          <div className="flex justify-center items-center md:justify-start gap-4 pl-5">
            {/* App Store Button */}
            <button 
              onClick={() => window.open('https://www.apple.com/app-store', '_blank')}
            >
              <img 
                src="../../Public/app-store.svg" 
                alt="App Store" 
                className="h-32 rounded-md"
              />
             
            </button>

            {/* Play Store Button */}
            <button 
              onClick={() => window.open('https://play.google.com/store', '_blank')}
            >
              <img 
                src="../../Public/google-play.svg" 
                alt="Google Play" 
                className="h-32 rounded-md"
              />
             
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Polygon */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1440 320" 
          className="w-full"
        >
          <path 
            fill="rgba(255,255,255,0.1)" 
            fillOpacity="1" 
            d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,170.7C672,149,768,139,864,144C960,149,1056,171,1152,192C1248,213,1344,235,1392,245.3L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320L192,320L96,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default AppDownloadSection;