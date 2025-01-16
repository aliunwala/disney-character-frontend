import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { CharacterProps } from "../definitions/character";
import Card from "../components/card";
import styled from "styled-components";
import LoadingIndicator from "../components/loading-indicator";
import { useEffect } from "react";

// STYLED RESULTS COMPONENT
const StyledResults = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

/*
 * RESULTS PAGE COMPONENT
 *
 * description: Results page component that displays search results
 * @returns {JSX.Element}
 */
function Results() {
  let content = null;
  let contentHead = null;
  let { searchQuery, characters, loading } = useOutletContext<any>();
  let listItems = <></>;

  // SET SEARCH RESULT OR LOADING
  if (characters?.length) {
    listItems = characters.map((character: CharacterProps) => {
      return <Card key={character._id} character={character} />;
    });
    contentHead = <h3>Search Results - {searchQuery}</h3>;
  } else {
    contentHead = <h3>Sorry there were no characters found</h3>;
  }
  // SET LOADING
  if (loading) {
    content = <LoadingIndicator />;
  }
  content = <StyledResults>{listItems}</StyledResults>;

  return (
    <>
      {contentHead}
      {content}
    </>
  );
}

export default Results;
