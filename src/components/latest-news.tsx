import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import { BASE_API_URL } from '../constants';

type FixMeLater = any;

function formatDistanceFromNow(publishedAt: Date) {
  let distanceInWords = formatDistanceToNow(new Date(publishedAt), {
    addSuffix: true,
  });

  // `about 4 hours ago` -> `4 hours ago`
  return distanceInWords.startsWith('about')
    ? distanceInWords.slice(6)
    : distanceInWords;
}

function LatestNews() {
  const [headlines, setHeadlines] = useState<FixMeLater>([]);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    axios
      .get(BASE_API_URL + '/api/news/top-headlines')
      .then((res) => setHeadlines(res.data))
      .catch((err) => console.error(err));
  }, []);

  const title = headlines.length > 0 ? headlines[0].title : null;

  const mostRecentHeadline =
    headlines.length > 0 ? title.slice(0, title.lastIndexOf('-') - 1) : '';

  const source =
    headlines.length > 0
      ? title.slice(-(title.length - title.lastIndexOf('-') - 2))
      : null;

  return (
    <Section>
      <div className="most-recent-story">
        {headlines.length > 0 && (
          <a
            href={headlines[0].url}
            className="most-recent-story__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <figure>
              <div className="most-recent-story__link__image">
                <img
                  onLoad={() => setImageLoaded(true)}
                  src={headlines[0].urlToImage}
                  alt=""
                />
                {/* <div className="fade" /> */}
              </div>

              <div className="most-recent-story__link__image__headline">
                {mostRecentHeadline}
              </div>
              {imageLoaded && <figcaption>{source}</figcaption>}
            </figure>
          </a>
        )}
      </div>

      <div className="latest-news">
        <div className="section-title">Latest News</div>
        {headlines
          .filter((_: FixMeLater, index: FixMeLater) => index > 0 && index <= 5)
          .map((story: FixMeLater) => {
            return (
              <a
                href={story.url}
                target="_blank"
                rel="noopener noreferrer"
                key={story.url}
                className="article"
              >
                <div className="time">
                  {formatDistanceFromNow(story.publishedAt)}
                </div>
                <div className="article__inner">
                  <div className="title">{story.title}</div>
                  <img src={story.urlToImage} alt="" />
                </div>
              </a>
            );
          })}
      </div>
    </Section>
  );
}

const Section = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
  font-size: 0.875rem;

  @media (min-width: 770px) {
    margin-top: 0;
  }

  .most-recent-story {
    margin-bottom: 1rem;

    @media (min-width: 770px) {
      margin-bottom: 0;
    }
  }

  .most-recent-story__link {
    &__image {
      position: relative;

      img {
        width: calc(100% + 2rem);
        margin-left: -1rem;

        @media (min-width: 415px) {
          width: calc(100% + 3rem);
          margin-left: -1.5rem;
        }

        @media (min-width: 770px) {
          max-width: 100%;
          margin-left: 0;
          margin-bottom: 0;
        }
      }

      .fade {
        position: absolute;
        bottom: 0;
        left: -1rem;
        width: calc(100% + 2rem);
        height: 100px;
        background: linear-gradient(
          transparent,
          ${(props) => props.theme.colors.primary}
        );

        @media (min-width: 415px) {
          left: -1.5rem;
          width: calc(100% + 3rem);
        }

        @media (min-width: 770px) {
          left: 0;
          width: 100%;
        }
      }

      &__headline {
        background-color: ${(props) => props.theme.colors.primary};
        color: white;
        padding: 1rem;
        line-height: 1.3;
        font-size: 18px;
        font-weight: 900;
        line-height: 1.3;
        margin-left: -1rem;
        width: calc(100% + 2rem);

        @media (min-width: 415px) {
          margin-left: -1.5rem;
          width: calc(100% + 3rem);
          font-size: 20px;
        }

        @media (min-width: 500px) {
          line-height: 1.4;
          padding: 1.5rem;
          font-size: 22px;
        }

        @media (min-width: 600px) {
          font-size: 24px;
        }

        @media (min-width: 770px) {
          font-size: 20px;
          margin-left: 0;
          padding: 1rem;
          width: 100%;
        }

        @media (min-width: 900px) {
          line-height: 1.4;
          padding: 1.5rem;
          font-size: 22px;
        }
      }
    }
  }

  figcaption {
    font-weight: normal;
    font-style: italic;
    margin-top: 0.4rem;
    font-size: 0.75rem;
    text-align: right;
  }

  .latest-news {
    margin-top: 2rem;
    .article {
      display: block;
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      padding-bottom: 1rem;
      margin-bottom: 1rem;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .time {
      color: ${(props) => props.theme.colors.accent};
      font-size: 0.75rem;
      font-weight: bold;
      margin-bottom: 0.2em;
    }

    .article__inner {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;

      img {
        width: 140px;
        margin-left: 1rem;
      }
    }
  }

  a {
    color: ${(props) => props.theme.colors.black};
  }
`;

export default LatestNews;
