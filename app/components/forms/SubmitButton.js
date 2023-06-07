import React from "react";
import { useFormikContext } from "formik";

import Button from "../Button";

function SubmitButton({ ...otherProps }) {
  const { handleSubmit } = useFormikContext();
  return <Button onPress={handleSubmit} {...otherProps} />;
}

export default SubmitButton;
