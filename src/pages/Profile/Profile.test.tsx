import { prettyDOM, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React, { useState } from "react";
import "@testing-library/jest-dom";
import Profile from "./Profile";
import { BrowserRouter, MemoryRouter } from "react-router-dom";

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
// const mockedData = { userState, setUserState };

// SETTING UP OUTLET CONTEXT
// jest.mock("react-router-dom", () => ({
//   ...jest.requireActual("react-router-dom"),
//   useOutletContext: () => mockedData,
// }));

beforeEach(() => {
  document.cookie =
    "userInfo={%22firstName%22:%22John%22%2C%22lastName%22:%22Doe%22%2C%22favoriteCharacter%22:%22Elsa%22%2C%22favoriteRide%22:%22Space%20Mountain%22%2C%22favoriteMovie%22:%22Moana%22%2C%22favoritePark%22:%22Disney%20World%2C%20Florida%22%2C%22dob%22:%2201/01/1981%22%2C%22city%22:%22San%20Francisco%22%2C%22state%22:%22California%22}";
});

test("Setup a cookie with user data, check if that data is rendered to the screen", async () => {
  const { container } = render(
    <BrowserRouter>
      <Profile />
    </BrowserRouter>
  );

  // verify page content for route
  expect(screen.getByText(/Edit Profile/i)).toBeInTheDocument();
  expect(screen.getByText(/Age/i)).toBeInTheDocument();
  expect(screen.getByText(/Location/i)).toBeInTheDocument();
  expect(screen.getByText(/Favorite Character/i)).toBeInTheDocument();
  expect(screen.getByText(/Favorite Ride/i)).toBeInTheDocument();
  expect(screen.getByText(/Favorite Movie/i)).toBeInTheDocument();
  expect(screen.getByText(/Favorite Disney Theme Park/i)).toBeInTheDocument();
  expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
});
