import { StyleSheet } from "react-native";
import React from "react";
import { useFormikContext } from "formik";
import ErrorMessage from "./ErrorMessage";
import DateInput from "../DateInput";
export default function DateFormField({ name, width, ...otherProps }) {
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext();
  return (
    <>
      <DateInput
        onOpenModal={() => setFieldTouched(name)}
        onDateChange={date => setFieldValue(name, date)}
        selectedDate={values[name]}
        width={width}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

const styles = StyleSheet.create({});
