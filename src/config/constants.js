let BASE_API_URL;

if (process.env.NODE_ENV === 'development') {
  BASE_API_URL = 'http://localhost:5000';
} else if (process.env.NODE_ENV === 'production') {
  BASE_API_URL = 'https://snapstock.herokuapp.com';
}

export const PATHS = {
  ROUTES: {
    HOME: '/',
    SIGN_IN: '/accounts/signin',
    SIGN_UP: '/accounts/signup',
    WATCHLIST: '/watchlist',
    SYMBOL: '/stocks/:symbol',
    RESET_PASSWORD: '/accounts/password',
  },

  API: {
    BASE_URL: BASE_API_URL,
    GAINERS: `${BASE_API_URL}/api/stocks/market/list/gainers`,
    LOSERS: `${BASE_API_URL}/api/stocks/market/list/losers`,
    MOST_ACTIVE: `${BASE_API_URL}/api/stocks/market/list/mostactive`,
    TOP_HEADLINES: `${BASE_API_URL}/api/news/top-headlines`,
    MARKET_INDICES: `${BASE_API_URL}/api/stocks/market/indices`,
    WATCHLIST: `${BASE_API_URL}/api/watchlist`,
    STOCKS: `${BASE_API_URL}/api/stocks/`,
  },

  AUTH: {
    REGISTER: `${BASE_API_URL}/auth/register`,
  },
};
