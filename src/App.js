// @flow
import * as React from "react";
import styled from "styled-components/native";

import { createRootNavigator } from "./routes";

import logo from "./assets/img/logo_app.png";

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
  background-color: #693668;
`;

const Logo = styled.Image`
  flex: 1;
  height: 200px;
  width: undefined;
`;

export default class App extends React.PureComponent {
  render() {
    const RootNavigator = createRootNavigator();
    return (
      <Container>
        <Header>
          <Logo source={logo} resizeMode="contain" />
        </Header>
        <Content>
          <RootNavigator />
        </Content>
      </Container>
    );
  }
}
