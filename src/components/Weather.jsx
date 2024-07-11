import React, { useState, useEffect } from "react";

const Weather = () => {
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Userning joylashuvini aniqlash
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    // Joylashuv aniqlangandan so'ng ob-havo ma'lumotlarini olish
    if (location.lat && location.lon) {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=metric&appid=b6f06d04fd6f7dede359be36f50e6f1b`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => setWeather(data))
        .catch((err) => setError(err.message));
    }
  }, [location]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!weather) {
    return <div>Loading...</div>;
  }

  return (
    <div className="hidden md:block">
      <p>{weather.name} {weather.main.temp} °C</p>
    </div>
  );
};

export default Weather;
