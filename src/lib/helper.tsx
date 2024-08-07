import { Article } from "./interfaces/productSlice";

export const isCurrentArticleValid = (article: Article): boolean => {
    return article.hexValue !== '' &&
        //    article.color !== '' &&
           article.images.length > 0 &&
           article.productSizeAndQuantity.length > 0;
  };
  