import React from "react";
import { Select, SelectItem } from "@nextui-org/react";

const IsblockedFilter = ({ onChange }) => {
  return (
    <Select
      variant="bordered"
      label="Card availability"
      placeholder="Show Open Cards"
      className="max-w-xs dark m-1"
      name="IsBlocked"
      onChange={onChange}
    >
      <SelectItem key="1" value="1" classNames="dark">
        all cards
      </SelectItem>
      <SelectItem key="2" value="2">
        blocked cards
      </SelectItem>
      <SelectItem key="3" value="3">
        open cards
      </SelectItem>
    </Select>
  );
};

export default IsblockedFilter;
