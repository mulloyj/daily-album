import type { NextPage } from "next";
import Navbar from "../components/Navbar";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Album-a-Day</title>
      </Head>
      <Navbar />
    </div>
  );
};

export default Home;
