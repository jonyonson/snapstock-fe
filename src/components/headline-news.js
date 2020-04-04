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

  return (
    <Section>
      <div className="section-title">Latest News</div>
      {headlines.map((story) => {
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
  font-size: 0.875rem;

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
