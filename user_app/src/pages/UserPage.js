import React from 'react';
import styled from 'styled-components';
import media from '../constants/media';
import { User } from '../graphql/queries.graphql';
import { QueryWithSpinner } from '../components/QueryWithSpinner';
import { EditableUserCard } from '../components/EditableUserCard';
import { BackButton } from '../components/BackButton';

const StyledBackBtnWrapper = styled.div`
  margin-top: 29px;
  margin-left: 74px;

  ${media.tablet`margin-left: 0;`};
`;

export const UserPage = ({
  match: {
    params: { userID },
  },
}) => (
  <div>
    <StyledBackBtnWrapper>
      <BackButton />
    </StyledBackBtnWrapper>
    <QueryWithSpinner query={User} variables={{ id: Number(userID) }}>
      {({ user }) => <EditableUserCard key={user.id} {...user} />}
    </QueryWithSpinner>
  </div>
);
