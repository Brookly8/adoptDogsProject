"use client";
import { deleteBreed, showMatchedDog, toHome } from "./lib/utils";
import DogCard from "./components/DogCard";
import useDogs from "./hooks/useDogs";
import Container from "./components/Container";
import useMap from "./hooks/useMap";
import GoogleMapContainer from "./components/GoogleMapContainer";
import { useRouter } from "next/navigation";

export default function Main() {
  const {
    dogs,
    favorites,
    order,
    selectedBreeds,
    pageSize,
    error,
    breeds,
    from,
    total,
    currentPage,
    setZipCodes,
    setBody,
    setOrder,
    getDogIds,
    setSelectedBreeds,
    toggleFavorite,
    loadNextPage,
    loadPrevPage,
  } = useDogs();

  const {
    setIsMapOpened,
    isMapOpened,
    setLocation,
    getLocation,
    location,
    coordinates,
    setCoordinates,
  } = useMap(getDogIds, setZipCodes, selectedBreeds, order);

  const router = useRouter();

  return (
    <Container>
      <div
        className="flex flex-col md:flex-row items-center justify-between 
      h-auto md:h-[20vh] bg-white text-black p-4 rounded-lg shadow-lg"
      >
        <div className="flex gap-3">
          <div className="bg-black p-3 rounded-full h-[90px] lg:h-[120px]  md:h-[90px] flex justify-center items-center">
            <img
              src="/favicon.png"
              alt="Logo"
              className="w-16 md:w-24 h-16 md:h-24 hover:cursor-pointer"
              onClick={() => toHome(getDogIds, setSelectedBreeds, order)}
            />
          </div>

          <div className="flex flex-col justify-center items-center  gap-3">
            <div className="mt-4 mb-4 md:mt-0">
              <select
                className=" text-black border border-black px-3 py-2 rounded focus:outline-none"
                onChange={(e) => setOrder(e.target.value)}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>

            <div className="mt-4 md:mt-0">
              <button
                className="bg-yellow-500 text-black px-4 py-2 rounded font-semibold hover:bg-yellow-400 transition duration-300"
                onClick={() => setIsMapOpened((prev) => !prev)}
              >
                Find by location
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3  h-[16vh] w-[50%] md:items-start overflow-hidden px-3 md:justify-center">
          {selectedBreeds.length > 0 &&
            selectedBreeds.map((breed, index) => (
              <div
                key={index}
                className="bg-yellow-500 flex items-center gap-2 p-2 rounded-full text-black"
              >
                <p className="break-words whitespace-normal">{breed}</p>
                <div className="bg-white w-6 h-6 rounded-full flex justify-center items-center">
                  <button
                    className="text-white text-sm"
                    onClick={() =>
                      deleteBreed(
                        index,
                        selectedBreeds,
                        setSelectedBreeds,
                        getDogIds,
                        order
                      )
                    }
                  >
                    ✖
                  </button>
                </div>
              </div>
            ))}
        </div>

        <div className="flex flex-wrap flex-col justify-center gap-4 items-end mt-4 md:mt-0">
          <button
            className="bg-yellow-500 text-black px-4 py-2 rounded font-semibold hover:bg-yellow-400 transition duration-300"
            onClick={() => router.push("/login")}
          >
            Login
          </button>{" "}
          <form
            action=""
            className="flex flex-wrap flex-col justify-center gap-4 items-end mt-4 md:mt-0"
            onSubmit={(e) => getDogIds(selectedBreeds, undefined, e)}
          >
            <select
              onChange={(e) => {
                setSelectedBreeds((prev) =>
                  !prev.includes(e.target.value)
                    ? [...selectedBreeds, e.target.value]
                    : [...selectedBreeds]
                );
              }}
              className="bg-white text-black border border-gold px-3 py-2 rounded"
            >
              {breeds.map((breed) => (
                <option key={breed} value={breed}>
                  {breed}
                </option>
              ))}
            </select>

            <button
              className="bg-yellow-500 text-black px-4 py-2 rounded font-semibold hover:bg-yellow-400 transition duration-300"
              type="submit"
            >
              Find
            </button>
          </form>
        </div>
      </div>

      <div className="mt-4 md:mt-5 text-center">
        <button
          onClick={() => showMatchedDog(favorites, setBody)}
          className={`bg-yellow-500 text-black px-4 py-2 rounded font-semibold
                 hover:bg-yellow-400 transition duration-300 ${
                   favorites.length < 1 && "hidden"
                 }`}
        >
          Show Matched Dog
        </button>
      </div>

      <GoogleMapContainer
        isMapOpened={isMapOpened}
        setLocation={setLocation}
        getLocation={getLocation}
        location={location}
        coordinates={coordinates}
        setCoordinates={setCoordinates}
      />

      {error && <p className="text-red-600 text-center mt-4">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-6">
        {dogs[0].name !== ""
          ? dogs.map((dog) => (
              <DogCard
                key={dog.id}
                dog={dog}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            ))
          : ""}
      </div>

      <div className="flex justify-center mt-6 items-center gap-6">
        <button
          onClick={loadPrevPage}
          disabled={from === 0}
          className={`px-5 py-3 rounded font-semibold ${
            from === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-yellow-500 text-black hover:bg-yellow-400 transition duration-300"
          }`}
        >
          Prev
        </button>

        <p className="text-xl font-semibold text-white">{currentPage}</p>

        <button
          onClick={loadNextPage}
          disabled={from + pageSize >= total}
          className={`px-5 py-3 rounded font-semibold ${
            from + pageSize >= total
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-yellow-500 text-black hover:bg-yellow-400 transition duration-300"
          }`}
        >
          Next
        </button>
      </div>
    </Container>
  );
}
