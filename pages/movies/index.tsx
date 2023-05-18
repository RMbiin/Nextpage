import Seo from "@/components/common/Seo";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { styled } from "styled-components";

const fetchMovies = async () => {
  const response = await fetch(`/api/movies`);
  const json = await response.json();
  console.log(json);
  const { results } = json;
  return results;
};

const useMovies = () => {
  return useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
    staleTime: 3 * 60 * 1000,
  });
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 600px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 20px;
  gap: 20px;
  h4 {
    font-size: 18px;
    text-align: center;
  }
`;

const Movie = styled.div`
  position: relative;
`;

const MovieImg = styled(Image)`
  max-width: 100%;
  border-radius: 12px;
  height: auto !important;
  position: relative !important;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  transition: transform 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    transform: scale(1.05) translateY(-10px);
  }
`;

const MovieTitle = styled(Link)`
  position: relative;
  cursor: pointer;
  font-weight: bold;
`;

const MovieHome = () => {
  const router = useRouter();
  const movieList = useMovies();

  const handleClick = (id, title) => router.push(`/movies/${title}/${id}`);

  if (movieList.isLoading) return <span>Loading...</span>;
  if (movieList.isError) return <span>Error</span>;

  return (
    <>
      <Seo title="Movies" />
      <Wrapper>
        <Container>
          {movieList.data.map((movie: any) => (
            <Movie key={movie.id}>
              <MovieImg
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt="Poster"
                sizes="100%"
                fill
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
                onClick={() => handleClick(movie.id, movie.original_title)}
              />
              <MovieTitle href={`/movies/${movie.original_title}/${movie.id}`}>
                {movie.original_title}
              </MovieTitle>
            </Movie>
          ))}
        </Container>
      </Wrapper>
    </>
  );
};

export default MovieHome;
