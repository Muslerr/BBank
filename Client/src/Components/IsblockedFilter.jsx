import React from "react";
import { Select, SelectItem } from "@nextui-org/react";

const IsblockedFilter = ({ onChange }) => {
  return (
    <Select variant="bordered" label="Card availability" placeholder="Show all" className="max-w-xs dark m-1" name="IsBlocked" onChange={onChange}>
      <SelectItem value="all" classNames="dark">all cards</SelectItem>
      <SelectItem value="true">blocked cards</SelectItem>
      <SelectItem value="false">open cards</SelectItem>
    </Select>
  );
};

export default IsblockedFilter;