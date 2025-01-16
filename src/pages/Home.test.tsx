import { prettyDOM, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React, { useState } from "react";
import "@testing-library/jest-dom";
import Home from "./Home";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
// import Results from "./UpdateProfile";

// MOCKED DATA
// const userState = {
//   firstName: "John",
//   lastName: "Doe",
//   favoriteCharacter: "Elsa",
//   favoriteRide: "Space Mountain",
//   favoriteMovie: "Moana",
//   favoritePark: "Disney World, Florida",
//   dob: "1980-01-01",
//   city: "San Francisco",
//   state: "California",
// };
// const setUserState = () => {};
let characters = [
  {
    _id: 112,
    films: ["Hercules (film)"],
    shortFilms: [],
    tvShows: ["Hercules (TV series)"],
    videoGames: ["Kingdom Hearts III"],
    parkAttractions: [],
    allies: [],
    enemies: [],
    sourceUrl: "https://disney.fandom.com/wiki/Achilles_(Hercules)",
    name: "Achilles",
    imageUrl:
      "https://static.wikia.nocookie.net/disney/images/d/d3/Vlcsnap-2015-05-06-23h04m15s601.png",
    createdAt: "2021-04-12T01:31:30.547Z",
    updatedAt: "2021-12-20T20:39:18.033Z",
    url: "https://api.disneyapi.dev/characters/112",
    __v: 0,
  },
  {
    _id: 18,
    films: ["The Fox and the Hound", "The Fox and the Hound 2"],
    shortFilms: [],
    tvShows: [],
    videoGames: [],
    parkAttractions: [],
    allies: [],
    enemies: [],
    sourceUrl: "https://disney.fandom.com/wiki/Abigail_the_Cow",
    name: "Abigail the Cow",
    imageUrl:
      "https://static.wikia.nocookie.net/disney/images/0/05/Fox-disneyscreencaps_com-901.jpg",
    createdAt: "2021-04-12T01:26:03.413Z",
    updatedAt: "2021-12-20T20:39:18.032Z",
    url: "https://api.disneyapi.dev/characters/18",
    __v: 0,
  },
  {
    _id: 16,
    films: ["Cheetah"],
    shortFilms: [],
    tvShows: [],
    videoGames: [],
    parkAttractions: [],
    allies: [],
    enemies: [],
    sourceUrl: "https://disney.fandom.com/wiki/Abdullah",
    name: "Abdullah",
    imageUrl:
      "https://static.wikia.nocookie.net/disney/images/c/cb/1087603-44532-clp-950.jpg",
    createdAt: "2021-04-12T01:26:02.377Z",
    updatedAt: "2021-12-20T20:39:18.032Z",
    url: "https://api.disneyapi.dev/characters/16",
    __v: 0,
  },
  {
    _id: 45,
    films: ["Mary Poppins (film)", "Mary Poppins Returns"],
    shortFilms: [],
    tvShows: [],
    videoGames: [],
    parkAttractions: [],
    allies: [],
    enemies: [],
    sourceUrl: "https://disney.fandom.com/wiki/Admiral_Boom_and_Mr._Binnacle",
    name: "Admiral Boom and Mr. Binnacle",
    imageUrl:
      "https://static.wikia.nocookie.net/disney/images/b/be/Marypoppins-disneyscreencaps_com-1086.jpg",
    createdAt: "2021-04-12T01:26:21.560Z",
    updatedAt: "2021-12-20T20:39:18.033Z",
    url: "https://api.disneyapi.dev/characters/45",
    __v: 0,
  },
  {
    _id: 7,
    films: [],
    shortFilms: [],
    tvShows: ["Gravity Falls"],
    videoGames: [],
    parkAttractions: [],
    allies: [],
    enemies: [],
    sourceUrl: "https://disney.fandom.com/wiki/.GIFfany",
    name: ".GIFfany",
    imageUrl:
      "https://static.wikia.nocookie.net/disney/images/5/51/Giffany.png",
    createdAt: "2021-04-12T01:25:10.354Z",
    updatedAt: "2021-12-20T20:39:18.032Z",
    url: "https://api.disneyapi.dev/characters/7",
    __v: 0,
  },
  {
    _id: 12,
    films: [],
    shortFilms: [],
    tvShows: ["Pickle and Peanut"],
    videoGames: [],
    parkAttractions: [],
    allies: [],
    enemies: [],
    sourceUrl:
      "https://disney.fandom.com/wiki/90%27s_Adventure_Bear_(character)",
    name: "90's Adventure Bear",
    imageUrl:
      "https://static.wikia.nocookie.net/disney/images/3/3f/90%27s_Adventure_Bear_profile.png",
    createdAt: "2021-04-12T01:26:00.335Z",
    updatedAt: "2021-12-20T20:39:18.032Z",
    url: "https://api.disneyapi.dev/characters/12",
    __v: 0,
  },
  {
    _id: 36,
    films: [],
    shortFilms: [],
    tvShows: ["K.C. Undercover"],
    videoGames: [],
    parkAttractions: [],
    allies: [],
    enemies: [],
    sourceUrl: "https://disney.fandom.com/wiki/Candace_Adams",
    name: "Candace Adams",
    imageUrl:
      "https://static.wikia.nocookie.net/disney/images/8/8b/Enemy_of_the_State_promo_3.jpg",
    createdAt: "2021-04-12T01:26:16.062Z",
    updatedAt: "2021-12-20T20:39:18.033Z",
    url: "https://api.disneyapi.dev/characters/36",
    __v: 0,
  },
];

let searchQuery = "";
let loading = false;

const mockedData = { searchQuery, characters, loading };

// SETTING UP OUTLET CONTEXT
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useOutletContext: () => mockedData,
}));

test("Render out <Home> page with mocked outlet data. Check if character cards were rendered", async () => {
  const { container } = render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );

  // verify page content for route
  expect(screen.getByText(/Achilles/i)).toBeInTheDocument();
  //   expect(screen.getByText(/Abdullah/i)).toBeInTheDocument();
});
