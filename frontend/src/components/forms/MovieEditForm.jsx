import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

import useForm from "../../hooks/useForm";
import { validateMovie } from "../../utils/FormValidation";

const MovieForm = ({ match, path }) => {
  const { id } = match.params;
  const [image, setImagePreview] = useState();

  const { data, isLoading, error } = useQuery("info", async () => {
    return await axios.get(`/api/movies/${id}`).then((res) => res.data);
  });

  const {
    values,
    setValues,
    handleChange,
    handleSubmit,
    errors,
    setErrors,
  } = useForm(submitForm, validateMovie);

  useEffect(() => {
    if (data) {
      setValues(data);
      console.log(data.imageURL);
    }
  }, [data]);

  if (isLoading) return <div className="">Loading...</div>;

  if (error) return <div className="">Error Fetching data</div>;

  // file handling
  const fileHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
  };

  async function submitForm(values) {
    try {
      const response = await axios
        .put(`/api/movies/${data._id}/update`, values)
        .then((res) => res.data);

      return response;
    } catch (error) {
      setErrors({ ...errors, message: error.response.data.message });
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label className="form-label">Title</label>
          <input
            type="text"
            name="title"
            onChange={handleChange}
            className="form-input"
            value={values.title || ""}
          />
          {errors.title && <pre>{errors.title}</pre>}
        </div>
        <div className="form-field">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            onChange={handleChange}
            className="form-input"
            value={values.description || ""}
          />
          {errors.description && <pre>{errors.description}</pre>}
        </div>
        <div className="form-field">
          <label className="form-label">Director</label>
          <input
            type="text"
            name="director"
            onChange={handleChange}
            value={values.director || ""}
            className="form-input"
          />
          {errors.director && <pre>{errors.director}</pre>}
        </div>
        <div className="form-field">
          <label className="form-label">casts</label>
          <input
            type="text"
            name="casts"
            value={values.casts || ""}
            onChange={handleChange}
            className="form-input"
          />
          {errors.casts && <pre>{errors.casts}</pre>}
        </div>
        <div className="form-field">
          <label className="form-label">price</label>
          <input
            type="text"
            name="price"
            onChange={(e) => {
              setValues({ ...values, price: Number(e.target.value) });
            }}
            value={values.price || ""}
            className="form-input"
          />
          {errors.price && <pre>{errors.price}</pre>}
        </div>
        <div className="form-field">
          <label className="form-label">category</label>
          <input
            type="text"
            name="category"
            onChange={handleChange}
            className="form-input"
            value={values.category || ""}
          />
          {errors.category && <pre>{errors.category}</pre>}
        </div>
        <div className="form-field">
          <label className="form-label">cinema</label>
          <select
            name="cinema"
            onChange={(e) => {
              setValues({ ...values, cinema: e.target.value });
            }}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
          </select>
          {errors.cinema && <pre>{errors.cinema}</pre>}
        </div>
        <div className="form-field">
          <label className="form-label">movieDuration</label>
          <input
            type="text"
            name="movieDuration"
            onChange={handleChange}
            className="form-input"
            value={values.movieDuration || ""}
          />
          {errors.movieDuration && <pre>{errors.movieDuration}</pre>}
        </div>
        <div className="form-field">
          <label className="form-label">release</label>
          <input
            type="text"
            name="release"
            onChange={handleChange}
            value={values.release || ""}
            className="form-input"
          />
          {errors.release && <pre>{errors.release}</pre>}
        </div>
        <div className="form-field">
          <label className="form-label">showDuration</label>
          <select
            name="showDuration"
            onChange={(e) => {
              setValues({ ...values, showDuration: e.target.value });
            }}
          >
            <option value={7}>1 week</option>
            <option value={14}>2 weeks</option>
            <option value={21}>3 weeks</option>
            <option value={30}>1 month</option>
          </select>
          {errors.showDuration && <pre>{errors.showDuration}</pre>}
        </div>
        <div className="form-field">
          <label className="form-label">Image:</label>
          <input
            type="file"
            name="imageURL"
            accept="image/*"
            onChange={fileHandler}
          />
          <img src={values.imageURL || image} alt="cover" />
          {errors.imageURL && <pre>{errors.imageURL}</pre>}
        </div>
        <div className="form-field">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default MovieForm;
