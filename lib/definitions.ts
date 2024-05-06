export type CartProductType = {
	title: string;
	image: string;
	price: number;
	desc: string;
	seller: string;
	id: number;
	onClick?: () => void;
};

export type ImageType={
    id:number,
    image:string,
    name:string
}

export const initialValues = {
	categoryName: "",
	categoryIcon: "",
	name: "",
	desc: "",
	image: "",
	price: 0,
	quantity: 0,
	fileIcon: null,
	fileProduct: null,
};

export type CatageoryType = {
	name: string;
	icon: string;
};

export type ProductPostType = {
	category: CatageoryType;
	name: string;
	desc: string;
	image: string;
	price: number;
	quantity: number;
};