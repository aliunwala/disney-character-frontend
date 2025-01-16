// import { useState } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { z } from "zod";
import Button from "../../components/button";
import { useOutletContext, Link } from "react-router-dom";
import Cookies from "js-cookie";
import styled from "styled-components";
import { calculate_age } from "../../utils/helperMethods";

const StyledRow = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;

  font-family: Lato;
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;

  h3 {
    font-family: Lato;
    font-size: 40px;
    font-weight: 600;
    line-height: 48px;
    text-align: center;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
  }

  .inputLarge {
    width: 660px;
  }
  .inputSmall {
    width: 320px;
  }
`;

/*
 * PROFILE PAGE COMPONENT
 *
 * description: Profile page component that displays user profile information and allows for editing
 * @returns {JSX.Element}
 */
const Profile = () => {
  // const { userState, setUserState } = useOutletContext<any>();

  // SETS UP COOKIE WITH JOHN DOE INFO IF THERE IS NO COOKIE ALREADY SET UP
  let currentUserInfo = Cookies.get("userInfo");
  if (currentUserInfo === undefined) {
    Cookies.set(
      "userInfo",
      JSON.stringify({
        firstName: "John",
        lastName: "Doe",
        favoriteCharacter: "Elsa",
        favoriteRide: "Space Mountain",
        favoriteMovie: "Moana",
        favoritePark: "Disney World, Florida",
        dob: "1980-01-01",
        city: "San Francisco",
        state: "California",
      }),
      { expires: 7 }
    );
  }

  let currentUserInfoJSON;
  if (currentUserInfo) {
    currentUserInfoJSON = JSON.parse(currentUserInfo);
  }

  return (
    <>
      {currentUserInfoJSON != undefined &&
        Object.keys(currentUserInfoJSON).length > 0 && (
          <>
            <StyledRow>
              <h3>
                {currentUserInfoJSON.firstName +
                  " " +
                  currentUserInfoJSON.lastName}
              </h3>
            </StyledRow>
            <StyledRow>{`Age: ${calculate_age(
              new Date(currentUserInfoJSON.dob)
            )}`}</StyledRow>
            <StyledRow>{`Location: ${currentUserInfoJSON.city}, ${currentUserInfoJSON.state}`}</StyledRow>
            <StyledRow>{`Favorite Character: ${currentUserInfoJSON.favoriteCharacter}`}</StyledRow>
            <StyledRow>{`Favorite Ride: ${currentUserInfoJSON.favoriteRide}`}</StyledRow>
            <StyledRow>{`Favorite Movie: ${currentUserInfoJSON.favoriteMovie}`}</StyledRow>
            <StyledRow>{`Favorite Disney Theme Park: ${currentUserInfoJSON.favoritePark}`}</StyledRow>
          </>
        )}

      <Link to="/updateProfile">
        {/* <MyButton>Edit Profile</MyButton> */}
        <Button label="Edit Profile" buttonType="button"></Button>
      </Link>
    </>
  );
  // <h3>Profile</h3>;
};

export default Profile;
