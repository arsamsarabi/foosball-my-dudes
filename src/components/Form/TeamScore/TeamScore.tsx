import React, { FC } from "react";
import { NumberInput } from "@mantine/core";
import { BiFootball } from "react-icons/bi";

export type TeamScoreProps = {
  teamNumber: 1 | 2;
  onChange: (value: number) => void;
  value: any;
};

export const TeamScore: FC<TeamScoreProps> = ({
  teamNumber,
  onChange,
  value,
}) => {
  return (
    <NumberInput
      defaultValue={0}
      placeholder="What was the score?"
      description="Enter the final score"
      label={`Team ${teamNumber} score`}
      required
      value={value}
      onChange={onChange}
      icon={<BiFootball />}
      min={0}
      radius="sm"
    />
  );
};

export default TeamScore;
