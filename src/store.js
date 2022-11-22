import create from 'zustand';
// import { PATHS } from './config/constants';

const addToWatchlist = (watchlist, symbol, name, uuid) => [
  ...watchlist,
  { symbol, name, uuid },
];

const useStore = create((set) => ({
  watchlist: null,
  load: (watchlist) => {
    set(() => ({ watchlist }));
  },
  addToWatchlist: (symbol, name, uuid) =>
    set((state) => ({
      ...state,
      watchlist: addToWatchlist(state.watchlist, symbol, name, uuid),
    })),
}));

export default useStore;
