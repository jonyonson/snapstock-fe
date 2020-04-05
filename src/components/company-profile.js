import React, { useState, Fragment } from 'react';
import styled from 'styled-components';
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from 'react-icons/ai';

function CompanyProfile({ profile }) {
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
          />
        ) : (
          <AiOutlinePlusSquare
            className="toggle-btn"
            onClick={toggleVisibility}
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
            <span>Chief Operating Officer</span>
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
}

const Section = styled.section`
  margin-bottom: 2rem;
  font-size: 0.875rem;

  @media (min-width: 500px) {
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
  }
`;

export default CompanyProfile;
