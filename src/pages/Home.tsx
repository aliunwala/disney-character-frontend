import { useState, useEffect } from "react";
import LoadingIndicator from "../components/loading-indicator";
import { CharacterProps } from "../definitions/character";
import Card from "../components/card";
import styled from "styled-components";
import { useOutletContext } from "react-router-dom";
import { filterCharacters } from "../api/disneyAPI";

// STYLED HOME COMPONENT
const StyledHome = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

/*
 * HOME PAGE COMPONENT
 *
 * description: Home page component that displays a default list of characters
 * @returns {JSX.Element}
 */
function Home() {
  let content = null;
  const { searchQuery, characters, setCharacters, loading, setLoading } =
    useOutletContext<any>();

  // SET CONTENT BASED ON LOADING STATE (FOR FEATURED COMPONENT)
  if (loading) {
    content = <LoadingIndicator />;
  }

  // IF CHARACTERS, DISPLAY CHARACTERS
  if (characters?.length) {
    // We have 1 or more characters to display
    const listItems = characters.map((character: CharacterProps) => {
      return <Card key={character._id} character={character} />;
    });
    content = <StyledHome>{listItems}</StyledHome>;
  } else {
    // We have 0 characters to display
    return (
      <div style={{ fontSize: "24px" }}>
        Sorry there were no characters found
      </div>
    );
  }

  return content;
}

export default Home;
