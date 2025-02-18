import axios from "axios";

interface Coordinates {
  lat: number;
  lon: number;
}

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchDogIds = async (
  breeds?: string[],
  from: number = 0,
  size: number = 25,
  order: string = "asc",
  zip_codes?: string[]
) => {
  try {
    const params: Record<string, any> = { sort: `breed:${order}`, size, from };

    if (breeds) {
      params.breeds = breeds;
    }

    if (zip_codes) {
      params.zipCodes = zip_codes;
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

export const fetchLocations = async (body: {
  city?: string;
  states?: string[];
  geoBoundingBox?: {
    top?: Coordinates;
    left?: Coordinates;
    bottom?: Coordinates;
    right?: Coordinates;
    bottom_right?: Coordinates;
    top_left?: Coordinates;
  };
  size?: number;
  from?: number;
}) => {
  try {
    const response = await axios.post(`${API_URL}/locations/search`, body, {
      withCredentials: true,
    });

    const newSet = new Set<string>();
    response.data.results.filter((res: { zip_code: string }) =>
      newSet.add(res.zip_code)
    );
    const newArr: string[] = [...newSet];

    return newArr;
  } catch (error) {
    console.error("Failed", error);
  }
};
