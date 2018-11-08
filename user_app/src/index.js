import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { GlobalStyles } from './components/styledComponents/GlobalStyles';
import routes from './routes';
import { renderRoutes } from './utils/renderRoutes';

const apolloClient = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
});

const StyledContainer = styled.div`
  padding 0 15px;
`;

const App = () => (
  <StyledContainer>
    <BrowserRouter>
      <Switch>
        <ApolloProvider client={apolloClient}>
          {renderRoutes(routes)}
        </ApolloProvider>
      </Switch>
    </BrowserRouter>
    <GlobalStyles />
  </StyledContainer>
);

ReactDOM.render(<App />, document.getElementById('root'));
