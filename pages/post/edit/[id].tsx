import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import InputField, { TextField } from "../../../components/InputField";
import Navbar from "../../../components/Navbar";
import {
  usePostQuery,
  useUpdatePostMutation,
} from "../../../src/generated/graphql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { useIsAuth } from "../../../utils/useIsAuth";

const updatePost = () => {
  useIsAuth();
  const [, updatePost] = useUpdatePostMutation();
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
    <div style={{ background: "gainsboro", minHeight: "100vh" }}>
      <Head>
        <title>Update a post | {data.post.title}</title>
      </Head>
      <Navbar />
      <Formik
        initialValues={{ title: data.post.title, text: data.post.text }}
        onSubmit={async (values) => {
          const { error } = await updatePost({
            id: intId,
            ...values,
          });
          if (!error) {
            router.back();
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="container px-5 py-10 mx-auto flex">
              <div className="md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto md:mr-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
                <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
                  Update a Post
                </h2>
                <p className="leading-relaxed mb-5 text-gray-600">
                  Post-ironic portland shabby chic echo park, banjo fashion axe
                </p>

                <InputField bgColour="bg-white" name="title" label="Title" />
                <TextField label="Text" name="text" />

                <button
                  type="submit"
                  className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                >
                  {isSubmitting ? (
                    <div className="loader">Loading...</div>
                  ) : (
                    " Create Post"
                  )}
                </button>
                <p className="text-xs text-gray-500 mt-3">
                  Chicharrones blog helvetica normcore iceland tousled brook
                  viral artisan.
                </p>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default withUrqlClient(createUrqlClient)(updatePost);
