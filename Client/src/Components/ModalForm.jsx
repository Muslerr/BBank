import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { increaseCreditLimit } from "../Services/apiService";
import { useContext } from "react";
import { DataContext } from "../Contexts/DataContext";
import ErrorMessage from "./ErrorMessage";
import CreditLimitApproved from "./CreditLimitApproved";
import {
  Select,
  SelectItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

const ModalForm = ({ cardId, onClose }) => {
  const { occupations } = useContext(DataContext);
  const [error, setError] = useState();
  const [isLoading, setLoading] = useState();
  const [isIncreased, setIsIncreased] = useState();
  const [formData, setFormData] = useState({
    wantedAmount: "",
    requestOccupation: "",
    averageIncome: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      setError(null);
      setLoading(true);
      await increaseCreditLimit(cardId, formData);
      setError(null);
      setIsIncreased(true);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  const isFormValid = () => {
    return (
      formData.wantedAmount.trim() !== "" &&
      formData.requestOccupation.trim() !== "" &&
      formData.averageIncome.trim() !== ""
    );
  };

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">
        Increase Credit Limit Request                                                                 
      </ModalHeader>
      
      <form onSubmit={handleSubmit}>
      <ModalBody>
        
          <Input
            name="wantedAmount"
            label="Wanted Amount"
            type="number"
            value={formData.wantedAmount}
            onChange={handleChange}
            required
          />
          <Select
            variant="bordered"
            name="requestOccupation"
            onChange={handleChange}
            items={occupations.map((occupation) => ({
              key: occupation,
              label: occupation,
            }))}
            label="Occupation"
            placeholder="Choose an Occupation"
            className="w-xs dark"
            
          >
            {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
          </Select>
          <Input
            name="averageIncome"
            label="Average Income"
            type="number"
            value={formData.averageIncome}
            onChange={handleChange}
            required
          />
          <Button type="submit" isDisabled={!isFormValid()} color="primary" isLoading={isLoading}>
            Submit
          </Button>
          {error ? <ErrorMessage message={error.response.data} />:isIncreased? <CreditLimitApproved/> : ""}
          
      </ModalBody>
     
      </form>
      
    </>
  );
};

export default ModalForm;
