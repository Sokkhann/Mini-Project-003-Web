import CardComponent from "@/components/card/CardComponent";
import CardDetailComponent from "@/components/card/CardDetailComponent";
import { BASE_URL } from "@/lib/constants";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
	params: { id: string };
	name: { title: string};
	searchParams: { [key: string]: string | string[] | undefined };
};

const getData = async (id: string) => {
	const res = await fetch(`${BASE_URL}/api/products/${id}`);
	const data = await res.json();
	console.log(data);
	return data;
};

export async function generateMetadata(
	{ params, searchParams }: Props,
	parent: ResolvingMetadata
): Promise<Metadata> {
	// read route params
	const id = params.id;

	// fetch data
	const product = await fetch(`https://fakestoreapi.com/products/${id}`).then((res) => res.json());

	// optionally access and extend (rather than replace) parent metadata
	// const previousImages = (await parent).openGraph?.images || [];

	return {
		title: product.title,
		description: product.description,
		openGraph: {
			images: product.image,
		},
	};
}


export default async function Detail(props: Props) {
	let data = await getData(props.params.id);

	return (
		<CardDetailComponent
			id={data?.id || "No ID"}
			title={data?.name || "NoTitle"}
			price={data?.price || "No Prce"}
			desc={data?.desc || "No Description"}
			seller={data?.seller || "No Seller"}
			image={
				data?.image ||
				"https://i0.wp.com/sunrisedaycamp.org/wp-content/uploads/2020/10/placeholder.png?ssl=1"
			}
		/>
	);
}
 