import React from 'react';
import { css } from 'react-emotion';
import { Query } from 'react-apollo';
import { GridLoader } from 'react-spinners';

const centered = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const QueryWithSpinner = ({ children, ...graphQLProps }) => {
  return (
    <Query {...graphQLProps}>
      {({ loading, error, data }) => {
        const showSpinner = loading || error;

        if (showSpinner) {
          return <GridLoader className={centered} />;
        }

        return children(data);
      }}
    </Query>
  );
};
