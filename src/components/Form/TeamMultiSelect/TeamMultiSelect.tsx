import React, { FC } from "react";
import { MultiSelect, SelectItem } from "@mantine/core";
import { AiOutlineTeam } from "react-icons/ai";

import MultiSelectValue from "./MultiSelectValue";
import MultiSelectItem from "./MultiSelectItem";
import { CreateGameInput } from "../../../types";
import { Text } from "../../Text";

export type TeamMultiSelectProps = {
  data: Array<SelectItem>;
  teamNumber: 1 | 2;
  onChange: (value: Array<string>) => void;
  value: any;
  opponents: Array<string>;
};

export const TeamMultiSelect: FC<TeamMultiSelectProps> = ({
  data,
  teamNumber,
  onChange,
  value,
  opponents,
}) => {
  const name = teamNumber === 1 ? "teamOne" : "teamTwo";

  const filteredData: Array<SelectItem> = data.filter(
    (d) => opponents.indexOf(d.value) === -1
  );

  return (
    <>
      <label htmlFor={name}>Team {teamNumber}:</label>
      <MultiSelect
        id={name}
        name={name}
        data={filteredData}
        valueComponent={MultiSelectValue}
        itemComponent={MultiSelectItem}
        placeholder={`Team ${teamNumber} players`}
        label={`Who played as Team ${teamNumber}?`}
        description="Select up to 2 players"
        searchable
        clearable
        clearButtonLabel="Clear"
        required
        dropdownPosition="flip"
        icon={<AiOutlineTeam />}
        limit={20}
        maxSelectedValues={2}
        nothingFound="No friends found!"
        radius="sm"
        onChange={onChange}
        value={value}
      />
    </>
  );
};

export default TeamMultiSelect;
