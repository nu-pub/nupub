import React, { useState } from "react";
import styled from "styled-components";
import Box from "@material-ui/core/Box";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const validationSchema = yup.object({
  text: yup
    .string("enter your text")
    .required("why leave this empty...?")
    .min(0),
});

const SourceCreatePageContainer = styled(Box)``;

const SourceCreatePage = () => {
  const [paragraphs, setParagraphs] = useState([]);

  const formik = useFormik({
    initialValues: {
      text: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <SourceCreatePageContainer>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="text"
          name="text"
          label="Text"
          value={formik.values.text}
          onChange={formik.handleChange}
          error={formik.touched.text && Boolean(formik.errors.text)}
          helperText={formik.touched.text && formik.errors.text}
        />
        <Button
          color="default"
          variant="contained"
          type="button"
          onClick={() => {
            setParagraphs([...paragraphs, formik.values.text]);
            formik.setFieldValue("text", "");
          }}
        >
          Add
        </Button>
        <Button color="primary" variant="contained" type="submit">
          Submit
        </Button>
      </form>
      {paragraphs.map((e, i) => (
        <p key={i}>{e}</p>
      ))}
    </SourceCreatePageContainer>
  );
};

export default SourceCreatePage;
