/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import Link from "next/link";

import ThemeSwitcher from "@/components/ThemeSwitcher";

const Home: NextPage = () => {
  return (
    <div className="border border-teal-400">
      Index page{" "}
      <Link href="/auth">
        <a>auth page</a>
      </Link>
    </div>
  );
};

export default Home;
