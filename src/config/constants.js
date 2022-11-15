let HEROKU_BASE_API_URL, RENDER_BASE_API_URL;

if (process.env.NODE_ENV === 'development') {
  HEROKU_BASE_API_URL = 'http://localhost:5000';
  RENDER_BASE_API_URL = 'http://localhost:4000';
} else if (process.env.NODE_ENV === 'production') {
  HEROKU_BASE_API_URL = 'https://snapstock.herokuapp.com';
  RENDER_BASE_API_URL = 'https://snapstock-node.onrender.com';
}

export const PATHS = {
  ROUTES: {
    HOME: '/',
    PROFILE: '/profile',
    RESET_PASSWORD: '/accounts/password',
    SIGN_IN: '/accounts/signin',
    SIGN_UP: '/accounts/signup',
    SYMBOL: '/stocks/:symbol',
    WATCHLIST: '/watchlist',
  },

  API: {
    BASE_URL: HEROKU_BASE_API_URL,
    GAINERS: `${HEROKU_BASE_API_URL}/api/stocks/market/list/gainers`,
    LOSERS: `${HEROKU_BASE_API_URL}/api/stocks/market/list/losers`,
    MOST_ACTIVE: `${HEROKU_BASE_API_URL}/api/stocks/market/list/mostactive`,
    TOP_HEADLINES: `${HEROKU_BASE_API_URL}/api/news/top-headlines`,
    MARKET_INDICES: `${RENDER_BASE_API_URL}/api/stocks/market/indices`,
    WATCHLIST: `${RENDER_BASE_API_URL}/api/watchlist`,
    STOCKS: `${HEROKU_BASE_API_URL}/api/stocks/`,
    SEARCH: `${HEROKU_BASE_API_URL}/api/stocks/search`,
  },

  AUTH: {
    REGISTER: `${RENDER_BASE_API_URL}/auth/register`,
    LOGIN: `${RENDER_BASE_API_URL}/auth/login`,
  },
};

export const STRINGS = {
  URL: {
    PRIVACY_POLICY:
      'https://www.freeprivacypolicy.com/privacy/view/c6ca6de4535056aa3ab9331aa2f12158',
    IEX_CLOUD: 'https://iexcloud.io',
  },
};
