import { Article } from "./interfaces/productSlice";

export const isCurrentArticleValid = (article: Article): boolean => {
  return article.hexValue !== '' &&
    //    article.color !== '' &&
    article.images.length > 0 &&
    article.productSizeAndQuantity.length > 0;
};
export const calculatePrice = (price, percentage) => {
  percentage = percentage / 100;
  let priceReduced = price * percentage; // this is the amount of money reduced due to applied percentage
  return parseInt(price - priceReduced).toLocaleString();
};
// this function replaces firebse storage URL with imagekit.io url
export function getUrlAfterAppspot(url) {
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
