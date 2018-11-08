import React from 'react';
import { withRouter } from 'react-router-dom';
import ReactSVG from 'react-svg';
import styled from 'styled-components';
import { STATIC_ASSETS } from '../constants/paths';

const HOVER_COLOR = 'grey';

const StyledBackArrow = styled(ReactSVG)`
  display: inline-block;
  margin-right: 10px;

  &:hover + span {
    color: ${HOVER_COLOR};
  }
`;

const StyledBackBtnText = styled.span`
  font-weight: bold;

  &:hover {
    color: ${HOVER_COLOR};
  }
`;

const StyledBackBtnWrapper = styled.span`
  cursor: pointer;
`;

export const BackButton = withRouter(({ history }) => (
  <div>
    <StyledBackBtnWrapper onClick={() => history.goBack()}>
      <StyledBackArrow src={`${STATIC_ASSETS.icons}/back-arrow.svg`} />
      <StyledBackBtnText>Back</StyledBackBtnText>
    </StyledBackBtnWrapper>
  </div>
));
