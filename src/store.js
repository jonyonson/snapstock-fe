import create from 'zustand';
// import { PATHS } from './config/constants';

const addToWatchlist = (watchlist, symbol, name, uuid) => [
  ...watchlist,
  { symbol, name, uuid },
];

const useStore = create((set) => ({
  watchlist: null,
  load: (watchlist) => {
    // const params = new URLSearchParams({ uuid });
    // const res = await fetch(`${PATHS.API.WATCHLIST}?${params}`);
    // const data = await res.json();
    // console.log('res', data);
    // set({ watchlist: data });
    console.log('watchlist from', watchlist);
    set((state) => ({ watchlist }));
  },
  addToWatchlist: (symbol, name, uuid) =>
    set((state) => ({
      ...state,
      watchlist: addToWatchlist(state.watchlist, symbol, name, uuid),
    })),
}));

export default useStore;
