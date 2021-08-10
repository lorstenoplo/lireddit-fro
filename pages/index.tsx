import { withUrqlClient } from "next-urql";
import Head from "next/head";
import { useState } from "react";
import Navbar, { isServer } from "../components/Navbar";
import {
  useDeletePostMutation,
  useMeQuery,
  usePostsQuery,
} from "../src/generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import UpdootSection from "../components/UpdootSection";
import Link from "next/link";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string,
  });
  const [{ data, fetching, error }] = usePostsQuery({
    variables,
  });
  const [{ data: uData }] = useMeQuery({
    pause: isServer(),
  });

  const [, deletePost] = useDeletePostMutation();

  if (!fetching && !data) {
    return <p className="text-red-500">{error?.message}</p>;
  }

  return (
    <div>
      <Head>
        <title>Lireddit</title>
      </Head>
      <Navbar />
      <div className="flex flex-col items-center">
        {!data && fetching ? (
          <div>Loading...</div>
        ) : (
          data!.posts.posts.map((p) =>
            !p ? null : (
              <div
                key={p.id}
                className="w-7/12 my-4 p-6 bg-white shadow-md rounded flex"
                style={{ borderColor: "#e2e8f0", borderWidth: "1px" }}
              >
                <UpdootSection p={p} />
                <div className="flex-1">
                  <Link href="/post/[id]" as={`/post/${p.id}`}>
                    <a>
                      <div className="font-bold text-lg hover:underline">
                        {p.title}
                      </div>
                    </a>
                  </Link>
                  <div className="text-gray-500 mb-4">
                    Posted by {p?.creator?.username}
                  </div>
                  <div>{p.textSnippet}</div>
                </div>
                {p.creator.id === uData?.me?.id && (
                  <>
                    <button
                      className="bg-red-500 h-10 w-10 rounded-lg flex items-center justify-center focus:bg-red-700"
                      style={{ color: "white" }}
                      onClick={() => {
                        deletePost({ id: p.id });
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                    <Link href="/post/edit/[id]" as={`/post/edit/${p.id}`}>
                      <a>
                        <button className="ml-4 bg-gray-300 h-10 w-10 rounded-lg flex items-center justify-center focus:bg-gray-400">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                      </a>
                    </Link>
                  </>
                )}
              </div>
            )
          )
        )}
        {data && data.posts.hasMore ? (
          <button
            onClick={() => {
              setVariables({
                limit: 10,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              });
            }}
            className="my-6 ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:ring-2 focus:ring-indigo-500 hover:bg-gray-200 rounded text-lg"
          >
            Load More
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
