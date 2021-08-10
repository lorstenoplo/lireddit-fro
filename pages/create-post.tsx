import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import InputField, { TextField } from "../components/InputField";
import Navbar from "../components/Navbar";
import { useCreatePostMutation } from "../src/generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useIsAuth } from "../utils/useIsAuth";

const CreatePostPg = () => {
  const [, createPost] = useCreatePostMutation();
  const router = useRouter();
  useIsAuth();

  return (
    <div style={{ background: "gainsboro", minHeight: "100vh" }}>
      <Head>
        <title>Create a post</title>
      </Head>
      <Navbar />
      <Formik
        initialValues={{ title: "", text: "" }}
        onSubmit={async (values) => {
          const { error } = await createPost({ input: values });
          if (!error) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="container px-5 py-10 mx-auto flex">
              <div className="md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto md:mr-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
                <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
                  Create a Post
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

export default withUrqlClient(createUrqlClient, { ssr: false })(CreatePostPg);
