"use client";

import React, { useState } from "react";
import {
  Search,
  MapPin,
  Thermometer,
  Wind,
  Cloud,
  Sun,
  Moon,
} from "lucide-react";

interface WeatherData {
  request: {
    type: string;
    query: string;
    language: string;
    unit: string;
  };
  location: {
    name: string;
    country: string;
    region: string;
    lat: string;
    lon: string;
    timezone_id: string;
    localtime: string;
    localtime_epoch: number;
    utc_offset: string;
  };
  current: {
    observation_time: string;
    temperature: number;
    weather_code: number;
    weather_icons: string[];
    weather_descriptions: string[];
    astro: {
      sunrise: string;
      sunset: string;
      moonrise: string;
      moonset: string;
      moon_phase: string;
      moon_illumination: number;
    };
    air_quality: {
      co: string;
      no2: string;
      o3: string;
      so2: string;
      pm2_5: string;
      pm10: string;
      "us-epa-index": string;
      "gb-defra-index": string;
    };
    wind_speed: number;
    wind_degree: number;
    wind_dir: string;
    pressure: number;
    precip: number;
    humidity: number;
    cloudcover: number;
    feelslike: number;
    uv_index: number;
    visibility: number;
  };
}

const WeatherApp: React.FC = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherData>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    if (!city.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `/api/weather?location=${encodeURIComponent(city)}`
      );
      const data = await res.json();
      // console.log(data);
      setWeatherData(data);
      console.log(weatherData);
    } catch (error) {
      console.error("Error fetching weather:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (dateTimeStr: string) => {
    const date = new Date(dateTimeStr);
    return date.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Weather Now
          </h1>
          <p className="text-xl text-blue-200">
            Real-time weather information at your fingertips
          </p>
        </div>

        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch(e)}
              placeholder="Enter city name..."
              className="w-full px-6 py-4 pl-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 text-white px-6 py-2 rounded-xl transition-all duration-300 font-semibold"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>

        {/* Weather Data */}
        {weatherData && (
          <div className="max-w-6xl mx-auto">
            {/* Main Weather Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 mb-8 shadow-2xl">
              <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                <div className="text-center md:text-left mb-6 md:mb-0">
                  <div className="flex items-center justify-center md:justify-start mb-2">
                    <MapPin className="text-blue-400 w-6 h-6 mr-2" />
                    <h2 className="text-3xl font-bold text-white">
                      {weatherData.location.name},{" "}
                      {weatherData.location.country}
                    </h2>
                  </div>
                  <p className="text-blue-200 text-lg">
                    {formatDateTime(weatherData.location.localtime)}
                  </p>
                </div>
                <div className="text-center">
                  <img
                    src={weatherData.current.weather_icons[0]}
                    alt={weatherData.current.weather_descriptions[0]}
                    className="w-20 h-20 mx-auto mb-2"
                  />
                  <p className="text-blue-200 text-lg font-medium">
                    {weatherData.current.weather_descriptions[0]}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="text-center md:text-left">
                  <div className="text-7xl font-bold text-white mb-2">
                    {weatherData.current.temperature}°C
                  </div>
                  <p className="text-2xl text-blue-200">
                    Feels like {weatherData.current.feelslike}°C
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 shadow-xl">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Thermometer className="w-6 h-6 mr-2 text-blue-400" />
                  Conditions
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-blue-200">Humidity</span>
                    <span className="text-white font-semibold">
                      {weatherData.current.humidity}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-200">Wind</span>
                    <span className="text-white font-semibold">
                      {weatherData.current.wind_speed} km/h{" "}
                      {weatherData.current.wind_dir}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-200">Pressure</span>
                    <span className="text-white font-semibold">
                      {weatherData.current.pressure} hPa
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-200">Visibility</span>
                    <span className="text-white font-semibold">
                      {weatherData.current.visibility} km
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-200">UV Index</span>
                    <span className="text-white font-semibold">
                      {weatherData.current.uv_index}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-200">Cloud Cover</span>
                    <span className="text-white font-semibold">
                      {weatherData.current.cloudcover}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-200">Precipitation</span>
                    <span className="text-white font-semibold">
                      {weatherData.current.precip} mm
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 shadow-xl">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Sun className="w-6 h-6 mr-2 text-yellow-400" />
                  Astronomy
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-blue-200 flex items-center">
                      <Sun className="w-4 h-4 mr-1" />
                      Sunrise
                    </span>
                    <span className="text-white font-semibold">
                      {weatherData.current.astro.sunrise}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-200 flex items-center">
                      <Sun className="w-4 h-4 mr-1" />
                      Sunset
                    </span>
                    <span className="text-white font-semibold">
                      {weatherData.current.astro.sunset}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-200 flex items-center">
                      <Moon className="w-4 h-4 mr-1" />
                      Moonrise
                    </span>
                    <span className="text-white font-semibold">
                      {weatherData.current.astro.moonrise}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-200 flex items-center">
                      <Moon className="w-4 h-4 mr-1" />
                      Moonset
                    </span>
                    <span className="text-white font-semibold">
                      {weatherData.current.astro.moonset}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-200">Moon Phase</span>
                    <span className="text-white font-semibold">
                      {weatherData.current.astro.moon_phase}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-200">Illumination</span>
                    <span className="text-white font-semibold">
                      {weatherData.current.astro.moon_illumination}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 shadow-xl">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Wind className="w-6 h-6 mr-2 text-green-400" />
                  Air Quality
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-blue-200">PM2.5</span>
                    <span className="text-white font-semibold">
                      {weatherData.current.air_quality.pm2_5} µg/m³
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-200">PM10</span>
                    <span className="text-white font-semibold">
                      {weatherData.current.air_quality.pm10} µg/m³
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-200">US EPA Index</span>
                    <span className="text-white font-semibold">
                      {weatherData.current.air_quality["us-epa-index"]}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-200">UK DEFRA Index</span>
                    <span className="text-white font-semibold">
                      {weatherData.current.air_quality["gb-defra-index"]}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {!weatherData && !loading && (
          <div className="text-center py-16">
            <Cloud className="w-24 h-24 text-white/40 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-2">
              Search for Weather
            </h3>
            <p className="text-blue-200 text-lg">
              Enter a city name to get started
            </p>
          </div>
        )}

        {error && (
          <div className="max-w-md mx-auto">
            <div className="bg-red-500/20 border border-red-500/30 rounded-2xl p-6 text-center">
              <p className="text-red-200">{error}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
