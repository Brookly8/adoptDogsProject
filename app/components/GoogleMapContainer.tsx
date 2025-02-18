import React from "react";
import GoogleMapComponent from "./GoogleMapComponent";

export default function GoogleMapContainer({
  setLocation,
  getLocation,
  setCoordinates,
  isMapOpened,
  coordinates,
  location,
}: {
  isMapOpened: boolean;
  setLocation: React.Dispatch<
    React.SetStateAction<{ city: string; state: string }>
  >;
  getLocation: (
    location?: { city: string; state: string },
    coordinats?: {
      top_left: { lat: number; lon: number };
      bottom_right: { lat: number; lon: number };
    }
  ) => void;
  location: { city: string; state: string };
  coordinates: {
    top_left: { lat: number; lon: number };
    bottom_right: { lat: number; lon: number };
  };
  setCoordinates: React.Dispatch<
    React.SetStateAction<{
      top_left: { lat: number; lon: number };
      bottom_right: { lat: number; lon: number };
    }>
  >;
}) {
  return (
    <div
      className={`text-white  transition-[height] duration-300 rounded ${
        isMapOpened
          ? "w-[100%] bg-white h-[800px] p-3 flex flex-col"
          : "w-0 h-0"
      }`}
    >
      <p className="text-black text-center mb-2 font-semibold">
        Click on the map to select buttom right and top left points to get
        coordinates
      </p>
      <GoogleMapComponent />
      <div
        className={`flex flex-col gap-6 items-center justify-center ${
          !isMapOpened && "hidden"
        }`}
      >
        <div className="text-black flex flex-col items-center gap-3">
          <p>Find by Location</p>
          <input
            onChange={(e) =>
              setLocation((prev) => ({ ...prev, city: e.target.value }))
            }
            className=" p-1 border border-black rounded"
            type="text"
            placeholder="city"
          />
        </div>
        <div className="text-black flex flex-col gap-3 items-center">
          <p>Find by Coordinates</p>
          <div>
            <p>Top Left:</p>
            <div className="flex gap-3">
              <input
                onChange={(e) =>
                  setCoordinates((prev) => ({
                    ...prev,
                    top_left: { ...prev.top_left, lat: Number(e.target.value) },
                  }))
                }
                className=" p-1 border border-black rounded"
                type="text"
                placeholder="Lat"
              />
              <input
                onChange={(e) =>
                  setCoordinates((prev) => ({
                    ...prev,
                    top_left: { ...prev.top_left, lon: Number(e.target.value) },
                  }))
                }
                className=" p-1 border border-black rounded"
                type="text"
                placeholder="Lng"
              />
            </div>
          </div>

          <div>
            <p>Bottom Right:</p>
            <div className="flex gap-3">
              <input
                onChange={(e) =>
                  setCoordinates((prev) => ({
                    ...prev,
                    bottom_right: {
                      ...prev.bottom_right,
                      lat: Number(e.target.value),
                    },
                  }))
                }
                className=" p-1 border border-black rounded"
                type="text"
                placeholder="Lat"
              />
              <input
                onChange={(e) =>
                  setCoordinates((prev) => ({
                    ...prev,
                    bottom_right: {
                      ...prev.bottom_right,
                      lon: Number(e.target.value),
                    },
                  }))
                }
                className=" p-1 border border-black rounded"
                type="text"
                placeholder="Lng"
              />
            </div>
          </div>
          <button
            onClick={() => getLocation(location, coordinates)}
            className="bg-yellow-500 text-black px-4 py-2 rounded 
              font-semibold hover:bg-yellow-400 transition duration-300 w-[50%]"
          >
            Find
          </button>
        </div>
      </div>
    </div>
  );
}
