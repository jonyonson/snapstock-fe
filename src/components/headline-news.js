import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import { BASE_API_URL } from '../constants';

function formatDistanceFromNow(publishedAt) {
  let distanceInWords = formatDistanceToNow(new Date(publishedAt), {
    addSuffix: true,
  });

  // `about 4 hours ago` -> `4 hours ago`
  return distanceInWords.startsWith('about')
    ? distanceInWords.slice(6)
    : distanceInWords;
}

function NewsHeadlines() {
  const [headlines, setHeadlines] = useState([]);

  useEffect(() => {
    const url = `${BASE_API_URL}/api/news/top-headlines`;
    axios
      .get(url)
      .then((res) => {
        console.log(res);
        setHeadlines(res.data);
      })
      .catch((err) => {
        console.log(err);
        // TODO: handle errors
      });
  }, []);

  const mostRecentHeadline =
    headlines.length > 0
      ? headlines[0].title.slice(0, headlines[0].title.lastIndexOf('-') - 1)
      : '';

  return (
    <Section>
      {headlines.length > 0 && (
        <a href={headlines[0].url} className="most-recent-story">
          <div className="most-recent-story__headline">
            {mostRecentHeadline}
          </div>
          <img
            className="most-recent-story__image"
            src={headlines[0].urlToImage}
            alt=""
          />
        </a>
      )}
      <div className="section-title">Latest News</div>
      {headlines
        .filter((_, index) => index > 0 && index <= 4)
        .map((story) => {
          return (
            <div key={story.url} className="article">
              <div className="time">
                {formatDistanceFromNow(story.publishedAt)}
              </div>
              <a href={story.url} target="_blank" rel="noopener noreferrer">
                {story.title}
              </a>
            </div>
          );
        })}
    </Section>
  );
}

const Section = styled.section`
  margin-top: 2rem;
  margin-bottom: 2rem;
  font-size: 0.875rem;

  .most-recent-story {
    &__headline {
      font-size: 20px;
      line-height: 1.1;
      margin-bottom: 1rem;
    }

    &__image {
      max-width: calc(100% + 2rem);
      margin-bottom: 2rem;
      margin-left: -1rem;
      /* margin-right: -1rem; */

      @media (min-width: 415px) {
        max-width: 100%;

        margin-left: 0;
      }
    }
  }

  @media (min-width: 500px) {
    font-size: 0.9375rem;
  }

  .article {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 0.5rem;
    margin-bottom: 0.5rem;
  }

  a {
    color: ${(props) => props.theme.colors.black};
  }

  .time {
    color: ${(props) => props.theme.colors.accent};
    font-size: 0.75rem;
    font-weight: bold;
  }
`;

export default NewsHeadlines;
