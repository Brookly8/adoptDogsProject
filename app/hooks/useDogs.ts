import { useState, useEffect } from "react";
import { fetchDogIds, fetchDogs, fetchDogBreeds } from "../lib/dogsApi";
import { scrollToTop } from "../lib/utils";

export default function useDogs() {
  const [body, setBody] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [order, setOrder] = useState<string>("asc");
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [breeds, setBreeds] = useState<string[]>([]);
  const [from, setFrom] = useState(0);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [zipCodes, setZipCodes] = useState<string[] | undefined>();
  const [dogs, setDogs] = useState([
    { name: "", zip_code: "", img: "", age: "", breed: "", id: "" },
  ]);

  const pageSize = 25;

  const getDogIds = async (
    breads: string[] = [],
    order?: string,
    e?: React.FormEvent<HTMLFormElement>,
    zip_codes?: string[]
  ) => {
    e?.preventDefault();
    try {
      const { resultIds, total } = await fetchDogIds(
        breads ? breads : selectedBreeds,
        undefined,
        undefined,
        order,
        zip_codes
      );

      if (resultIds.length > 0) {
        setBody(resultIds);
        setFrom(0);
        setTotal(total);
        setCurrentPage(1);
      } else {
        setError("No dog IDs found");
      }
    } catch (error) {
      setError("Failed to fetch dog IDs" + error);
    }
  };

  useEffect(() => {
    const getDogBreeds = async () => {
      try {
        const breeds = await fetchDogBreeds();
        if (breeds.length > 0) {
          setBreeds(breeds);
        } else {
          setError("No dogs breeds found");
        }
      } catch (error) {
        setError("Failed to fetch dogs breeds" + error);
      }
    };

    getDogIds();
    getDogBreeds();
  }, []);

  useEffect(() => {
    if (body.length > 0) {
      searchDogs(body);
    }
  }, [body]);

  useEffect(() => {
    getDogIds(selectedBreeds, order, undefined, zipCodes);
  }, [order]);

  const searchDogs = async (ids: string[]) => {
    try {
      const dogData = await fetchDogs(ids);
      if (dogData.length === 0) {
        setError("No dogs found.");
      } else {
        setDogs(dogData);
        setError(null);
      }
    } catch (error) {
      setError("Failed to fetch dogs." + error);
    }
  };

  const loadNextPage = async () => {
    const newFrom = from + pageSize;
    if (newFrom < total) {
      try {
        const { resultIds } = await fetchDogIds(
          selectedBreeds,
          newFrom,
          undefined,
          order,
          zipCodes
        );
        if (resultIds.length > 0) {
          setBody(resultIds);
          setFrom(newFrom);
          setCurrentPage((prev) => prev + 1);
          scrollToTop();
        } else {
          setError("No more dogs available.");
        }
      } catch (error) {
        setError("Failed to load more dogs." + error);
      }
    }
  };

  const loadPrevPage = async () => {
    if (from > 0) {
      const newFrom = Math.max(from - pageSize, 0);
      try {
        const { resultIds } = await fetchDogIds(
          selectedBreeds,
          newFrom,
          undefined,
          order,
          zipCodes
        );
        if (resultIds.length > 0) {
          setBody(resultIds);
          setFrom(newFrom);
          setCurrentPage((prev) => prev - 1);
          scrollToTop();
        } else {
          setError("No previous page available.");
        }
      } catch (error) {
        setError("Failed to load previous page." + error);
      }
    }
  };

  const toggleFavorite = (dogId: string) => {
    setFavorites((prev) =>
      prev.includes(dogId)
        ? prev.filter((id) => id !== dogId)
        : [...prev, dogId]
    );
  };

  return {
    dogs,
    body,
    favorites,
    order,
    selectedBreeds,
    breeds,
    error,
    from,
    total,
    currentPage,
    pageSize,
    zipCodes,
    setZipCodes,
    setSelectedBreeds,
    getDogIds,
    toggleFavorite,
    loadNextPage,
    loadPrevPage,
    setBody,
    setOrder,
  };
}
