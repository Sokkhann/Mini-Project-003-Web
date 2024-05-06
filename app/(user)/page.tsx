"use client";
import CardComponent from "@/components/card/CardComponent";
import Hero from "@/components/hero/Hero";
import CarouselComponent from "@/components/rollercoaster/RollerCoaster";
import { BASE_URL } from "@/lib/constants";
import { useGetProductsQuery } from "@/redux/services/product";
import { Pagination } from "@nextui-org/react";
import { useSession } from "next-auth/react";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";


export default function Page() {

	
	const [products, setProducts] = useState([]);
	const router                  = useRouter();

	const onPageChange = (page: number) => setCurrentPage(page);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPage] = useState(1);

	// for pagination
	useEffect(() => {
		const fetchData = async () => {
		 const response = await fetch(`${BASE_URL}/api/products/?page=${currentPage}&page_size=10`);
		 const data = await response.json();
		 console.log(data.results)
		 setProducts(data.results);
		 const totalPage = Math.ceil(data.total/10);
		 setTotalPage(totalPage); // Assuming 10 items per page
	   
		};
	   
		fetchData();
	   }, [currentPage]);
	   
	   const handleNextPage = () => {
		setCurrentPage(currentPage + 1);
	   };
	   
	   const handlePrevPage = () => {
		setCurrentPage(currentPage - 1);
	   };

	  // Get products with generated hook
	const { data, error, isLoading } = useGetProductsQuery({
		page    : 1,
		pageSize: 10,
	});

	console.log("Data: ", data);

	  useEffect(() => {
	  	fetch(`${BASE_URL}/api/products`)
	  		.then((res) => res.json())
	  		.then((data) => setProducts(data.results));
	    console.log("Data", products)
	  }, []);

	return (
		<>
			{/* hero section */}
			<Hero/>

			{/* text for seperate */}
			<div className="text-center">
				<p className="p-[20px] md:text-[20px] text-center sm:text-base lg:text-[26px] font-semibold mt-8 z-10">
					Top Trending
				</p>
				<hr className="bg-[#2b2b2b] border-none h-[1px] w-[50%] mx-auto mb-10" />
			</div>

			{/* infinite carousel */}
			<CarouselComponent/>

			{/* fetching products */}
			<div className = "gap-2 grid grid-cols-2 sm:grid-cols-5 px-24 py-2">
				{products.map((product: any, index) => (
					<CardComponent
						onClick = {() => router.push(`${product.id}`)}
						key     = {index}
						id      = {product.id}
						title   = {product.name}
						image   = {product.image}
						price   = {product.price}
						desc 	= {product.desc}
					/>
				))}
			</div>

			<div className="flex overflow-x-auto sm:justify-center my-8">
				<Pagination color="warning" isCompact showControls total={totalPages} initialPage={1} page={currentPage}
					onChange={onPageChange}/>
			</div>

		</>
	);
}
