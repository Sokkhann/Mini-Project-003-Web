'use client'
import {Button, Card, CardBody, CardFooter, CardHeader, Image, MenuItem, Pagination} from "@nextui-org/react";
import { FaCartPlus } from "react-icons/fa";
import { CartProductType } from "@/lib/definitions";
import { useAppDispatch } from "@/redux/hook";
import { decrement, increment } from "@/redux/features/counter/counterSlice";


export default function CardComponent({id, title, image, price, onClick}: CartProductType) {
  // useAppDispatch is handled on event from user and send it to store
  const dispatch = useAppDispatch();

  return (
    <div>
      <Card isFooterBlurred className="h-96 cursor-pointer">
         <CardHeader onClick={onClick}>
           <Button onClick={()=>dispatch(increment())} className="absolute right-2 top-2 bg-gray-200 h-8 rounded-full">
             <FaCartPlus/>
           </Button>
         </CardHeader>
         <Image onClick={onClick}
           removeWrapper
           alt="Card example background"
           className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
           src={image}
         />
         <CardFooter onClick={onClick} className="absolute bg-gray-100 bottom-0  border-zinc-100 z-10 justify-between">
           <div>
             <p className="text-black text-tiny">{title}</p>
           </div>
           <span className = " text-orange-500 dark:text-white">
        ${price}
       </span>
         </CardFooter>
      </Card>
    </div>
  );
}
