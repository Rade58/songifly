/* eslint jsx-a11y/anchor-is-valid: 1 */
import React, { useState, useCallback } from "react";
import type { FC, ReactNode, ChangeEvent } from "react";

import useAuthActor from "@/hooks/xstate/actors/useAuthActor";

interface Props {
  children?: ReactNode;
}

interface PrOne extends Props {
  signin: true;
  signup?: false;
}

interface PrTwo extends Props {
  signup: true;
  signin?: false;
}

const SignInOrUpForm: FC<PrOne | PrTwo> = ({ signup, signin }) => {
  const [
    {
      value,
      context: { disableForms, isLoading },
    },
    dispatch,
  ] = useAuthActor();

  const [{ email, password, username }, setState] = useState<{
    email: string;
    password: string;
    username?: string;
  }>({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = useCallback(() => {
    //

    if (signup) {
      dispatch({
        // @ts-ignore
        type: "MAKE_SIGNUP_REQUEST",
        payload: {
          username,
          email,
          password,
        },
      });
    }
    if (signin) {
      dispatch({
        // @ts-ignore
        type: "MAKE_SIGNIN_REQUEST",
        payload: {
          email,
          password,
        },
      });
    }
  }, [email, password, username, dispatch, signup, signin]);

  console.log({ email, password, username });

  return (
    <>
      <div className="form-control w-full max-w-xs">
        <label className="label" htmlFor="email">
          <span className="label-text">What is your email?</span>
          {/* <span className="label-text-alt">Alt label</span> */}
        </label>
        <input
          onChange={handleChange}
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          className="input input-bordered w-full max-w-xs"
          disabled={disableForms}
        />
      </div>
      <div className="form-control w-full max-w-xs">
        <label className="label" htmlFor="password">
          <span className="label-text">What is your password?</span>
          {/* <span className="label-text-alt">Alt label</span> */}
        </label>
        <input
          onChange={handleChange}
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          className="input input-bordered w-full max-w-xs"
          disabled={disableForms}
        />
      </div>
      {signup && (
        <div className="form-control w-full max-w-xs">
          <label className="label" htmlFor="username">
            <span className="label-text">What is your username?</span>
            {/* <span className="label-text-alt">Alt label</span> */}
          </label>
          <input
            onChange={handleChange}
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            className="input input-bordered w-full max-w-xs"
            disabled={disableForms}
          />
        </div>
      )}
      <div className="border-0 border-gray-600 w-80 flex">
        {signup ? (
          <input
            onClick={handleSubmit}
            value={"Sign Up"}
            className={`btn btn-primary mt-6 ml-auto loading`}
            type="submit"
            disabled={disableForms}
          />
        ) : (
          <input
            onClick={handleSubmit}
            value={"Log In"}
            className={`btn btn-primary mt-6 ml-auto loading`}
            type="submit"
            disabled={disableForms}
          />
        )}
      </div>
    </>
  );
};

export default SignInOrUpForm;
