import React from "react";
import { Select, SelectItem } from "@nextui-org/react";

const BankCodeFilter = ({ banks, onChange }) => {
  return (
    <Select variant="bordered" items={banks} label="Bank Code" placeholder="Sort By Bank" className="max-w-xs dark m-1" name="BankCode" onChange={onChange}>
      {(bank) => <SelectItem key={bank.bankCode}>{bank.bankCode}</SelectItem>}
    </Select>
  );
};

export default BankCodeFilter;