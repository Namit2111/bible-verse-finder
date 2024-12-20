import Header from "@/components/Header";
import ChatBox from "../../components/ChatBox";

const Page = () => {
  return (
    <div className="w-screen h-screen flex flex-col bg-black">
      <Header />
      {/* <div className="flex-grow flex items-center justify-center relative"> */}
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <ChatBox />
        </div>
      <div className="absolute inset-0 z-0">
          <svg
            className="blur-3xl filter opacity-60"
            width="1444"
            height="736"
            viewBox="0 0 444 536"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M225.919 112.719C343.98 64.6648 389.388 -70.487 437.442 47.574C485.496 165.635 253.266 481.381 135.205 529.435C17.1445 577.488 57.9596 339.654 9.9057 221.593C-38.1482 103.532 107.858 160.773 225.919 112.719Z"
              fill={`url(#c)`}
            />
            <defs>
              <linearGradient
                id="c"
                x1="82.7339"
                y1="550.792"
                x2="-39.945"
                y2="118.965"
                gradientUnits="userSpaceOnUse"
              >
                <stop
                  offset="0%"
                  style={{
                    stopColor: "var(--color-cyan-500)",
                  }}
                />
                <stop
                  offset="100%"
                  style={{
                    stopColor: "var(--color-purple-500)",
                  }}
                />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    // </div>
  );
};

export default Page;