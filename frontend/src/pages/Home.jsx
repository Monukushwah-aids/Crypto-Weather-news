import React, { useRef, useState } from "react";
import { Link } from "react-router-dom"
import video from '../Images/video.mp4'

const HomePage = () => {
  const [activeButton, setActiveButton] = useState(null);
  
  

  return (
    <div class="main">
            <div class="overlay"></div>
            <video className="object-fill" src={video} autoPlay loop muted/>
           
      <nav className="w-full flex justify-between items-center px-8 py-4 bg-gray-800 shadow-lg fixed top-0 left-0 z-20">
     
        <h1 className="text-2xl font-bold text-white ">Crypto Weahter News</h1>
        
        <div>
         
        </div>
      </nav>
      {/* Buttons Positioned Above Images */}
<div className=" top-40 fixed right-20 flex flex-col z-10 border-1 border-b-gray-50 ">
  {[{ name: "Weather", path: "/weather" }, { name: "Cryptocurrency", path: "/crypto" }, { name: "Crypto News", path: "/cryptonews" }].map((btn, index) => (
    <Link to={btn.path} key={index}>
      <button
        onClick={() => setActiveButton(btn.name)}
        className={`w-full px-16 py-3  font-light border border-gray-50 transition-colors duration-200 hover:bg-amber-50 hover:text-black ${
          activeButton === btn.name ? "bg-gray-50 text-black" : "bg-transparent text-white"
        }`}
      >
        {btn.name}
      </button>
    </Link>
  ))}
</div>
      
      
      
       {/* Footer */}
       <footer className="w-full fixed bottom-0 left-0 flex justify-between items-center px-8 py-4 bg-gray-800 text-white text-sm">
        {/* Language Selection */}
        <div>
          <select className="p-2 bg-gray-700 text-white rounded">
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
          </select>
        </div>
        {/* Privacy Policy */}
        <div>
          <p className="cursor-pointer hover:underline">Privacy Policy</p>
        </div>
      </footer>
    </div>

    
  );
};

export default HomePage;
