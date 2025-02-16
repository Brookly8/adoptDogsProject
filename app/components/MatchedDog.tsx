import React from "react";

export default function MatchedDog({
  dog,
}: {
  dog: {
    name: string;
    zip_code: string;
    img: string;
    age: string;
    breed: string;
    id: string;
  };
}) {
  return (
    <div key={dog.id} className="">
      <img src={dog.img} alt="DogPicture" className="w-[90%] h-[60%]" />
      <div className="flex gap-6 justify-center p-5">
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
}
