/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC, ReactNode, ReactElement } from "react";
// import type { NextPage as NP } from "next";

import type { NextPageWithLayout } from "@/pages/_app";

//
// AS YOU CAN SEE THIS IS THE PAGE THAT has PER PAGE LAYOUT
//
//
//

import PlayerLayout from "@/layouts/PlayerLayout";

const TryoutPage: NextPageWithLayout = () => {
  return <div>👾 glob glob</div>;
};

TryoutPage.getLayout = (page: ReactElement) => {
  return <PlayerLayout>{page}</PlayerLayout>;
};

export default TryoutPage;
