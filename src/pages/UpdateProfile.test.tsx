import {
  fireEvent,
  prettyDOM,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React, { useState } from "react";
import "@testing-library/jest-dom";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import UpdateProfile from "./UpdateProfile";

beforeEach(() => {
  document.cookie =
    "userInfo={%22firstName%22:%22John%22%2C%22lastName%22:%22Doe%22%2C%22favoriteCharacter%22:%22Elsa%22%2C%22favoriteRide%22:%22Space%20Mountain%22%2C%22favoriteMovie%22:%22Moana%22%2C%22favoritePark%22:%22Disney%20World%2C%20Florida%22%2C%22dob%22:%2201/01/1981%22%2C%22city%22:%22San%20Francisco%22%2C%22state%22:%22California%22}";
});

test("Render <UpdateProfile> Make sure the form renders, Set cookie for webpage, check if user information populates the form", async () => {
  const { container } = render(
    <BrowserRouter>
      <UpdateProfile />
    </BrowserRouter>
  );

  // verify page content for route
  expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Birth Date/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Favorite Character/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/City/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/State/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Favorite Ride/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Favorite Movie/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Favorite Park/i)).toBeInTheDocument();

  // Make sure we can edit the text in the fields
  expect(screen.getByDisplayValue(/John/i)).toBeInTheDocument();
  const input = screen.getByDisplayValue("John");
  fireEvent.change(input, { target: { value: "John123" } });
  expect(screen.getByDisplayValue(/John123/i)).toBeInTheDocument();
});
