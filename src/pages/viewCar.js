// @flow
import * as React from 'react';
import { ScrollView, AsyncStorage } from 'react-native';
import styled from 'styled-components/native';
import { withFormik } from 'formik';
import * as yup from 'yup';
import idx from 'idx';

import withStorage from '../components/AsyncStorage/DataHoc';

import TextField from '../components/common/TextFieldFormik';

const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  padding: 5px;
`;

class ViewCar extends React.PureComponent {
  render() {
    console.log(this.props.values);

    return (
      <ScrollView>
        <Container>
          <TextField label="Manufacturer" name="manufacturer" />
          <TextField label="Model" name="model" />
          <TextField label="Year" name="year" />
          {/* <Button title="Save" onPress={handleSubmit} /> */}
        </Container>
      </ScrollView>
    );
  }
}

const formWithFormik = withFormik({
  mapPropsToValues: (props) => {
    const { navigation, listCars } = props;
    const carId = navigation.getParam('carId', 'NO-ID');
    const car = listCars.filter(val => val.date === carId)[0];
    console.log('=======', idx(car, _ => _.manufacturer));

    return {
      manufacturer: idx(car, _ => _.manufacturer) || '',
      model: idx(car, _ => _.model) || '',
      year: idx(car, _ => _.year) || '',
      date: idx(car, _ => _.date) || '',
    };
  },
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
})(ViewCar);

export default withStorage(formWithFormik);
