"use client";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useEffect } from "react";
import { fetchUserProfile } from "@/redux/features/userProfile/userProfileSlice";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useGetProductsQuery } from "@/redux/services/product";
import CreateProductForm from "@/app/(admin)/product/page";

export default function page() {
	const { data: session } = useSession();
	// console.log(session);
	const router = useRouter();

	// if user is not signed in
	// if (!session) {
	// 	return router.push("/login");
	// }

	return (
		// <main className="w-full h-screen flex flex-col justify-center items-center">
		// 	<div className="w-44 h-44 relative mb-4">
		// 		<Image
		// 			src={session.user?.image as string}
		// 			fill
		// 			alt=""
		// 			className="object-cover rounded-full"
		// 		/>
		// 	</div>
		// 	<p className="text-2xl mb-2">
		// 		Welcome <span className="font-bold">{session.user?.name}</span>. Signed
		// 		In As
		// 	</p>
		// 	<p className="font-bold mb-4">{session.user?.email}</p>
		// 	<button
		// 		className="bg-red-600 py-2 px-6 rounded-md"
		// 		onClick={() => signOut()}
		// 	>
		// 		Sign out
		// 	</button>
		// </main>
		<>
		<CreateProductForm/>
		</>
	);
}
