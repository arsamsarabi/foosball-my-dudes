import { FC } from "react";
import { Text, Title } from "@mantine/core";
import type { TextProps, TitleProps } from "@mantine/core";
import { useMantineTheme } from "@mantine/core";

const AppText: FC<TextProps<any>> = ({ color, ...rest }) => {
  const { colorScheme, colors } = useMantineTheme();

  return (
    <Text
      style={{
        color:
          colorScheme === "light"
            ? colors.textDark[0]
            : colorScheme === "dark"
            ? colors.textLight[0]
            : "inherit",
      }}
      {...rest}
    />
  );
};

const AppTitle: FC<TitleProps> = ({ color, ...rest }) => {
  const { colorScheme, colors } = useMantineTheme();

  return (
    <Title
      style={{
        color:
          colorScheme === "light"
            ? colors.textDark[0]
            : colorScheme === "dark"
            ? colors.textLight[0]
            : "inherit",
      }}
      {...rest}
    />
  );
};

export { AppText as Text, AppTitle as Title };
