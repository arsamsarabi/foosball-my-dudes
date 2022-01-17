import React from "react";
import Lottie from "lottie-react-web";
import { Box, Container } from "@mantine/core";

import animation from "./animation.json";

export const Loading = () => (
  <Container>
    <Box
      sx={() => ({
        width: "50%",
        margin: "auto",
      })}
    >
      <Lottie
        options={{
          animationData: animation,
        }}
        speed={0.75}
      />
    </Box>
  </Container>
);
