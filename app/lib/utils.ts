import { fetchMath } from "./dogsApi";

export const deleteBreed = (
  index: number,
  selectedBreeds: string[],
  setSelectedBreeds: React.Dispatch<React.SetStateAction<string[]>>,
  getDogIds: Function,
  order: string
) => {
  const filteredSelectedBreeds = selectedBreeds.filter(
    (_, idx) => index !== idx
  );

  setSelectedBreeds(filteredSelectedBreeds);
  getDogIds(filteredSelectedBreeds, order);
};

export const showMatchedDog = async (
  favorites: string[],
  setBody: React.Dispatch<React.SetStateAction<string[]>>
) => {
  try {
    const response = await fetchMath(favorites);
    setBody([response?.data.match]);
  } catch (error) {
    console.error("failed to load match");
  }
};

export const toHome = (
  getDogIds: Function,
  setSelectedBreeds: React.Dispatch<React.SetStateAction<string[]>>,
  order: string
) => {
  getDogIds(undefined, order);
  setSelectedBreeds([]);
};

export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
