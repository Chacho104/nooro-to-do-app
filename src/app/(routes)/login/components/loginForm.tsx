"use client";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import CustomInput from "@/app/components/ui/customInput";

// Form to log in users
const LoginForm = () => {
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col w-[90%] lg:w-[736px] gap-y-4 pt-8 lg:pt-16">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Email is required"),
            password: Yup.string()
              .min(8, "Password must be at least 8 characters long")
              .matches(/[a-zA-Z]/, "Password must contain at least one letter.")
              .matches(/[0-9]/, "Password must contain at least one number.")
              .matches(
                /[^a-zA-Z0-9]/,
                "Password must contain at least one special character."
              )
              .required("Password is required"),
          })}
          onSubmit={async ({ email, password }, { setSubmitting }) => {
            // Call Login function
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-8">
              <CustomInput
                label="Email"
                name="email"
                type="email"
                id="email"
                required
                placeholder="Enter your email"
                autoComplete="email"
              />
              <CustomInput
                label="Password"
                name="password"
                type="password"
                id="password"
                required
                placeholder="Enter your password"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-dark-blue hover:bg-light-blue p-4 rounded-lg text-button-text text-sm font-bold flex items-center justify-center gap-x-2 w-full disabled:cursor-not-allowed"
              >
                Log In
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
