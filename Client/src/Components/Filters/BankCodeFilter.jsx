import React from "react";
import { Select, SelectItem } from "@nextui-org/react";

const BankCodeFilter = ({ banks, onChange }) => {
  return (
    <Select
      variant="bordered"
      label="Bank Code"
      placeholder="Sort By Bank"
      className="max-w-xs dark m-1"
      name="BankCode"
      onChange={onChange}
    >
      <SelectItem value="all" key="all">All Banks</SelectItem>
      {banks.map((bank) => (
        <SelectItem key={bank.bankCode} value={bank.bankCode}>
          {bank.bankCode}
        </SelectItem>
      ))}
    </Select>
  );
};

export default BankCodeFilter;
