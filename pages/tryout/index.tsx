/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { GetServerSideProps, NextPage as NP } from "next";
import type { ReactElement } from "react";

interface PropsI {
  placeholder: boolean;
}

type paramsType = {
  siteId: string;
};

export const getServerSideProps: GetServerSideProps<
  PropsI,
  paramsType
> = async (ctx) => {
  const { params } = ctx;

  console.log({ ENV: process.env.NODE_ENV });
  console.log({ DB: process.env.DATABASE_URL });
  console.log({ KOBAYASHI: process.env.KOBAYASHI });

  params?.siteId; //

  return {
    props: {
      placeholder: true,
    },
  };
};

const Tryout: NP<PropsI> = (props) => {
  //

  console.log(props);

  return <div>🦉</div>;
};

export default Tryout;
