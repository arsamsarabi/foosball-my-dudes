import React, { FC, forwardRef } from "react";
import { Box, CloseButton, Image } from "@mantine/core";

import { Text } from "../../Text";

export type MultiSelectItemProps = {
  value: any;
  label: string;
  picture: string;
  tag: string;
  onRemove: () => void;
};

// eslint-disable-next-line react/display-name
export const MultiSelectItem = forwardRef<HTMLDivElement, MultiSelectItemProps>(
  ({ tag, picture, label, value, ...others }, ref) => (
    <div ref={ref} {...others}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Box mr={10}>
          <Image src={picture} alt={label} width={24} />
        </Box>
        <Text>{`${label} - ${tag}`}</Text>
      </Box>
    </div>
  )
);

export default MultiSelectItem;
