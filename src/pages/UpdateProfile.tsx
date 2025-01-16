// import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import styled from "styled-components";
import Button from "../components/button";
import { Link, useOutletContext } from "react-router-dom";
import Cookies from "js-cookie";

const StyledRow = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;

  label {
    font-family: Lato;
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    color: #5b6873;
  }

  input {
    font-family: Lato;
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;

    border: 1px solid var(--Border-border-secondary, #c2ccda);

    padding: 2px;
  }

  .inputLarge {
    width: 660px;
  }
  .inputSmall {
    width: 320px;
  }
`;
const StyledInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
`;

let UpdateProfile = () => {
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
  const schema = z.object({
    firstName: z.string().min(1).max(200),
    lastName: z.string().min(1).max(200),
    favoriteCharacter: z.string().min(1).max(200),
    favoriteRide: z.string().min(1).max(200),
    favoriteMovie: z.string().min(1).max(200),
    favoritePark: z.string().min(1).max(200),
    dob: z.string().date(),
    city: z.string().min(1).max(200),
    state: z.string().min(1).max(200),
  });
  type FormFields = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: currentUserInfoJSON,
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      // SIMULATING SENDING THIS TO THE SERVER:
      await new Promise((resolve) => setTimeout(resolve, 500));
      // console.log(data);
      Cookies.set("userInfo", JSON.stringify(data), { expires: 7 });
    } catch (error) {
      setError("root", {
        message: "This is already taken",
      });
    }
  };

  return (
    <>
      {/* Possible TODO: Break each styledInput into its own component */}
      <form className="tutorial gap-2" onSubmit={handleSubmit(onSubmit)}>
        <StyledRow>
          <StyledInput>
            <label htmlFor="firstName">First name</label>
            <input
              className="inputSmall"
              {...register("firstName")}
              type="text"
              placeholder="First Name"
              id="firstName"
            />
            {errors.firstName && (
              <div style={{ color: "red" }}>{errors.firstName.message}</div>
            )}
          </StyledInput>
          <StyledInput>
            <label htmlFor="lastName">Last name</label>
            <input
              className="inputSmall"
              {...register("lastName")}
              type="text"
              id="lastName"
              placeholder=""
            />
            {errors.lastName && (
              <div style={{ color: "red" }}>{errors.lastName.message}</div>
            )}
          </StyledInput>
        </StyledRow>
        <StyledRow>
          <StyledInput>
            <label htmlFor="dob">Birth Date (YYYY-MM-DD)</label>
            <input
              className="inputSmall"
              {...register("dob")}
              type="text"
              id="dob"
              placeholder=""
            />
            {errors.dob && (
              <div style={{ color: "red" }}>{errors.dob.message}</div>
            )}
          </StyledInput>
        </StyledRow>
        <StyledRow>
          <StyledInput>
            <label htmlFor="favoriteCharacter">Favorite Character</label>
            <input
              className="inputLarge"
              {...register("favoriteCharacter")}
              type="text"
              id="favoriteCharacter"
              placeholder=""
            />
            {errors.favoriteCharacter && (
              <div style={{ color: "red" }}>
                {errors.favoriteCharacter.message}
              </div>
            )}
          </StyledInput>
        </StyledRow>
        <StyledRow>
          <StyledInput>
            <label htmlFor="city">City</label>
            <input
              className="inputSmall"
              {...register("city")}
              type="text"
              id="city"
              placeholder=""
            />
            {errors.city && (
              <div style={{ color: "red" }}>{errors.city.message}</div>
            )}
          </StyledInput>
          <StyledInput>
            <label htmlFor="state">State</label>
            <input
              className="inputSmall"
              {...register("state")}
              type="text"
              id="state"
              placeholder=""
            />
            {errors.state && (
              <div style={{ color: "red" }}>{errors.state.message}</div>
            )}
          </StyledInput>
        </StyledRow>
        <StyledRow>
          <StyledInput>
            <label htmlFor="favoriteRide">Favorite Ride</label>
            <input
              className="inputLarge"
              {...register("favoriteRide")}
              type="text"
              id="favoriteRide"
              placeholder=""
            />
            {errors.favoriteRide && (
              <div style={{ color: "red" }}>{errors.favoriteRide.message}</div>
            )}
          </StyledInput>
        </StyledRow>
        <StyledRow>
          <StyledInput>
            <label htmlFor="favoriteMovie">Favorite Movie</label>
            <input
              className="inputLarge"
              {...register("favoriteMovie")}
              type="text"
              id="favoriteMovie"
              placeholder=""
            />
            {errors.favoriteMovie && (
              <div style={{ color: "red" }}>{errors.favoriteMovie.message}</div>
            )}
          </StyledInput>
        </StyledRow>
        <StyledRow>
          <StyledInput>
            <label htmlFor="favoritePark">Favorite Park</label>
            <input
              className="inputLarge"
              {...register("favoritePark")}
              type="text"
              id="favoritePark"
              placeholder=""
            />
            {errors.favoritePark && (
              <div style={{ color: "red" }}>{errors.favoritePark.message}</div>
            )}
          </StyledInput>
        </StyledRow>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Button
            buttonType="submit"
            label={isSubmitting ? "Loading..." : "Update Profile"}
            disabled={isSubmitting}
          ></Button>
          <Link to="/profile">
            <Button buttonType="button" label="Cancel"></Button>
          </Link>
        </div>
      </form>
      {/* Display any overall errors */}
      {errors.root && <div style={{ color: "red" }}>{errors.root.message}</div>}
    </>
  );
};

export default UpdateProfile;
