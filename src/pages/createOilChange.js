import React from "react";
import { ScrollView, Button } from "react-native";
import styled from "styled-components/native";
import { withFormik } from "formik";
import * as yup from "yup";
import moment from "moment";

import TextField from "../components/common/TextFieldFormik";
import Switch from "../components/common/SwitchFormik";
import { withStorage } from "../components/AsyncStorage/StorageHoc";
import { objectId } from "../utils";

const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  padding: 10px;
`;

const Form = ({ handleSubmit }) => (
  <ScrollView>
    <Container>
      <TextField label="Date Last Change" name="dateLastChange" />
      <TextField label="Km Last Change" name="kmLastChange" />
      <TextField label="Km Next Change" name="kmNextChange" />
      <TextField label="Avg. Km Per Day" name="avgKmPerDay" />
      <Switch label="Notification When Changing The Oil?" name="notification" />
      <Button title="Save" onPress={handleSubmit} />
    </Container>
  </ScrollView>
);

const createOilChangeForm = withFormik({
  mapPropsToValues: props => ({
    id: objectId(),
    dateLastChange: "",
    kmLastChange: "",
    kmNextChange: "",
    notification: false,
    carId: props.navigation.getParam("carId", "NO-ID"),
    createdAt: moment().format()
  }),
  validationSchema: yup.object().shape({
    kmLastChange: yup.string().required("Km Last Change")
  }),
  handleSubmit: async (values, { props: { navigation, createRegister } }) => {
    await createRegister(values);
    navigation.navigate("ListCar");
  }
})(Form);

export default withStorage(createOilChangeForm, "@OilChange:details");
