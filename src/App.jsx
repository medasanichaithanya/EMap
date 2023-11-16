import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const App = () => {
  const itTechParkLocation = { lat: 12.975521, lng: 80.220209 };
  const [userLocation, setUserLocation] = useState(null);
  const [directions, setDirections] = useState(null);

  const calculateDistance = () => {
    if (!userLocation) {
      alert('Please enter user location first.');
      return;
    }

    const directionsOptions = {
      destination: itTechParkLocation,
      origin: userLocation,
      travelMode: 'DRIVING',
    };

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(directionsOptions, (result, status) => {
      if (status === 'OK') {
        setDirections(result);
      } else {
        console.error(`Directions request failed due to ${status}`);
        alert('Unable to fetch directions. Please try again.');
      }
    });
  };

  const appStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '20px',
    backgroundColor: '#f4f4f4',
    margin: 0,  // Remove default margin
    fontFamily: 'Arial, sans-serif',  // Example font style
  };
  
  const mapContainerStyles = {
    height: '60vh',
    width: '100%',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
  };
  
  const labelStyles = {
    marginBottom: '10px',
  };
  return (
    <div style={appStyles}>
      <h1>IT Tech Park, Chennai</h1>
      {itTechParkLocation && (
        <LoadScript googleMapsApiKey="">
          <GoogleMap
            mapContainerStyle={mapContainerStyles}
            zoom={15}
            center={itTechParkLocation}
          >
            <Marker position={itTechParkLocation} />
            {userLocation && <Marker position={userLocation} />}
            {directions && <DirectionsRenderer directions={directions} />}
          </GoogleMap>
        </LoadScript>
      )}
        <label style={labelStyles}>
    Enter User Location (Lat, Lng):
    <input
      type="text"
      onChange={(e) => {
        const [lat, lng] = e.target.value.split(',').map(coord => parseFloat(coord.trim()));

        // Check if lat and lng are valid numbers
        if (!isNaN(lat) && !isNaN(lng)) {
          setUserLocation({ lat, lng });
        } else {
          alert('Invalid coordinates. Please enter valid numbers.');
        }
      }}
      placeholder="Enter coordinates (e.g., 12.3456, 78.9101)"
    />
  </label>
      <button onClick={calculateDistance}>Calculate Distance</button>
    </div>
  );
};

export default App;
