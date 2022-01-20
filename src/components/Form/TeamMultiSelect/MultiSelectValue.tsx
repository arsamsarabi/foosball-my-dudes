import React, { FC } from "react";
import { Box, CloseButton, Image } from "@mantine/core";

import { Text } from "../../Text";

export type MultiSelectValueProps = {
  value: any;
  label: string;
  picture: string;
  onRemove: () => void;
};

export const MultiSelectValue: FC<MultiSelectValueProps> = ({
  value,
  label,
  onRemove,
  picture,
  ...others
}) => {
  return (
    <div {...others}>
      <Box
        sx={(theme) => ({
          display: "flex",
          cursor: "default",
          alignItems: "center",
          border: `1px solid ${theme.colors.gray[4]}`,
          paddingLeft: 10,
          borderRadius: 4,
        })}
      >
        <div style={{ marginRight: 10 }}>
          <Image src={picture} alt={label} width={18} radius="sm" />
        </div>
        <Text style={{ lineHeight: 1, fontSize: 12 }}>{label}</Text>
        <CloseButton
          onMouseDown={onRemove}
          variant="transparent"
          size={22}
          iconSize={14}
          tabIndex={-1}
        />
      </Box>
    </div>
  );
};

export default MultiSelectValue;
