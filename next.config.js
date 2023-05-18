/** @type {import('next').NextConfig} */

const API_KEY = process.env.NEXT_PUBLIC_MOVIE_KEY;

const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["image.tmdb.org"],
  },
  async rewrites() {
    return [
      {
        source: "/api/movies",
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
      },
      {
        source: "/api/movies/:id",
        destination: `https://api.themoviedb.org/3/movie/:id?api_key=${API_KEY}`,
      },
    ];
  },
};

module.exports = nextConfig;
