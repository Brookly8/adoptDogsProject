import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchDogIds = async (
  breeds?: string[],
  from: number = 0,
  size: number = 25,
  order: string = "asc"
) => {
  try {
    const params: Record<string, any> = { sort: `breed:${order}`, size, from };

    if (breeds) {
      params.breeds = breeds;
    }

    const { data } = await axios(`${API_URL}/dogs/search`, {
      params,
      withCredentials: true,
    });

    return {
      resultIds: data.resultIds,
      total: data.total,
    };
  } catch (error) {
    console.error("Error fetching dog IDs:", error);
    return { resultIds: [], nextFrom: null, prevFrom: null, total: 0 };
  }
};

export const fetchDogs = async (body: string[]) => {
  try {
    const { data } = await axios.post(`${API_URL}/dogs`, body, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    console.error("Error fetching dogs:", error);
    return [];
  }
};

export const fetchDogBreeds = async () => {
  try {
    const { data } = await axios(`${API_URL}/dogs/breeds`, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    console.error("error fetching breeds:", error);
    return [];
  }
};

export const fetchMath = async (dogsIds: string[]) => {
  try {
    const response = await axios.post(`${API_URL}/dogs/match`, dogsIds, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error("Failed to load math", error);
  }
};
