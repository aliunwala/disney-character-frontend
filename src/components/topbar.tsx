import { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import theme from "../constants/theme";
import DisneyLogo from "../assets/disney-logo.svg";
import ProfileIcon from "../assets/profile-icon.svg";
// STYLED TOPBAR COMPONENT
const StyledTopbar = styled.header`
  background-color: ${theme.background};
  text-align: center;

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 40px;
    height: 112px;
    max-width: 1200px;
    margin: 0 auto;

    @media only screen and (max-width: 960px) {
      gap: 8px;
      padding: 0 8px;
    }
  }

  input {
    background-color: ${theme.backgroundAlt};
    border: none;
    border-radius: 100px;
    width: 100%;
    height: 48px;
    padding: 0 16px;
  }

  .profile-link {
    background-color: ${theme.accent};
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 48px;
    text-decoration: none;
    height: 48px;
    width: 48px;
    border-radius: 100px;
    transition: all 0.3s ease;

    &:hover {
      background-color: ${theme.accent};
      opacity: 0.8;
    }

    img {
      height: 24px;
      width: 24px;
    }
  }
`;

interface TopbarProps {
  searchQuery: string | undefined;
  setSearchQuery: Function;
}

/*
 * TOPBAR COMPONENT
 *
 * description: Topbar component for the application
 * @returns {JSX.Element}
 */
const Topbar = ({ searchQuery, setSearchQuery }: TopbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isResultsPage = location.pathname.includes("/results");
  // const isProfilePage = location.pathname.includes("/profile");
  // const isUpdateProfilePage = location.pathname.includes("/updateProfile");
  const isHome = location.pathname === "/";

  // HANDLE SEARCH INPUT & ENTER KEY
  const onSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // IF PRESSED ENTER, NAVIGATE TO RESULTS PAGE
    if (!(searchQuery === "" || searchQuery === null) && e.key === "Enter") {
      // If we have a value for search and the enter key is pressed then
      navigate(`/results/?search=${searchQuery}`);
    }
  };

  // HANDLE SEARCH INPUT CHANGE
  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isResultsPage && e.target.value === "") {
      // If we are on results page allow navigation back home if user clears the search bar
      navigate(`/`);
    }
    if (isHome && e.target.value !== "") {
      // If we are on home page allow navigation to results page
      navigate(`/results`);
    }
    setSearchQuery(e.target.value);
  };

  return (
    <StyledTopbar>
      <nav>
        <h1>
          <NavLink to="/">
            <img src={DisneyLogo} alt="Disney Logo" />
          </NavLink>
        </h1>

        <input
          type="text"
          placeholder="Find a character..."
          value={searchQuery}
          onChange={onSearchChange}
          onKeyDown={onSearch}
        />

        <NavLink className="profile-link" to="/profile">
          <img src={ProfileIcon} alt="Profile Icon" />
        </NavLink>
      </nav>
    </StyledTopbar>
  );
};

export default Topbar;
