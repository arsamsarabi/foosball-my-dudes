import { FC } from "react";

import { Title } from "./Text";
import { Logo } from "./Logo";

export type HeaderProps = {};

export const Header: FC<HeaderProps> = (props) => {
  return (
    <>
      <Logo />
      <Title order={4} ml={18}>
        Foosball My Dudes
      </Title>
    </>
  );
};
