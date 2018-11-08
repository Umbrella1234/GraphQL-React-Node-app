import React from 'react';
import styled from 'styled-components';
import media from '../constants/media';
import { AllUsers } from '../graphql/queries.graphql';
import { QueryWithSpinner } from '../components/QueryWithSpinner';
import { UserCard } from '../components/UserCard';

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-self: center;
  padding-top: 49px;
  padding-bottom: 138px;
`;

const Grid = styled.div`
  display: grid;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  grid-template-columns: repeat(3, 220px);

  ${media.tablet`grid-template-columns: repeat(2, 220px);`}
  ${media.phone`grid-template-columns: repeat(1, 220px);`};
`;

export const UsersPage = () => (
  <QueryWithSpinner query={AllUsers}>
    {data => (
      <StyledWrapper>
        <Grid>
          {data.allUsers.map(user => (
            <UserCard key={user.id} {...user} />
          ))}
        </Grid>
      </StyledWrapper>
    )}
  </QueryWithSpinner>
);
