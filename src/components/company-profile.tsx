import React, { useState, Fragment } from 'react';
import styled from 'styled-components';
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from 'react-icons/ai';

interface Profile {
  CEO: string;
  description: string;
  industry: string;
  website: string;
}

const CompanyProfile = ({ profile }: { profile: Profile | null }) => {
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
              {profile.website.includes('//')
                ? profile.website.split('//')[1]
                : profile.website}
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
