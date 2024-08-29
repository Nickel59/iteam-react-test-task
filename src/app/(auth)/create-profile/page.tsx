"use client";

import { HomeIcon } from "@radix-ui/react-icons";
import axios, { type AxiosError } from "axios";
import { Formik } from "formik";
import Link from "next/link";
import React from "react";

import { userDetailsSchema } from "@/app/(auth)/validation-schemas";
import { saveUser } from "@/utils";

export default function CreateProfilePage() {
  const [errorBoxShown, setErrorBoxShown] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const showErrorBox = React.useCallback((errorMsg: string) => {
    setErrorMessage(errorMsg);
    setErrorBoxShown(true);
    setTimeout(() => setErrorBoxShown(false), 3000);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
      <Link href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        <HomeIcon className="w-8 h-8 mr-2" />
      </Link>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Create an account
          </h1>
          <Formik
            initialValues={{ email: "", password: "", name: "", desiredJobTitle: "", aboutMe: "" }}
            validationSchema={userDetailsSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                await axios.post("https://iteam-react-test-task-auth.onrender.com/signup", values, { timeout: 5000 });
              } catch (error) {
                showErrorBox(((error as AxiosError).response?.data as { error: string })?.error);
                setSubmitting(false);
                return;
              }
              saveUser(values.email, values.name, values.desiredJobTitle, values.aboutMe);
              setSubmitting(false);
              window.location.replace("/");
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                  />
                  <div className="block mb-2 text-sm font-medium text-red-500">
                    {errors.email && touched.email && errors.email}
                  </div>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <div className="block mb-2 text-sm font-medium text-red-500">
                    {errors.password && touched.password && errors.password}
                  </div>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                  <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    placeholder="John Black"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <div className="block mb-2 text-sm font-medium text-red-500">
                    {errors.name && touched.name && errors.name}
                  </div>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Desired job title
                  </label>
                  <input
                    type="text"
                    name="desiredJobTitle"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.desiredJobTitle}
                    placeholder="Frontend Developer"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <div className="block mb-2 text-sm font-medium text-red-500">
                    {errors.desiredJobTitle && touched.desiredJobTitle && errors.desiredJobTitle}
                  </div>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">About me</label>
                  <textarea
                    name="aboutMe"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.aboutMe}
                    placeholder="Describe yourself"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <div className="block mb-2 text-sm font-medium text-red-500">
                    {errors.aboutMe && touched.aboutMe && errors.aboutMe}
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign up
                </button>
                {errorBoxShown && (
                  <div
                    className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                  >
                    <span className="font-medium">Error:</span> {errorMessage || "Unknown error"}
                  </div>
                )}
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Have an account?{" "}
                  <Link href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                    Log in
                  </Link>
                </p>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
