// @flow
import * as React from "react";
import { ScrollView, Button } from "react-native";
import styled from "styled-components/native";
import { withFormik } from "formik";
import * as yup from "yup";
import idx from "idx";
import moment from "moment";

import { withStorage } from "../components/AsyncStorage/StorageHoc";
import { objectId } from "../utils";
import TextField from "../components/common/TextFieldFormik";
import DatePicker from "../components/common/DatePickerFormik";
import Switch from "../components/common/SwitchFormik";

const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  padding: 5px;
`;

const OilChange = ({ handleSubmit, navigation }) => (
  <ScrollView>
    <Container>
      <DatePicker label="Date Last Change" name="dateLastChange" />
      <TextField
        label="Km Last Change"
        name="kmLastChange"
        keyboardType="number"
      />
      <TextField
        label="Km Next Change"
        name="kmNextChange"
        keyboardType="number"
      />
      <TextField
        label="Avg. Km Per Day"
        name="avgKmPerDay"
        keyboardType="number"
      />
      <Switch label="Notification When Changing The Oil?" name="notification" />
      <Button title="Save" onPress={handleSubmit} />
    </Container>
  </ScrollView>
);

const formWithFormik = withFormik({
  mapPropsToValues: ({ storageResult, carId }) => ({
    id: idx(storageResult, _ => _.id) || objectId(),
    dateLastChange: idx(storageResult, _ => _.dateLastChange) || "",
    kmLastChange: idx(storageResult, _ => _.kmLastChange) || "",
    kmNextChange: idx(storageResult, _ => _.kmNextChange) || "",
    notification: idx(storageResult, _ => _.notification) || false,
    avgKmPerDay: idx(storageResult, _ => _.avgKmPerDay) || "",
    carId: carId || "",
    createdAt: idx(storageResult, _ => _.createdAt) || moment().format()
  }),
  validationSchema: yup.object().shape({
    kmLastChange: yup.string().required("Km Last Change is required")
  }),
  handleSubmit: async (
    values,
    { props: { storageResult, alterRegister, createRegister } }
  ) => {
    if (storageResult && storageResult.id) {
      await alterRegister(values);
    } else {
      await createRegister(values);
    }
  }
})(OilChange);

export default withStorage(
  formWithFormik,
  "@OilChange:details",
  ({ carId }) => ({
    carId
  })
);
