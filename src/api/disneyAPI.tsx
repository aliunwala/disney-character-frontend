import axios, { AxiosResponse } from "axios";
import { CharacterProps } from "../definitions/character";

export async function filterCharacters(
  searchQuery: string
): Promise<AxiosResponse<any, any> | null> {
  try {
    const response = await axios({
      method: "GET",
      // url: "https://api.disneyapi.dev/character",
      url: `https://api.disneyapi.dev/character?name=${searchQuery}`,
      params: {
        page: 1,
        pageSize: 8,
      },
    });
    // console.log("filterCharacters response.data: ", response.data);
    return response.data;
  } catch (error) {
    console.log("Error in getting characters:", error, searchQuery);
    return null;
  }
}

export async function singleCharacter(
  charId: string
): Promise<AxiosResponse<any, any> | null> {
  try {
    const response = await axios({
      method: "GET",
      url: `https://api.disneyapi.dev/character/${charId}`,
    });
    // console.log("singleCharacter response.data: ", response.data);
    return response.data;
  } catch (error) {
    console.log("Error in getting single characters:", error, charId);
    return null;
  }
}
