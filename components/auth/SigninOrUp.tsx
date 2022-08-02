/* eslint jsx-a11y/anchor-is-valid: 1 */
import React from "react";
import type { FC, ReactNode } from "react";

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

const SignInOrUpForm: FC<PrOne | PrTwo> = ({ signin, signup }) => {
  return (
    <>
      <div className="form-control w-full max-w-xs">
        <label className="label" htmlFor="email">
          <span className="label-text">What is your email?</span>
          {/* <span className="label-text-alt">Alt label</span> */}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <div className="form-control w-full max-w-xs">
        <label className="label" htmlFor="password">
          <span className="label-text">What is your password?</span>
          {/* <span className="label-text-alt">Alt label</span> */}
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      {signup && (
        <div className="form-control w-full max-w-xs">
          <label className="label" htmlFor="username">
            <span className="label-text">What is your username?</span>
            {/* <span className="label-text-alt">Alt label</span> */}
          </label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
      )}
    </>
  );
};

export default SignInOrUpForm;
