import { prettyDOM, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React, { useState } from "react";
import "@testing-library/jest-dom";
import Character from "./Character";
import { BrowserRouter, MemoryRouter } from "react-router-dom";

let character = {
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
};

let setLoading = () => {};
let loading = false;
const mockedData = { character, loading, setLoading };

// SETTING UP OUTLET CONTEXT
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useOutletContext: () => mockedData,
}));

test("Render out <Character> page with mocked outlet data. Check if character cards were rendered", async () => {
  const { container } = render(
    <BrowserRouter>
      <Character />
    </BrowserRouter>
  );

  // verify page content for route
  expect(screen.getByText(/Hercules \(film\)/i)).toBeInTheDocument();
  //   expect(screen.getByText(/Abdullah/i)).toBeInTheDocument();
});
