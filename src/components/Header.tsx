import { FC } from "react";

import { Title } from "./Text";
import { Logo } from "./Logo";
import { Notifications } from "./Notifications";
import { Box, Grid, Group } from "@mantine/core";

export type HeaderProps = {};

export const Header: FC<HeaderProps> = (props) => {
  return (
    <Group direction="row" grow align="center" position="apart">
      <Logo />
      <Title order={4} ml={12}>
        Foosball My Dudes
      </Title>
      <Box
        sx={() => ({
          marginLeft: "auto",
        })}
      >
        <Notifications />
      </Box>
    </Group>
  );
};
