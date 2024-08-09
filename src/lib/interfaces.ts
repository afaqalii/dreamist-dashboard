import { Color, sizeAndQantityState } from "./interfaces/productSlice";
export interface Article {
  id: string;
  hexValue: string,
  color: string,
  images: string[],
  productSizeAndQuantity: sizeAndQantityState[];
}
export interface UIState {
  isSidebarOpen: boolean;
}
export interface TitleProps {
  children: React.ReactNode;
  className?: string;
  isRootLetter?: boolean;
}
export interface Product {
  id: string;
  productName: string;
  productPrice: string;
  salePercentage: string;
  productDescription: string;
  activeColor: string;
  productCategory: string;
  productGender: string;
  articles: Article[];
  colors: Color[],
}