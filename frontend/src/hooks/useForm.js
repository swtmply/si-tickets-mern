import { useState, useEffect } from "react";

const useForm = (callback, validate) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback(values);
      setIsSubmitting(false);
    }
  }, [errors]);

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  const handleChange = (event) => {
    event.persist();
    delete errors[event.target.name];
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));

    if (event.target.name === "email") {
      if (!/\S+@\S+\.\S+/.test(event.target.value)) {
        setErrors({ ...errors, email: "Email is invalid" });
      }
    }

    if (event.target.name === "contact") {
      if (!/[0-9]{11}/.test(event.target.value)) {
        setErrors({ ...errors, contact: "Contact must have 11 numbers" });
      }
    }

    if (event.target.name === "password") {
      if (!/[a-zA-Z\d]{8}/.test(event.target.value)) {
        setErrors({ ...errors, password: "Password must have 8 characters" });
      }
    }

    if (event.target.name === "password1") {
      if (event.target.value !== values.password) {
        setErrors({ ...errors, password1: "Passwords do not match" });
      }
    }
    setIsSubmitting(false);
  };

  return {
    handleChange,
    handleSubmit,
    values,
    setValues,
    errors,
    setErrors,
    isSubmitting,
  };
};

export default useForm;
