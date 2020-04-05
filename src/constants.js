export let BASE_API_URL;

if (process.env.NODE_ENV === 'development') {
  BASE_API_URL = 'http://localhost:5000';
} else if (process.env.NODE_ENV === 'production') {
  BASE_API_URL = 'https://snapstock.herokuapp.com';
}

// BASE_API_URL = 'https://snapstock.herokuapp.com';
