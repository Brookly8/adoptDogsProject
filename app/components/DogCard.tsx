import React from "react";

interface DogCardProps {
  dog: {
    name: string;
    zip_code: string;
    img: string;
    age: string;
    breed: string;
    id: string;
  };
  favorites: string[];
  toggleFavorite: (id: string) => void;
}

export default function DogCard({
  dog,
  favorites,
  toggleFavorite,
}: DogCardProps) {
  return (
    <div className="rounded p-3 flex flex-col items-center gap-3 bg-white">
      <img
        src={dog.img}
        alt="DogPicture"
        className="w-[90%] h-[60%]  rounded"
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
      <button
        className={`mt-2 px-3 py-1 rounded border border-black h-[50px] ${
          favorites.includes(dog.id)
            ? "bg-red-500 text-white overflow-auto"
            : "bg-white text-black"
        }`}
        onClick={() => toggleFavorite(dog.id)}
      >
        {favorites.includes(dog.id)
          ? "Remove Favorite 🥺"
          : "Add to Favorites ❤️"}
      </button>
    </div>
  );
}
