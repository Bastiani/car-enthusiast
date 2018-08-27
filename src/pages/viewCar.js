// @flow
import * as React from "react";
import { ScrollView, Button } from "react-native";
import styled from "styled-components/native";
import { withFormik } from "formik";
import * as yup from "yup";
import idx from "idx";

import { withStorage } from "../components/AsyncStorage/StorageHoc";

import TextField from "../components/common/TextFieldFormik";

const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  padding: 5px;
`;

const ViewCar = ({ handleSubmit }) => (
  <ScrollView>
    <Container>
      <TextField label="Manufacturer" name="manufacturer" />
      <TextField label="Model" name="model" />
      <TextField label="Year" name="year" />
      <Button title="Save" onPress={handleSubmit} />
    </Container>
  </ScrollView>
);

const formWithFormik = withFormik({
  mapPropsToValues: props => {
    const { storageResult } = props;

    return {
      manufacturer: idx(storageResult, _ => _.manufacturer) || "",
      model: idx(storageResult, _ => _.model) || "",
      year: idx(storageResult, _ => _.year) || "",
      date: idx(storageResult, _ => _.date) || ""
    };
  },
  validationSchema: yup.object().shape({
    manufacturer: yup.string().required("Preencha o campo Fabricante"),
    model: yup.string().required("Preencha o campo Modelo")
  }),
  handleSubmit: values => {
    // try {
    //   const existingCars = await AsyncStorage.getItem("@Car:details");
    //   let newCar = JSON.parse(existingCars);
    //   if (!newCar) {
    //     newCar = [];
    //   }
    //   newCar.push(values);
    //   await AsyncStorage.setItem("@Car:details", JSON.stringify(newCar));
    // } catch (error) {
    //   alert(error);
    // }
  }
})(ViewCar);

export default withStorage(formWithFormik, "@Car:details", props => ({
  date: props.navigation.getParam("date", "NO-ID")
}));
