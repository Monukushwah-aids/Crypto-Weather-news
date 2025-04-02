import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";

export default function SearchBox({ updateInfo }) {
  const [city, setCity] = useState("");
  const [error, setError] = useState(false);

  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "f30733be83befad2116db66f769a02b6";

  const getWeatherInfo = async () => {
    try {
      const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
      if (!response.ok) throw new Error("City not found");

      const jsonResponse = await response.json();
      return {
        city: city,
        temp: jsonResponse.main.temp,
        temp_min: jsonResponse.main.temp_min,
        temp_max: jsonResponse.main.temp_max,
        humidity: jsonResponse.main.humidity,
        feelsLike: jsonResponse.main.feels_like, // Fixed typo (was `feelsLike`)
        weather: jsonResponse.weather[0].description,
      };
    } catch (err) {
      setError(true);
      return null;
    }
  };

  const handleChange = (evt) => {
    setCity(evt.target.value);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setError(false); // Reset error state

    if (!city.trim()) return; // Prevent empty submissions
    const newInfo = await getWeatherInfo();
    if (newInfo) updateInfo(newInfo);
    setCity("");
  };

  return (
    <div className="flex flex-col items-center mt-6 ">
      <form onSubmit={handleSubmit} className="bg-white  p-6 rounded-lg shadow-md w-80">
        <TextField
          id="city"
          label="Enter City Name"
          variant="outlined"
          required
          value={city}
          onChange={handleChange}
          className="w-full mb-4"
        />
        <Button variant="contained" type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          Search
        </Button>
        {error && <p className="text-red-500 mt-2 text-sm">No such place exists!</p>}
      </form>
    </div>
  );
}
