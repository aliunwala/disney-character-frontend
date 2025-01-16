import { useState, useEffect } from "react";
import styled from "styled-components";
import LoadingIndicator from "../components/loading-indicator";
import { CharacterProps } from "../definitions/character";
import Button from "../components/button";
import axios from "axios";
import { useOutletContext, useParams } from "react-router-dom";
import CharacterDetails from "../components/characterDetails";
import NoImage from "../assets/No-Image-Placeholder.png";
// import singleCharacter from "../api/disneyAPI"
// STYLED CHARACTER COMPONENT
const StyledCharacter = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 40px;
  width: 100%;
  transition: all 0.3s ease-in-out;

  figure {
    width: 440px;

    img {
      border-radius: 16px;
      box-shadow: 0 2px 8px 0 rgba(5, 69, 83, 0.12),
        0 4px 24px 0 rgba(5, 69, 83, 0.12);
      width: 100%;
      height: 528px;
      object-fit: cover;
    }
  }

  article {
    flex: 1;
    text-align: left;

    h3 {
      margin-bottom: 32px;
    }

    h4 {
      margin-bottom: 8px;
      font-size: 18px;
      font-weight: bold;
      line-height: 24px;
    }

    ul {
      margin-bottom: 48px;
      list-style: disc;
      padding-left: 24px;
      line-height: 24px;

      li {
        line-height: 24px;
      }
    }

    p {
      margin-bottom: 24px;
      font-size: 12px;
      font-weight: normal;
      line-height: 16px;
    }
  }
`;

/*
 * CHARACTER PAGE COMPONENT
 *
 * description: Character page component that displays character details
 * @returns {JSX.Element}
 */
const Character = () => {
  const { character, loading, setLoading } = useOutletContext<any>();

  const [characterDetails, setCharacterDetails] =
    useState<CharacterProps | null>(character);
  // const [loading, setLoading] = useState(true);
  let params = useParams();

  let content = null;
  let featuredFilms = null;
  let featuredShorts = null;
  let featuredTV = null;

  useEffect(() => {
    setLoading(true);
    axios({
      method: "GET",
      url: `https://api.disneyapi.dev/character/${params.id}`,
      // params: {
      //   page: 1,
      //   pageSize: 8,
      // },
    }).then((res) => {
      setCharacterDetails(res?.data?.data);
      setLoading(false);
    });
  }, [params.id]);

  // IF LOADING, SHOW LOADING SPINNER
  if (loading) {
    return <LoadingIndicator />;
  }

  // SHOW PLACEHOLDER IMAGE IF THERE IS NO IMAGE
  let imageURL = NoImage;
  let imageALT = "No Image";
  if (
    characterDetails?.imageUrl &&
    characterDetails?.imageUrl != undefined &&
    characterDetails?.imageUrl.length > 0
  ) {
    imageURL = characterDetails?.imageUrl;
    imageALT = characterDetails?.name;
  }

  // FORMATING DATE
  let d = new Date();
  let month = "";
  let day;
  let year;
  const mL = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  if (characterDetails?.updatedAt) {
    d = new Date(characterDetails.updatedAt);
    month = mL[d.getMonth()];
    day = d.getDay();
    year = d.getFullYear();
  }

  // SET CONTENT BASED ON LOADING STATE
  if (characterDetails && !loading) {
    content = (
      <StyledCharacter>
        <figure>
          <img src={imageURL} alt={imageALT} />
        </figure>

        <article>
          <h3>{characterDetails?.name}</h3>
          {/* <p>Last Updated: {characterDetails?.updatedAt}</p> */}
          <p>{`Last Updated: ${month} ${day}, ${year} `}</p>
          <CharacterDetails
            title="Featured Films"
            list={characterDetails.films}
            charId={characterDetails._id}
          ></CharacterDetails>
          <CharacterDetails
            title="Short Films"
            list={characterDetails.shortFilms}
            charId={characterDetails._id}
          ></CharacterDetails>
          <CharacterDetails
            title="TV Shows"
            list={characterDetails.tvShows}
            charId={characterDetails._id}
          ></CharacterDetails>
          <CharacterDetails
            title="Video Games"
            list={characterDetails.videoGames}
            charId={characterDetails._id}
          ></CharacterDetails>
          {featuredFilms}
          {featuredShorts}
          {featuredTV}

          <Button
            href={characterDetails?.sourceUrl}
            label="Explore More Character Details"
          />
        </article>
      </StyledCharacter>
    );
  }

  return content;
};

export default Character;
