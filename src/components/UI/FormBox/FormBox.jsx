import React from "react";
import Button from "../Button/Button";
import FormHeading from "../FormHeading/FormHeading";
import "./FormBox.scss";

export const FormBox = ({ formTitle, onPublish, children }) => {
  return (
    <form className="form-box">
      <FormHeading title={formTitle} />
      {children}
      <Button text="Save" type="submit" onClick={onPublish} />
    </form>
  );
};
