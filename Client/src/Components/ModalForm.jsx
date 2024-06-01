import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { increaseCreditLimit } from "../Services/apiService";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import ErrorMessage from "./Messages/ErrorMessage";
import CreditLimitApproved from "./Messages/CreditLimitApproved";
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

const ModalForm = ({ card, onClose }) => {
  const {data:occupations,isLoading:isLoadingOccupations,error:errorOccupations}=useQuery({
    queryKey:["occupations"]
  });
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
    
    try {
      setError(null);
      setLoading(true);
      await increaseCreditLimit(card.id, formData);
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
      {card.isBlocked && (
        <ErrorMessage
          message={"This card is blocked and it's limit cant be increased"}
        />
      )}
      <form onSubmit={handleSubmit}>
        <ModalBody>
          <Input
            name="wantedAmount"
            label="Wanted Amount (Less than 100000)"
            type="number"
            value={formData.wantedAmount}
            onChange={handleChange}
            required
            disabled={card.isBlocked}
            max={100000}
          />
          <Select
            variant="bordered"
            disabled={card.isBlocked}
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
            disabled={card.isBlocked}
            label="Average Income"
            type="number"
            value={formData.averageIncome}
            onChange={handleChange}
            required
          />
          {!card.isBlocked && <Button
            type="submit"
            isDisabled={!isFormValid()}
            color="primary"
            isLoading={isLoading}
          >
            Submit
          </Button>}
          {error ? (
            <ErrorMessage message={error.response.data} />
          ) : isIncreased ? (
            <CreditLimitApproved />
          ) : (
            ""
          )}
        </ModalBody>
      </form>
    </>
  );
};

export default ModalForm;
