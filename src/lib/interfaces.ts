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

export interface Items {
  id: string;
  color: string;
  image: string;
  name: string;
  price: string;
  quantity: string;
  size: string;
}

export interface OrderDetails {
  phoneNumber: string;
  address: string;
  fullName: string;
  city: string;
  province: string;
  email: string;
}

export interface Order {
  id: string;
  items: Items[];
  orderDetails: OrderDetails;
  orderDate: string;
  status: "pending" | "delivered" | "canceled" | "returned";
}