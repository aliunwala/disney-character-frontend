import React from "react";
import { FieldErrors } from "react-hook-form";
import styled from "styled-components";

const StyledInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
`;
interface FormInputProps {
  id: string;
  placeholder: string;
  register: any;
  type: string;
  labelText: string;
  errors: FieldErrors<{
    firstName: string;
    lastName: string;
    favoriteCharacter: string;
    favoriteRide: string;
    favoriteMovie: string;
    favoritePark: string;
    dob: string;
    city: string;
    state: string;
  }>;
}
function FormInput({
  id,
  placeholder = "",
  register,
  type,
  labelText,
  errors,
}: FormInputProps) {
  if (!placeholder) {
    placeholder = "";
  }
  return (
    <StyledInput>
      <label htmlFor={placeholder}>{labelText}</label>
      <input
        className="inputSmall"
        {...register(placeholder)}
        type={type}
        placeholder={placeholder}
        id={id}
      />
      {errors[placeholder as keyof typeof errors] && (
        <div style={{ color: "red" }}>
          {(errors[placeholder as keyof typeof errors] as any).message}
        </div>
      )}
    </StyledInput>
  );
}

export default FormInput;
