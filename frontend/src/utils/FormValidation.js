// check if values are valid for the form to use

export const validateLogin = (values) => {
  let errors = {};
  if (!values.username) {
    errors.username = "Username is required";
  }
  if (!values.password) {
    errors.password = "Password is required";
  }
  return errors;
};

export const validateRegister = (values) => {
  let errors = {};

  if (!values.username) {
    errors.username = "Username is required";
  }
  if (!values.email) {
    errors.email = "Email is required";
  }
  if (!values.contact) {
    errors.contact = "Contact is required";
  }
  if (!values.password) {
    errors.password = "Password is required";
  }
  if (!values.name) {
    errors.name = "Name is required";
  }
  if (!values.password1) {
    errors.password1 = "Confirm Password is required";
  }

  return errors;
};

export const validateEditUser = (values) => {
  let errors = {};

  if (!values.username) {
    errors.username = "Username is required";
  }
  if (!values.email) {
    errors.email = "Email is required";
  }
  if (!values.contact) {
    errors.contact = "Contact is required";
  }
  if (!values.password) {
    errors.password = "Password is required";
  }
  if (!values.name) {
    errors.name = "Name is required";
  }

  return errors;
};

export const validateMovie = (values) => {
  let errors = {};
  if (!values.title) {
    errors.title = "Title is required";
  }
  if (!values.description) {
    errors.description = "Description is required";
  }
  if (!values.price) {
    errors.price = "Price is required";
  }
  if (!values.director) {
    errors.director = "Director is required";
  }
  if (!values.casts) {
    errors.casts = "Casts is required";
  }
  if (!values.category) {
    errors.category = "Category is required";
  }
  if (!values.cinema) {
    errors.cinema = "Cinema is required";
  }
  if (!values.movieDuration) {
    errors.movieDuration = "Movie Duration is required";
  }
  if (!values.release) {
    errors.release = "Release Date is required";
  }
  if (!values.showDuration) {
    errors.showDuration = "Show Duration is required";
  }
  return errors;
};
