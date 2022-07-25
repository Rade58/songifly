/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC, ReactNode, ReactElement } from "react";
// import type { NextPage as NP } from "next";

import type { NextPageWithLayout } from "@/pages/_app";

// THIS IS REGULAR REACT COMPONENT THAT
// USES ITS children
import PlayerLayout from "@/layouts/PlayerLayout";

const TryoutPage: NextPageWithLayout = () => {
  return <div>👾 glob glob</div>;
};

TryoutPage.getLayout = (page: ReactElement) => {
  return (
    <PlayerLayout>
      {/* YOU CAN STILL DEFINE HERE OTHER LAYOUTS
    // THAT WOULD ALSO WRAP {page} */}
      {/* THESE LAYOUTS ARE NAMED: NESTED LAYOUTS */}
      {page}
    </PlayerLayout>
  );
};

export default TryoutPage;
