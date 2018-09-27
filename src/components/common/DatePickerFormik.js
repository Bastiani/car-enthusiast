import * as React from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import get from "lodash/get";
import { connect } from "formik";
import DatePicker from "react-native-datepicker";

const Label = styled.Text`
  color: #74716f;
`;

const Error = styled.Text`
  color: #f44453;
  margin-top: -9px;
  margin-bottom: 10px;
`;

class TextFieldFormik extends React.Component {
  handleChange = date => {
    const { name, formik } = this.props;

    formik.setFieldValue(name, date);
  };

  render() {
    const { name, label, formik } = this.props;
    const { values, errors, touched } = formik;
    const value = get(values, name, "");
    const wasTouched = get(touched, name);
    const fieldError = wasTouched && get(errors, name, null);

    return (
      <View>
        <Label>{label}</Label>
        <DatePicker
          style={{ width: 200 }}
          date={value}
          mode="date"
          placeholder="select date"
          format="DD-MM-YYYY"
          // minDate="2016-05-01"
          // maxDate="2016-06-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: "absolute",
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
          }}
          onDateChange={evt => this.handleChange(evt)}
          {...this.props}
        />
        {fieldError && <Error>{fieldError}</Error>}
      </View>
    );
  }
}

export default connect(TextFieldFormik);
