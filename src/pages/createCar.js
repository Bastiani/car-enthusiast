// @flow
import React from 'react';
import { ScrollView, Button, AsyncStorage } from 'react-native';
import styled from 'styled-components/native';
import { withFormik } from 'formik';
import * as yup from 'yup';
import moment from 'moment';

import TextField from '../components/common/TextFieldFormik';

const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  padding: 10px;
`;

const Form = ({ navigation, handleSubmit }) => (
  <ScrollView>
    <Container>
      <TextField label="Manufacturer" name="manufacturer" />
      <TextField label="Model" name="model" />
      <TextField label="Year" name="year" />
      <Button title="Save" onPress={handleSubmit} />
    </Container>
  </ScrollView>
);

export default withFormik({
  mapPropsToValues: () => ({
    manufacturer: '',
    model: '',
    year: '',
    date: moment().format(),
  }),
  validationSchema: yup.object().shape({
    manufacturer: yup.string().required('Preencha o campo Fabricante'),
    model: yup.string().required('Preencha o campo Modelo'),
  }),
  handleSubmit: async (values) => {
    try {
      const existingCars = await AsyncStorage.getItem('@Car:details');
      let newCar = JSON.parse(existingCars);
      if (!newCar) {
        newCar = [];
      }
      newCar.push(values);
      await AsyncStorage.setItem('@Car:details', JSON.stringify(newCar));
    } catch (error) {
      alert(error);
    }
  },
})(Form);
