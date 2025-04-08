const RightSection = () => {
  return (
    <div className="col-span-1 space-y-4 md:space-y-6">
      <div className="p-3 md:p-4 w-full border rounded-lg shadow-md">
        <h2 className="text-gray-500 text-sm font-semibold text-center uppercase mb-3 md:mb-4">
          Popular Now
        </h2>
        <div className="space-y-3 md:space-y-4">
          <div className="flex items-start space-x-2 md:space-x-4 border-t pt-3 md:pt-4 first:border-t-0">
            <span className="text-red-600 text-xl md:text-2xl font-bold">
              1
            </span>
            <div className="flex-1">
              <h3 className="text-base md:text-lg font-semibold leading-snug">
                Virtual Reality and Mental Health: Exploring the Therapeutic
              </h3>
              <div className="flex items-center text-xs md:text-sm text-gray-500 mt-1">
                <span>2mo ago</span>
                <span className="flex items-center ml-2 md:ml-4">
                  <svg
                    className="w-3 h-3 md:w-4 md:h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16h6m-7 3h8a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                  290
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-start space-x-2 md:space-x-4 border-t pt-3 md:pt-4">
            <span className="text-red-600 text-xl md:text-2xl font-bold">
              2
            </span>
            <div className="flex-1">
              <h3 className="text-base md:text-lg font-semibold leading-snug">
                The Future of Sustainable Living: Driving Eco-Friendly
                Lifestyles
              </h3>
              <div className="flex items-center text-xs md:text-sm text-gray-500 mt-1">
                <span>2mo ago</span>
                <span className="flex items-center ml-2 md:ml-4">
                  <svg
                    className="w-3 h-3 md:w-4 md:h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16h6m-7 3h8a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                  1
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-start space-x-2 md:space-x-4 border-t pt-3 md:pt-4">
            <span className="text-red-600 text-xl md:text-2xl font-bold">
              3
            </span>
            <div className="flex-1">
              <h3 className="text-base md:text-lg font-semibold leading-snug">
                Smart Homes, Smarter Living: Exploring IoT and AI
              </h3>
              <div className="flex items-center text-xs md:text-sm text-gray-500 mt-1">
                <span>23d ago</span>
                <span className="flex items-center ml-2 md:ml-4">
                  <svg
                    className="w-3 h-3 md:w-4 md:h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16h6m-7 3h8a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                  15
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-start space-x-2 md:space-x-4 border-t pt-3 md:pt-4">
            <span className="text-red-600 text-xl md:text-2xl font-bold">
              4
            </span>
            <div className="flex-1">
              <h3 className="text-base md:text-lg font-semibold leading-snug">
                How Businesses Are Adapting to E-Commerce and AI Integration
              </h3>
              <div className="flex items-center text-xs md:text-sm text-gray-500 mt-1">
                <span>29d ago</span>
                <span className="flex items-center ml-2 md:ml-4">
                  <svg
                    className="w-3 h-3 md:w-4 md:h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16h6m-7 3h8a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                  20
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 md:p-4 border rounded">
        <h3 className="font-bold text-base md:text-lg">FOLLOW @NEWS5</h3>
        <input
          type="email"
          placeholder="Your email"
          className="w-full p-2 border mt-2 text-sm md:text-base"
        />
        <button className="w-full bg-red-500 text-white p-1.5 md:p-2 mt-2 text-sm md:text-base">
          Sign up
        </button>
        <div className="flex gap-3 md:gap-4 mt-3 md:mt-4 justify-center">
          <span className="text-gray-600 text-xl md:text-2xl">📘</span>
          <span className="text-gray-600 text-xl md:text-2xl">❌</span>
          <span className="text-gray-600 text-xl md:text-2xl">📺</span>
        </div>
      </div>
    </div>
  );
};

export default RightSection;
