/* eslint jsx-a11y/anchor-is-valid: 1 */
import React from "react";
import type { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  artists: {
    name: string;
  }[];
}

const Artists: FC<Props> = ({ artists }) => {
  return (
    <section>
      {artists.map(({ name }) => (
        <div key={name}>{name}</div>
      ))}
    </section>
  );
};

export default Artists;
