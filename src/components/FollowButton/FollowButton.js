import React from 'react';
import { FaPlus, FaCheck } from 'react-icons/fa';
import PropTypes from 'prop-types';
import './FollowButton.scss';

const FollowButton = ({ followStock, isFollowing }) => (
  <button className="FollowButton" onClick={followStock}>
    {isFollowing ? (
      <FaCheck data-testid="check-icon" />
    ) : (
      <FaPlus data-testid="plus-icon" />
    )}
    <span className="FollowButton-text" data-testid="follow-button-text">
      {isFollowing ? 'Following' : 'Follow'}
    </span>
  </button>
);

FollowButton.propTypes = {
  isFollowing: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
};

export default FollowButton;
