import React from 'react';
import { Card, CardBody, CardFooter, Image,Skeleton } from '@nextui-org/react';

const CardItem = ({ card, bankName }) => {
  
  
    return (
           
    <Card shadow="sm" key={card.cardNumber}   isPressable onPress={() => console.log('item pressed')}>
      <CardBody className="overflow-hidden p-0  w-[100%]">
        <Image
          shadow="sm"
          radius="lg"
          width="400px"
          height="100%" 
          src={`../../../${card.cardImage}`}
        />
      </CardBody>
      <CardFooter className="text-small justify-between">
        <b>{card.cardNumber}</b>
        <p className="text-default-500">bank:{bankName}</p>
      </CardFooter>
    </Card>
    
  );
};

export default CardItem;