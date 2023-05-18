import Head from "next/head";

const Seo = ({ title }) => {
  return (
    <Head>
      <title>{title} | NextPage</title>
    </Head>
  );
};

export default Seo;
