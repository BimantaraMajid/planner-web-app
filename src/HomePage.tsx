import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Button from "./button";

function HomePage() {
  const [count, setCount] = useState(0);

  return (
    <div className="font-inter m-0 flex items-center justify-center min-w-[320px] min-h-screen antialiased">
      <div className="block max-w-[1280px] m-auto p-8 text-center">
        <div className="flex justify-center">
          <a href="https://vitejs.dev" target="_blank" className="p-[1.6em]">
            <img
              src={viteLogo}
              className="h-[6em] w-auto transition hover:drop-shadow-[0_0_2em_rgba(100,108,255,0.67)] "
              alt="Vite logo"
            />
          </a>
          <a href="https://react.dev" target="_blank" className="p-[1.6em]">
            <img
              src={reactLogo}
              className="animate-logo-spin h-[6em] w-auto"
              alt="React logo"
            />
          </a>
        </div>
        <h1 className="block text-[3.2em] leading-[1.1] my-[0.67em] mx-0 font-bold text-blue-213547">
          Vite + React
        </h1>
        <div className="block p-[2em]">
          <Button onClick={() => setCount((count) => count + 1)}>
            Click me
          </Button>
          <p className="block mx-0 my-[1em] text-[#d62626]">count is {count}</p>
        </div>
        <p className="block my-[1em] mx-0 text-gray-888">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </div>
  );
}
export default HomePage;
