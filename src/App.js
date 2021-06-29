import React, {useState, useEffect} from 'react';
import { useMediaQuery } from 'react-responsive'
import './static/styles/App.css';
import Routes from './Routes';
import NavB from './NavB';
import WeatherApi from './WeatherApi';
import WeatherBar from './WeatherBar';
import Attributions from './Attributions';
import LocationForm from './LocationForm';

function App() {

  const defaultLocation = {zipCode: "91945", country: "US"};
  const defaultLongLat = [-117.0326, 32.7332];
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [location, setLocation] = useState(JSON.parse(localStorage.getItem("location"))
                                      || defaultLocation);
  const [units, setUnits] = useState(localStorage.getItem("units") || "i");
  const [weather, setWeather] = useState();
  const [longLat, setLongLat] = useState(JSON.parse(localStorage.getItem("longLat"))
                                      || defaultLongLat);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  useEffect(() => {
    /** Gets weather from weatherbit API 
     * and updates latitude and longitude data
     */
    async function getWeather() {
        try {
            const w = await WeatherApi.getWeather(location, units);
            setWeather(w);
            const newLongLat = [parseFloat(w.data.lon), parseFloat(w.data.lat)];
            setLongLat(newLongLat);
            localStorage.setItem("longLat", JSON.stringify([w.data.lon, w.data.lat]));
        } catch (e) {
            setWeather('API error');
        };
    };
    getWeather();
  }, [location, units, setWeather, setLongLat]);

  /** Sets state and local storage with current user data, 
   * or removes data from both when logging out
   */
  function updateCurrentUser(name, token, location, units) {
    setUsername(name);
    if (name === '') {
      setLocation(defaultLocation);
      setUnits('i');
      localStorage.removeItem("username");
      localStorage.removeItem("token");
      localStorage.removeItem("location");
      localStorage.removeItem("units");
    } else {
      setLocation(location);
      setUnits(units);
      localStorage.setItem("username", name);
      localStorage.setItem("token", token);
      localStorage.setItem("location", JSON.stringify(location));
      localStorage.setItem("units", units)
    };
  };

  /** Changes location in state and local storage.
   * Used for searching weather in locations different from user's 
   * saved location, or for not logged in users
   */
  function updateLocation(location) {
    setLocation(location);
    localStorage.setItem("location", JSON.stringify(location));
  };

  return (
    <div className="App">
      <NavB username={username}
            isMobile={isMobile} />
      <WeatherBar location={location}
                  weather={weather}
                  isMobile={isMobile} />
      <LocationForm location={location}
                    updateLocation={updateLocation} />
      <Routes username={username} 
              updateCurrentUser={updateCurrentUser}
              weather={weather}
              longLat={longLat}
              units={units}
              setWeather={setWeather} />
      <Attributions />
    </div>
  );
};

export default App;
