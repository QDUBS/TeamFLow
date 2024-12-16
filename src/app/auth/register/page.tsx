"use client";

import Error from "@/app/components/forms/Error";
import { AppRoutes } from "@/app/constants/app_routes";
import { CREATE_USER } from "@/app/graphql/mutations/createUser";
import { ISignupFormInputs } from "@/app/interfaces/IAuth";
import { signupFormSchema } from "@/app/yup/schemas/auth";
import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Register: FC<any> = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupFormInputs>({
    resolver: yupResolver(signupFormSchema),
  });

  const [signupMutation, { loading }] = useMutation(CREATE_USER, {
    onCompleted: (data) => {
      localStorage.setItem("token", data.login.token);
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const onSubmit = async (data: ISignupFormInputs) => {
    const { username, password } = data;

    try {
      const { data } = await signupMutation({
        variables: {
          username,
          password,
        },
      });
      const token = data.login;

      alert("Signed up successfully");
      router.push("/auth/login");
    } catch (err) {
      console.error("Signup error:", err);
      alert("Error signing up");
    }
  };

  return (
    <>
      <section className="relative">
        <div
          className="relative bg-cover h-screen"
          id="login-background-image"
        ></div>

        {/* Overlay */}
        <div className="w-full h-screen flex justify-center items-center absolute top-0 left-0 backdrop-blur-md bg-black/10">
          {/* Signup Form */}
          <div className="login-form-container">
            <h1 className="text-black font-bold text-2xl lg:text-3xl">
              Create an account
            </h1>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col mt-20">
                <input
                  type="email"
                  className="pl-4 py-5 bg-[#F3F3F3] rounded-md mt-2 placeholder:font-thin"
                  placeholder="Email"
                  {...register("username")}
                />
                {errors.username && <Error message={errors.username.message} />}
              </div>

              <div className="flex flex-col mt-5">
                <input
                  type="password"
                  className="pl-4 py-5 bg-[#F3F3F3] rounded-md mt-2"
                  placeholder="Password"
                  {...register("password")}
                />
                {errors.password && <Error message={errors.password.message} />}
              </div>

              <div className="flex flex-col mt-14 items-center space-y-4">
                <button className="primary-button w-full" type="submit">
                  {loading ? "Processing..." : "Create account"}
                </button>
                <p className="text-center">
                  By creating an account, you accept our privacy policy
                  <span className="inline-block text-bluestrong underline underline-offset-4 hover:text-bluemedium ml-2">
                    <Link href={AppRoutes.TermsConditions}>
                      terms and conditions
                    </Link>
                  </span>{" "}
                  and our{""}
                  <span className="inline-block text-bluestrong underline underline-offset-4 hover:text-bluemedium ml-2">
                    <Link href={AppRoutes.PrivacyPolicy}>privacy policy</Link>
                  </span>
                </p>
              </div>
            </form>
          </div>

          {/* Register */}
          <div className="signup-container flex flex-col justify-center">
            <h1 className="text-white font-bold text-2xl lg:text-3xl">
              Sign In
            </h1>
            <p className="text-gray-300 font-normal text-md mt-6 lg:text-md">
              Join the Journey to Optimal Health! Already have an account?
            </p>
            <Link href={AppRoutes.Login}>
              <button
                className="auth-secondary-button w-3/6  mt-10"
                type="submit"
              >
                Sign in
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
