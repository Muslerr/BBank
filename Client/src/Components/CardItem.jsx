import React from 'react';
import { Card, CardBody, CardFooter, Image,Skeleton,Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';
import ModalForm from './ModalForm';
const CardItem = ({ card, bankName }) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    
    return (
    <>      
    <Card shadow="sm" key={card.cardNumber} className="m-0.5"   isPressable onPress={onOpen}>
      <CardBody className=" p-0  w-[100%]">
        <Image
          shadow="sm"
          radius="lg"
          src={`../../../${card.cardImage}`}
        />
      </CardBody>
      <CardFooter className="text-small justify-between">
        <b>{card.cardNumber}</b>
        <p className="text-default-500">bank:{bankName}</p>
      </CardFooter>
    </Card>
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <ModalForm card={card} onClose={onClose} ></ModalForm>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CardItem;