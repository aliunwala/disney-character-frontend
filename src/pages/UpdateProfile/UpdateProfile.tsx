// import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import styled from "styled-components";
import Button from "../../components/button";
import { Link, useOutletContext } from "react-router-dom";
import Cookies from "js-cookie";
import FormInput from "../../components/formInput";
import { allInputs } from "./staticFormData";
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
      <form className="tutorial gap-2" onSubmit={handleSubmit(onSubmit)}>
        {allInputs.map((row) => {
          return (
            <StyledRow>
              {row.map(({ id, placeholder, type, labelText }) => {
                return (
                  <FormInput
                    id={id}
                    placeholder={placeholder}
                    register={register}
                    type={type}
                    labelText={labelText}
                    errors={errors}
                  ></FormInput>
                );
              })}
            </StyledRow>
          );
        })}

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Button
            buttonType="submit"
            label={isSubmitting ? "Loading..." : "Update Profile"}
            disabled={isSubmitting}
            myStyles={{ minWidth: "152px" }}
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
