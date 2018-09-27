import * as React from "react";
import styled from "styled-components/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import logo from "../assets/img/logo_app.png";

const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  background-color: #22211f;
`;

const Content = styled.View`
  flex: 1;
  justify-content: flex-start;
`;

const Header = styled.View`
  flex: 1;
  max-height: 50px;
  background-color: #d65625;
  justify-content: flex-start;
  flex-direction: row;
`;

const Logo = styled.Image`
  flex: 1;
  width: undefined;
  height: undefined;
`;

const ButtonStyled = styled.TouchableOpacity`
  align-items: center;
  background-color: transparent;
  width: 30px;
  padding-top: 18px;
`;

const CommonPage = ({ children, navigation }) => (
  <Container>
    <Header>
      <ButtonStyled onPress={() => navigation.openDrawer()}>
        <FontAwesome5 name="bars" solid />
      </ButtonStyled>
      <Logo source={logo} resizeMode="contain" />
    </Header>
    <Content>{children}</Content>
  </Container>
);

export default CommonPage;
