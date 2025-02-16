import { useState, useEffect } from "react";
import { fetchDogIds, fetchDogs, fetchDogBreeds } from "../lib/dogsApi";
import { useRouter } from "next/navigation";

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
  const [dogs, setDogs] = useState([
    { name: "", zip_code: "", img: "", age: "", breed: "", id: "" },
  ]);

  const router = useRouter();
  const pageSize = 25;

  const getDogIds = async (
    breads: string[] = [],
    order?: string,
    e?: React.FormEvent<HTMLFormElement>
  ) => {
    e?.preventDefault();
    try {
      const { resultIds, total } = await fetchDogIds(
        breads ? breads : selectedBreeds,
        undefined,
        undefined,
        order
      );
      if (resultIds.length > 0) {
        setBody(resultIds);
        setFrom(0);
        setTotal(total);
        setCurrentPage(1);
      } else {
        setError("No dog IDs found");
        router.push("/login");
      }
    } catch (error) {
      setError("Failed to fetch dog IDs");
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
        setError("Failed to fetch dogs breeds");
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
    getDogIds(selectedBreeds, order);
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
    } catch (err) {
      setError("Failed to fetch dogs.");
    }
  };

  const loadNextPage = async () => {
    const newFrom = from + pageSize;
    if (newFrom < total) {
      try {
        const { resultIds } = await fetchDogIds(selectedBreeds, newFrom);
        if (resultIds.length > 0) {
          setBody(resultIds);
          setFrom(newFrom);
          setCurrentPage((prev) => prev + 1);
        } else {
          setError("No more dogs available.");
        }
      } catch (err) {
        setError("Failed to load more dogs.");
      }
    }
  };

  const loadPrevPage = async () => {
    if (from > 0) {
      const newFrom = Math.max(from - pageSize, 0);
      try {
        const { resultIds } = await fetchDogIds(selectedBreeds, newFrom);
        if (resultIds.length > 0) {
          setBody(resultIds);
          setFrom(newFrom);
          setCurrentPage((prev) => prev - 1);
        } else {
          setError("No previous page available.");
        }
      } catch (err) {
        setError("Failed to load previous page.");
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
    setSelectedBreeds,
    getDogIds,
    toggleFavorite,
    loadNextPage,
    loadPrevPage,
    setBody,
    setOrder,
  };
}
