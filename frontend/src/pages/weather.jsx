import { useState } from "react";
import InfoBox from "../services/infobox";
import SearchBox from "../components/searchbox";

export default function WeatherApp() {
  let [WeatherInfo, setWeatherInfo] = useState({
    city: "Wonderland",
    feelsLike: 24.08,
    temp: 25.05,
    temp_min: 25.05,
    temp_max: 25.05,
    humidity: 47,
    weather: "haze",
  });

  let updateInfo = (newInfo) => {
    setWeatherInfo(newInfo);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r bg-gray-900  text-white p-6">
      <h2 className="text-3xl font-bold mb-6">Weather App</h2>

      <div className="w-full max-w-md bg-white text-black rounded-2xl shadow-lg p-6">
        <SearchBox updateInfo={updateInfo} />
        <InfoBox info={WeatherInfo} />
      </div>
    </div>
  );
}
