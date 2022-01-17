import { FC } from "react";
import Link from "next/link";

import {
  Button,
  ButtonProps,
  ActionIcon,
  ActionIconProps,
} from "@mantine/core";

export type NavLinkProps = ButtonProps<any> & {
  to: string;
};

export const NavLink: FC<NavLinkProps> = ({ to, children, ...rest }) => {
  return (
    <Link href={to} passHref>
      <Button component="a" fullWidth {...rest}>
        {children}
      </Button>
    </Link>
  );
};
