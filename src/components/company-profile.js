import React, { useState, Fragment } from 'react';
import styled from 'styled-components';
import trimUrl from '../utils/trim-url';
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from 'react-icons/ai';

const CompanyProfile = ({ profile }) => {
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible((prevState) => !prevState);
  };

  return !profile ? null : (
    <Section>
      <div className="section-title">
        <span>Company Profile</span>
        {isVisible ? (
          <AiOutlineMinusSquare
            className="toggle-btn"
            onClick={toggleVisibility}
            size={20}
          />
        ) : (
          <AiOutlinePlusSquare
            className="toggle-btn"
            onClick={toggleVisibility}
            size={20}
          />
        )}
      </div>
      {isVisible && (
        <Fragment>
          <p className="description">{profile.description}</p>
          <div className="flex">
            <span>Industry</span>
            <span>{profile.industry}</span>
          </div>
          <div className="flex">
            <span>CEO</span>
            <span>{profile.CEO}</span>
          </div>
          <div className="flex">
            <span>Website</span>
            <a target="_blank" rel="noopener noreferrer" href={profile.website}>
              {trimUrl(profile.website)}
            </a>
          </div>
        </Fragment>
      )}
    </Section>
  );
};

const Section = styled.section`
  margin-bottom: 2rem;
  font-size: 0.875rem;

  @media (min-width: 900px) {
    font-size: 0.9375rem;
  }

  .description {
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }

  a:hover {
    border-bottom: 1px solid currentColor;
  }

  .flex {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding: 0.25rem 0;

    span {
      font-size: 0.75rem;
      min-width: 65px;

      @media (min-width: 900px) {
        font-size: 0.875rem;
      }
    }

    span:nth-child(2) {
      text-align: right;
    }
  }
`;

export default CompanyProfile;
