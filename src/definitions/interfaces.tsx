import { z } from "zod";

// STATE USED BY BOTH PROFILE AND EDIT_PROFILE PAGES:
export const schema = z.object({
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
export type FormFields = z.infer<typeof schema>;

export const FormFieldsDefaultValues: FormFields = {
  firstName: "John",
  lastName: "Doe",
  favoriteCharacter: "Elsa",
  favoriteRide: "Space Mountain",
  favoriteMovie: "Moana",
  favoritePark: "Disney World, Florida",
  dob: "1980-01-01",
  city: "San Francisco",
  state: "California",
};
