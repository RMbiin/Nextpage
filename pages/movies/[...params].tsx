import Seo from "@/components/common/Seo";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import Image from "next/image";
import { styled } from "styled-components";

const Wrapper = styled.div`
  position: relative;
`;
const ImgWrapper = styled.div`
  width: 100%;
  display: grid;
  justify-content: center;
  padding: 1rem 0;
`;
const Info = styled.div`
  padding: 1rem 0;
  margin-bottom: 1rem;
`;

const MovieInfo = ({ params, results }) => {
  const [title] = params || [];
  const { data } = results.queries[0].state;
  return (
    <>
      <Seo title={title} />
      <Wrapper>
        <ImgWrapper>
          <Image
            src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
            alt="Poster"
            priority
            width={500}
            height={700}
          />
        </ImgWrapper>
        <Info>{data.overview}</Info>
      </Wrapper>
    </>
  );
};

export default MovieInfo;

export const getServerSideProps = async ({ params: { params } }) => {
  const queryFn = async (param) => {
    const response = await fetch(`http://localhost:3000/api/movies/${param}`);
    const json = await response.json();
    return json;
  };

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["movie"], () => queryFn(params[1]));

  /*   const results = await (
    await fetch(`http://localhost:3000/api/movies/${params[1]}`)
  ).json(); */

  return {
    props: {
      params,
      results: dehydrate(queryClient),
    },
  };
};
