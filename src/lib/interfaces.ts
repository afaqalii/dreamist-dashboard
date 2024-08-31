import { Article, Color, sizeAndQantityState } from "./interfaces/productSlice";
export interface UIState {
  isSidebarOpen: boolean;
}
// export interface Article {
//   id: string;
//   hexValue: string,
//   color: string,
//   images: string[],
//   productSizeAndQuantity: sizeAndQantityState[];
// }
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

interface items {
  id: string,
  color: string,
  images: string[],
  productName: string,
  productPrice: string,
  quantity: string,
  size: string,
}
interface orderDetails {
  phoneNumber: string,
  address: string,
  fullName: string;
  city: string,
  province: string;
}
export interface order {
  id: string;
  items: items[];
  orderDetails: orderDetails,
  orderDate: string,
  status: "pending" | "delivered" | "canceled" | "returned"
}

