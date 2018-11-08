import React from 'react';
import styled from 'styled-components';
import { Mutation } from 'react-apollo';
import media from '../constants/media';
import { STATIC_ASSETS } from '../constants/paths';
import { UpdateUserCity } from '../graphql/mutations.graphql';
import { User } from '../graphql/queries.graphql';
import {
  StyledUserImg,
  StyledAge,
  StyledName,
} from './styledComponents/common';

const colors = {
  blue: '#47b2ff',
};

const StyledUserImage = styled(StyledUserImg)`
  margin-top: 29px;
`;

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
`;

const StyledSeparator = styled.div`
  margin-top: 20px;
  width: 100%;
  height: 2px;
  background-color: #d5d5d5;
`;

const StyledCountry = styled.div`
  margin-top: 10px;
`;

const LanguageWrapper = styled.div`
  margin-top: 20px;
  font-weight: 700;
`;

const StyledCountryCityBtn = styled.div`
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const StyledSubmitBtn = styled.button`
  width: 85px;
  height: 30px;
  background-color: ${colors.blue};
  border: none;
  border-radius: 4px;
  color: #ffffff;
  cursor: pointer;
  opacity: 0.8;

  &:hover {
    opacity: 1;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
`;

const StyledCountryInput = styled.input`
  width: 170px;
  height: 30px;
  margin-right: 10px;
  margin-left: 9px;
  padding-left: 10px;
  border: none;
  box-shadow: inset rgba(0, 0, 0, 0.25) 0 0 2px;

  &:focus {
    outline: 2px solid ${colors.blue};
  }

  ${media.phone`
    margin-right: 0;
    margin-left: 0;
    margin: 10px 0;
  `};
`;

const StyledCountryForm = styled.form`
  margin-top: 20px;

  ${media.phone`
    display: flex; 
    flex-direction: column;
    align-items: center;
  `};
`;

export class EditableUserCard extends React.Component {
  state = {
    isCountryEditable: false,
    form: {
      country: '',
    },
  };

  makeCountryEditable = () =>
    this.setState({
      isCountryEditable: true,
    });

  setFormData = ({ target: { value, name } }) =>
    this.setState(prevState => ({
      form: { ...prevState.form, [name]: value },
    }));

  onCountryFormSubmit = async (e, UpdateUserCity) => {
    e.preventDefault();

    await UpdateUserCity();

    this.setState(({ isCountryEditable }) => ({
      isCountryEditable: false,
      form: {
        country: ''
      }
    }));
  };

  refetchQueries = result => [
    { query: User, variables: { id: Number(result.data.updateUserCity.id) } },
  ];

  render() {
    const {
      isCountryEditable,
      form: { country },
    } = this.state;
    const { name, age, photo, knowledge, city, id } = this.props;

    return (
      <StyledWrapper>
        <StyledContentWrapper>
          <StyledUserImage
            src={`${STATIC_ASSETS.images}/${photo}`}
            alt={name}
          />
          <StyledName>{name}</StyledName>
          <StyledAge>{age} years</StyledAge>
          {isCountryEditable ? (
            <Mutation
              mutation={UpdateUserCity}
              variables={{ userID: id, city: country }}
              refetchQueries={this.refetchQueries}
            >
              {(UpdateUserCity, { loading }) => (
                <StyledCountryForm
                  onSubmit={e => this.onCountryFormSubmit(e, UpdateUserCity)}
                >
                  Country:
                  <StyledCountryInput
                    type="text"
                    name="country"
                    onChange={this.setFormData}
                    value={country}
                  />
                  <StyledSubmitBtn disabled={loading || !country} type="submit">
                    Submit
                  </StyledSubmitBtn>
                </StyledCountryForm>
              )}
            </Mutation>
          ) : (
            <StyledCountry onClick={this.makeCountryEditable}>
              {
                <StyledCountryCityBtn>
                  {city || 'city is not specified (click to set it)'}
                </StyledCountryCityBtn>
              }
            </StyledCountry>
          )}

          <StyledSeparator />
          {knowledge.map(({ language, frameworks }, i) => (
            <React.Fragment key={i}>
              <LanguageWrapper>{language}</LanguageWrapper>
              <div>{frameworks.join(' - ')}</div>
            </React.Fragment>
          ))}
        </StyledContentWrapper>
      </StyledWrapper>
    );
  }
}
