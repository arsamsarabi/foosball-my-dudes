import { FC } from "react";
import { useMantineTheme } from "@mantine/core";
import Image from "next/image";

import { logo } from "../config";

export type LogoProps = {};

export const Logo: FC<LogoProps> = (props) => {
  const theme = useMantineTheme();
  return (
    <>
      <Image
        src={logo[theme.colorScheme]}
        alt="Foosball Dude logo"
        width={50}
        height={50}
      />
    </>
  );
};
