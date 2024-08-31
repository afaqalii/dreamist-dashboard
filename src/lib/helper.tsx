import { Article, currentArticleForm, productSliceForm } from "./interfaces/productSlice";

export const isCurrentArticleValid = (article: currentArticleForm): boolean => {
  return (
    article.color !== '' &&
    article.hexValue !== '' &&
    article.images.length > 0 
    // Array.isArray(article.productSizeAndQuantity) && 
    // article.productSizeAndQuantity.length > 0 
  );
};

export const calculatePrice = (price: string, percentage: string) => {
  let Cpercentage = parseInt(percentage);
  let CPrice = parseInt(price);
  Cpercentage = Cpercentage / 100;
  let priceReduced = CPrice * Cpercentage; // this is the amount of money reduced due to applied Cpercentage
  return (CPrice - priceReduced).toLocaleString();
};
// this function replaces firebse storage URL with imagekit.io url
export function getUrlAfterAppspot(url: string) {
  const baseUrl = "appspot.com/";
  // If the URL is undefined or null, return a placeholder string
  if (!url) {
    return "placeholder_image_url"; // You can replace this with an actual placeholder URL
  }
  const index = url.indexOf(baseUrl);
  if (index !== -1) {
    return url.substring(index + baseUrl.length);
  }
  // If the baseUrl is not found, return a placeholder string
  return "placeholder_image_url"; // You can replace this with an actual placeholder URL
}

export function validateProductForm(productForm: productSliceForm): boolean {
  if (
    !productForm.productName ||
    !productForm.productPrice ||
    !productForm.productDescription ||
    !productForm.activeColor ||
    !productForm.sizeChart ||
    !productForm.productCategory ||
    !productForm.productGender ||
    productForm.articles.length === 0 ||
    productForm.colors.length === 0
  ) {
    return false;
  } else
    return true;
}

export const formatPrice = (price: string) => {
  return `PKR ${parseInt(price).toLocaleString()}`;
};
