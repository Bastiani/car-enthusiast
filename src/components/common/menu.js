import * as React from "react";
import styled from "styled-components/native";
import { DrawerItems } from "react-navigation";

import logo from "../../assets/img/logo_app.png";

const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
`;

const Content = styled.View`
  flex: 1;
  justify-content: flex-start;
`;

const Header = styled.View`
  height: 60px;
  background-color: #2ec4b6;
`;

const Logo = styled.Image`
  flex: 1;
  height: 200px;
  width: undefined;
`;

const Menu = props => (
  <Container>
    <Header>
      <Logo source={logo} resizeMode="contain" />
    </Header>
    <Content>
      <DrawerItems {...props} />
    </Content>
  </Container>
);

export default Menu;
