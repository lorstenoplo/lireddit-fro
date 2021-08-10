import { withUrqlClient } from "next-urql";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import Navbar from "../../components/Navbar";
import { usePostQuery } from "../../src/generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";

const Post = () => {
  const router = useRouter();
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  const [{ data, fetching, error }] = usePostQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });

  if (fetching) {
    return (
      <>
        <Navbar />
        <div>loading...</div>
      </>
    );
  }

  if (error) {
    return <div color="red">{error.message}</div>;
  }

  if (!data?.post) {
    return (
      <div>
        <Head>
          <title>404</title>
        </Head>
        <Navbar />
        <div className="flex pt-32 items-center justify-center text-2xl font-bold my-10">
          Post Not found
        </div>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>{data.post.title}</title>
      </Head>
      <Navbar />
      <div className="flex justify-center items-center py-10 w-screen">
        <div className="w-1/2">
          <h1 className="text-3xl font-bold mb-6">{data.post.title}</h1>
          <div>{data.post.text}</div>
        </div>
      </div>
    </div>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
