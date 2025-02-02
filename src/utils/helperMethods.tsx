// From https://www.w3resource.com/javascript-exercises/javascript-date-exercise-18.php
export function calculate_age(dob: Date) {
  // Calculate the difference in milliseconds between the current date and the provided date of birth
  var diff_ms = Date.now() - dob.getTime();
  // Create a new Date object representing the difference in milliseconds and store it in the variable age_dt (age Date object)
  var age_dt = new Date(diff_ms);

  // Calculate the absolute value of the difference in years between the age Date object and the year 1970 (UNIX epoch)
  return Math.abs(age_dt.getUTCFullYear() - 1970);
}

export function formattedDate(date: string, format: string) {
  if (!Date.parse(date)) {
    // If we have in invalid data
    return { month: "", year: "", day: "" };
  }
  let d = new Date(date);
  let month, day, year;
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
  month = mL[d.getMonth()];
  day = d.getDay();
  year = d.getFullYear();
  return { month, day, year };
}
