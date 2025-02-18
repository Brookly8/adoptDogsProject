"use client";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useState, useEffect } from "react";

const containerStyle = {
  width: "100%",
  height: "100%",
};

export default function GoogleMapComponent() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [clickedLocation, setClickedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  // Get the user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      {currentLocation && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentLocation} // Start at the user's location
          zoom={14}
          onClick={(event) =>
            setClickedLocation({
              lat: event.latLng?.lat() || 0,
              lng: event.latLng?.lng() || 0,
            })
          }
        >
          {/* Marker for clicked location */}
          {clickedLocation && <Marker position={clickedLocation} label="" />}
        </GoogleMap>
      )}

      {/* Display selected location */}
      <div className="mt-4 text-center text-black">
        {clickedLocation && (
          <p>
            Selected Location: Lat: {clickedLocation.lat}, Lng:{" "}
            {clickedLocation.lng}
          </p>
        )}
      </div>
    </LoadScript>
  );
}
