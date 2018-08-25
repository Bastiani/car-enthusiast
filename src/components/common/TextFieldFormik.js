import * as React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';
import get from 'lodash/get';
import { connect } from 'formik';

const Input = styled.TextInput`
  border-bottom-color: black;
  border-bottom-width: 1px;
  margin-bottom: 10px;
`;

const Error = styled.Text`
  color: #f44453;
  margin-top: -9px;
  margin-bottom: 10px;
`;

class TextFieldFormik extends React.Component {
  handleChange = event => {
    const { name, formik } = this.props;
    const { text } = event.nativeEvent;

    formik.setFieldValue(name, text);
  };

  render() {
    const { name, label, formik } = this.props;
    const { values, errors, touched } = formik;
    const value = get(values, name, '');
    const wasTouched = get(touched, name);
    const fieldError = wasTouched && get(errors, name, null);

    return (
      <View>
        <Text>{label}</Text>
        <Input value={value} onChange={evt => this.handleChange(evt)} />
        {fieldError && <Error>{fieldError}</Error>}
      </View>
    );
  }
}

export default connect(TextFieldFormik);
