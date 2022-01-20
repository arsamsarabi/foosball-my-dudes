import { FC } from "react";
import { Box, useMantineTheme } from "@mantine/core";
import Image from "next/image";

import { logo } from "../config";

export type LogoProps = {};

export const Logo: FC<LogoProps> = (props) => {
  const theme = useMantineTheme();
  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      })}
    >
      <Image
        src={logo[theme.colorScheme]}
        alt="Foosball Dude logo"
        width={40}
        height={40}
      />
    </Box>
  );
};
