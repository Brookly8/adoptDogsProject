import { fetchMath } from "./dogsApi";

export const deleteBreed = (
  index: number,
  selectedBreeds: string[],
  setSelectedBreeds: React.Dispatch<React.SetStateAction<string[]>>,
  getDogIds: (
    breads: string[],
    order?: string,
    e?: React.FormEvent<HTMLFormElement>,
    zip_codes?: string[]
  ) => void,
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
    console.error("failed to load match" + error);
  }
};

export const toHome = (
  getDogIds: (
    breads: string[] | undefined,
    order?: string,
    e?: React.FormEvent<HTMLFormElement>,
    zip_codes?: string[]
  ) => void,
  setSelectedBreeds: React.Dispatch<React.SetStateAction<string[]>>,
  order: string
) => {
  getDogIds(undefined, order);
  setSelectedBreeds([]);
};

export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
