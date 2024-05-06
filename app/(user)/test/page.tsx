"use client";
import CardCartComponent from "@/components/card/CardCartComponent";
import CardComponent from "@/components/card/CardComponent";
import PaginationComponent from "@/components/pagination/paginationComponent";
import { decrement, increment } from "@/redux/features/counter/counterSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useGetProductsQuery } from "@/redux/services/product";
import { Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ENDPOINT = "https://fakestoreapi.com/products/";

export default function page() {
	const dispatch = useAppDispatch();
	const count = useAppSelector((state)=>state.counter.value);
	
	return (
		<>
		<div className="flex justify-center">
		<h1 className="text-center text-3xl text-red-600">Hellos This is the Count {count}</h1>
		<Button onClick={()=> dispatch(increment())}>
			Increase By One
		</Button>
		<Button onClick={()=> dispatch(decrement())}>
			Decrease
		</Button>
		<PaginationComponent/>
		</div>

		<h1>
			Card Cart
		</h1>

		<CardCartComponent/>
		{/* <CardDetailComponent/> */}
		</>
	);
}
