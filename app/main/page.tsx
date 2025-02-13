"use client";
import React, { useEffect, useState } from "react";
import { fetchDogBreeds, fetchDogIds, fetchDogs } from "../lib/dogsApi";
import Image from "next/image";

export default function Main() {
  const [body, setBody] = useState<string[]>([]);
  const [order, setOrder] = useState<string>("asc");
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [from, setFrom] = useState(0);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [dogs, setDogs] = useState([
    { name: "", zip_code: "", img: "", age: "", breed: "" },
  ]);
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

  const deleteBreed = (index: number) => {
    const filteredSelectedBreeds = selectedBreeds.filter(
      (_, idx) => index !== idx
    );

    setSelectedBreeds(filteredSelectedBreeds);
    getDogIds(filteredSelectedBreeds, order);
  };

  const toHome = () => {
    getDogIds(undefined, order);
    setSelectedBreeds([]);
  };
  console.log(Number(from) + Number(pageSize));
  console.log("total----", total);

  return (
    <div>
      <div className="flex items-center justify-between h-[20vh] bg-slate-400 mb-5">
        <Image
          src={"/favicon.png"}
          alt="Logo"
          width={70}
          height={70}
          onClick={toHome}
          className="hover:cursor-pointer"
        />
        <select name="" id="" onChange={(e) => setOrder(e.target.value)}>
          <option value="asc">asc</option>
          <option value="desc">desc</option>
        </select>
        <form
          action=""
          className="flex gap-6"
          onSubmit={(e) => getDogIds(selectedBreeds, undefined, e)}
        >
          {selectedBreeds.length > 0 &&
            selectedBreeds.map((breed, index) => {
              return (
                <div
                  key={index}
                  className="bg-gray-300 flex items-center gap-2 p-1 rounded-full text-gray-500"
                >
                  <p>{breed}</p>
                  <div className="bg-white w-4 h-4 rounded-full flex justify-center items-center">
                    <button
                      className="text-red-500"
                      onClick={() => deleteBreed(index)}
                    >
                      x
                    </button>
                  </div>
                </div>
              );
            })}
          <select
            onChange={(e) => {
              setSelectedBreeds([...selectedBreeds, e.target.value]);
            }}
            name="breeds list"
            className="px-2 py-1 rounded"
          >
            {breeds.map((breed) => {
              return (
                <option key={breed} value={breed}>
                  {breed}
                </option>
              );
            })}
          </select>
          <button
            className="bg-black text-white rounded px-2 py-1"
            type="submit"
          >
            Find
          </button>
        </form>
      </div>
      {error && <p className="text-red-600 text-center">{error}</p>}
      <div className="grid grid-cols-5 gap-4">
        {dogs.length > 1
          ? dogs.map((dog, index) => {
              return (
                <div
                  key={index}
                  className="rounded p-3 flex flex-col items-center gap-3 bg-slate-300"
                >
                  <img
                    src={dog.img}
                    alt="DogPicture"
                    className="w-[90%] h-[60%]"
                  />
                  <div className="flex gap-6">
                    <div className="flex flex-col items-end">
                      <p>Age:</p>
                      <p>Breed:</p>
                      <p>Name:</p>
                      <p>Zip:</p>
                    </div>
                    <div className="flex flex-col items-start">
                      <p className="font-semibold">{dog.age}</p>
                      <p className="font-semibold">{dog.breed}</p>
                      <p className="font-semibold">{dog.name}</p>
                      <p className="font-semibold">{dog.zip_code}</p>
                    </div>
                  </div>
                </div>
              );
            })
          : !error && (
              <p className="text-gray-600 text-center">No dogs found</p>
            )}
      </div>
      <div className="flex justify-center mt-4 items-center gap-4">
        <button
          onClick={loadPrevPage}
          disabled={from === 0}
          className={`px-4 py-2 rounded ${
            from === 0 ? "bg-gray-400" : "bg-blue-500 text-white"
          }`}
        >
          Prev
        </button>

        <p className="text-lg font-semibold">{currentPage}</p>

        <button
          onClick={loadNextPage}
          disabled={from + pageSize >= total}
          className={`px-4 py-2 rounded ${
            from + pageSize >= total ? "bg-gray-400" : "bg-blue-500 text-white"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
