import React from 'react';
import styled from 'styled-components';

function CompanyProfile({ profile }) {
  return !profile ? null : (
    <Styled>
      <div className="section-title">Company Profile</div>
      <p className="description">{profile.description}</p>
      {/* <div className="flex">
        <span>Exchange</span>
        <span>{profile.exchange}</span>
      </div> */}
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
    </Styled>
  );
}

const Styled = styled.div`
  margin-top: 2rem;
  font-size: 0.875rem;

  @media (min-width: 500px) {
    font-size: 0.9375rem;
  }

  .description {
    /* margin-bottom: 1rem; */
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
    /* margin-bottom: 1rem; */
  }
`;

export default CompanyProfile;
