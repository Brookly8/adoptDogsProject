import { useState } from "react";
import { fetchLocations } from "../lib/dogsApi";

export default function useMap(
  getDogIds: (
    breads: string[],
    order?: string,
    e?: React.FormEvent<HTMLFormElement>,
    zip_codes?: string[]
  ) => void,
  setZipCodes: React.Dispatch<React.SetStateAction<string[] | undefined>>,
  selectedBreeds: string[],
  order: string
) {
  const [isMapOpened, setIsMapOpened] = useState(false);
  const [location, setLocation] = useState({ city: "", state: "" });
  const [coordinates, setCoordinates] = useState({
    top_left: { lat: 0, lon: 0 },
    bottom_right: { lat: 0, lon: 0 },
  });

  const getLocation = async (
    location?: { city: string; state: string },
    coordinates?: {
      top_left: { lat: number; lon: number };
      bottom_right: { lat: number; lon: number };
    }
  ) => {
    try {
      if (coordinates?.top_left.lat === 0) {
        coordinates = undefined;
      }
      const zipCodes = await fetchLocations({
        city: location?.city,
        geoBoundingBox: coordinates && {
          top_left: {
            lat: coordinates.top_left.lat,
            lon: coordinates.top_left.lon,
          },
          bottom_right: {
            lat: coordinates.bottom_right.lat,
            lon: coordinates.bottom_right.lon,
          },
        },
        size: 100,
        from: 25,
      });

      setZipCodes(zipCodes);
      getDogIds(selectedBreeds, order, undefined, zipCodes);
      setIsMapOpened(false);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    isMapOpened,
    location,
    coordinates,
    setLocation,
    setIsMapOpened,
    getLocation,
    setCoordinates,
  };
}
