import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LikedMovies {
  likedMovies: string[];
  addLikedMovies: (id: string) => void;
  removeLikedMovies: (id: string) => void;
}

export const LikedMoviesStore = create<LikedMovies>()(
  persist(
    (set) => ({
      likedMovies: [],
      addLikedMovies: (id) =>
        set((state) => {
          if (!state.likedMovies.includes(id)) {
            return { likedMovies: [...state.likedMovies, id] };
          }
          return state;
        }),
      removeLikedMovies: (id) =>
        set((state) => ({
          likedMovies: state.likedMovies.filter((movieId) => movieId !== id),
        })),
    }),
    {
      name: "likedMovies", // Локальное хранилище
    }
  )
);
