import React from 'react';

function CompanyNews({ news }) {
  console.log(news);
  return news.length > 0 ? (
    <>
      {news.map((article) => (
        <div key={article.url}>
          <a href={article.url}>{article.headline}</a>
          {/* <img src={article.image} /> */}
        </div>
      ))}
    </>
  ) : null;
}

export default CompanyNews;
