import React from 'react';
import { Redirect } from 'react-router';
import styled from 'styled-components';
import { STATIC_ASSETS } from '../constants/paths';
import {
  StyledUserImg,
  StyledAge,
  StyledName,
} from './styledComponents/common';

const TRANSITION_TIME = '0.25s';

const StyledWrapper = styled.div`
  padding: 40px 35px;
  background-color: #ffffff;
  border-radius: 6px;
  transition: transform ${TRANSITION_TIME}, box-shadow ${TRANSITION_TIME};

  &:hover {
    transform: scale(1.1) translateY(-20px);
    box-shadow: 5px 20px 30px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
`;

const StyledContentWrapepr = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledLanguages = styled.div`
  margin-top: 10px;
  color: #000000;
  text-align: center;
  font-size: 14px;
  line-height: 16px;
`;

export class UserCard extends React.Component {
  state = {
    shouldRedirect: false,
  };

  redirectToUserPage = () => this.setState({ shouldRedirect: true });

  render() {
    const { name, age, photo, knowledge, id } = this.props;

    if (this.state.shouldRedirect) {
      return <Redirect push to={`/user/${id}`} />;
    }

    const languages = knowledge.map(item => item.language).join(', ');

    return (
      <StyledWrapper onClick={this.redirectToUserPage}>
        <StyledContentWrapepr>
          <StyledUserImg src={`${STATIC_ASSETS.images}/${photo}`} alt={name} />
          <StyledName>{name}</StyledName>
          <StyledAge>{age} years</StyledAge>
          <StyledLanguages>{languages}</StyledLanguages>
        </StyledContentWrapepr>
      </StyledWrapper>
    );
  }
}
