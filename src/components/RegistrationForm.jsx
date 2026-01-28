import React, { useState } from "react";
import axios from "axios";
import InputField from "./InputField";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (name, value) => {
    let error = "";
    if (name === "email") {
      if (!value) error = "Email აუცილებელია";
      else if (!value.includes("@")) error = "არასწორი მეილი (@)";
    } else if (name === "username") {
      if (!value) error = "UserName აუცილებელია";
      else if (value.length < 4) error = "მინიმუმ 4 სიმბოლო";
    } else if (name === "password") {
      if (!value) error = "Password აუცილებელია";
      else if (value.length < 8) error = "მინიმუმ 8 სიმბოლო";
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validate(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasErrors = Object.values(errors).some((err) => err !== "");
    const isFormEmpty = Object.values(formData).some((val) => val === "");

    if (!hasErrors && !isFormEmpty) {
      setIsSubmitting(true);
      try {
        await axios.post(
          "https://jsonplaceholder.typicode.com/posts",
          formData,
        );
        alert("რეგისტრაცია წარმატებით დასრულდა!");
        setFormData({ email: "", username: "", password: "" }); 
      } catch (err) {
        alert("სერვერზე შეცდომაა!");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <form className="registration-form" onSubmit={handleSubmit}>
      <InputField
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
      />
      <InputField
        label="Username"
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        error={errors.username}
      />
      <InputField
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
      />

      <button
        type="submit"
        disabled={
          isSubmitting ||
          Object.values(errors).some((err) => err !== "") ||
          !formData.email
        }
        className="submit-btn">
        {isSubmitting ? "იგზავნება..." : "რეგისტრაცია"}
      </button>
    </form>
  );
};

export default RegistrationForm;
