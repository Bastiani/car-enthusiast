// @flow
import * as React from "react";
import { ScrollView, Button } from "react-native";
import styled from "styled-components/native";
import { withFormik } from "formik";
import * as yup from "yup";
import idx from "idx";

import OilChange from "./oilChange";
import { withStorage } from "../components/AsyncStorage/StorageHoc";
import TextField from "../components/common/TextFieldFormik";
import CommonPage from "./commonPage";

const ButtonStyled = styled.Button`
  background-color: #813416;
`;

const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  padding: 5px;
`;

const ViewCar = ({ handleSubmit, navigation, storageResult }) => (
  <CommonPage navigation={navigation}>
    <ScrollView>
      <Container>
        <TextField label="Manufacturer" name="manufacturer" />
        <TextField label="Model" name="model" />
        <TextField label="Year" name="year" />
        <ButtonStyled title="Save" onPress={handleSubmit} />
        <OilChange carId={storageResult.id} />
      </Container>
    </ScrollView>
  </CommonPage>
);

const formWithFormik = withFormik({
  mapPropsToValues: ({ storageResult }) => ({
    id: idx(storageResult, _ => _.id) || "",
    manufacturer: idx(storageResult, _ => _.manufacturer) || "",
    model: idx(storageResult, _ => _.model) || "",
    year: idx(storageResult, _ => _.year) || "",
    date: idx(storageResult, _ => _.date) || ""
  }),
  validationSchema: yup.object().shape({
    manufacturer: yup.string().required("Preencha o campo Fabricante"),
    model: yup.string().required("Preencha o campo Modelo")
  }),
  handleSubmit: async (values, { props: { alterRegister, navigation } }) => {
    await alterRegister(values);
    navigation.navigate("ListCar");
  }
})(ViewCar);

export default withStorage(formWithFormik, "@Car:details", props => ({
  id: props.navigation.getParam("id", "NO-ID")
}));
