import { FC, MouseEvent } from "react";
import Link from "next/link";

import {
  Button,
  ButtonProps,
  ActionIcon,
  ActionIconProps,
} from "@mantine/core";

export type NavLinkProps = ButtonProps<any> & {
  to: string;
  onButtonClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

export const NavLink: FC<NavLinkProps> = ({
  to,
  children,
  onButtonClick,
  ...rest
}) => {
  return (
    <Link href={to} passHref>
      <Button
        component="a"
        fullWidth
        {...rest}
        onClick={(e: MouseEvent<HTMLButtonElement>) => {
          onButtonClick && onButtonClick(e);
        }}
      >
        {children}
      </Button>
    </Link>
  );
};
