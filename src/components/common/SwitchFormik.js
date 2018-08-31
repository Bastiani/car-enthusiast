import * as React from "react";
import { View, Text, Switch } from "react-native";
import styled from "styled-components/native";
import get from "lodash/get";
import { connect } from "formik";

const Error = styled.Text`
  color: #f44453;
  margin-top: -9px;
  margin-bottom: 10px;
`;

class SwitchFormik extends React.Component {
  handleChange = value => {
    const { name, formik } = this.props;

    formik.setFieldValue(name, value);
  };

  render() {
    const { name, label, formik } = this.props;
    const { values, errors, touched } = formik;
    const value = get(values, name, "");
    const wasTouched = get(touched, name);
    const fieldError = wasTouched && get(errors, name, null);

    return (
      <View>
        <Text>{label}</Text>
        <Switch
          value={value}
          onValueChange={value => this.handleChange(value)}
        />
        {fieldError && <Error>{fieldError}</Error>}
      </View>
    );
  }
}

export default connect(SwitchFormik);
