// import axios from 'axios';
import { useState, useEffect } from 'react';
import { PATHS } from '../config/constants';
import useStore from '../store';

function useWatchlist(userId) {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const store = useStore();

  useEffect(() => {
    if (!userId) {
      return { watchlist: null, loading: false };
    }

    const fetchWatchlist = async () => {
      // const res = await axios.get(PATHS.API.WATCHLIST);
      const params = new URLSearchParams({ uuid: userId });
      const res = await fetch(`${PATHS.API.WATCHLIST}?${params}`);
      const data = await res.json();
      store.load(data);

      setWatchlist(data);
      setLoading(false);
    };

    if (!store.watchlist) {
      fetchWatchlist();
      // store.load(watchlist);
    } else {
      console.log('store.watchlist', store.watchlist);
    }
  }, []);

  return { watchlist, loading };
}

export default useWatchlist;
