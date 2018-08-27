// @flow
import React from "react";
import { ScrollView, Button } from "react-native";
import styled from "styled-components/native";
import { withFormik } from "formik";
import * as yup from "yup";
import moment from "moment";

import TextField from "../components/common/TextFieldFormik";
import { withStorage } from "../components/AsyncStorage/StorageHoc";

const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  padding: 10px;
`;

const Form = ({ handleSubmit }) => (
  <ScrollView>
    <Container>
      <TextField label="Manufacturer" name="manufacturer" />
      <TextField label="Model" name="model" />
      <TextField label="Year" name="year" />
      <Button title="Save" onPress={handleSubmit} />
    </Container>
  </ScrollView>
);

const createCarForm = withFormik({
  mapPropsToValues: () => ({
    manufacturer: "",
    model: "",
    year: "",
    date: moment().format()
  }),
  validationSchema: yup.object().shape({
    manufacturer: yup.string().required("Preencha o campo Fabricante"),
    model: yup.string().required("Preencha o campo Modelo")
  }),
  handleSubmit: async (values, { props: { navigation, createRegister } }) => {
    await createRegister(values);
    navigation.navigate("ListCar");
  }
})(Form);

export default withStorage(createCarForm, "@Car:details");
