export interface Article {
    id: string;
    hexValue: string,
    color: string,
    images: File[] | string[],
    productSizeAndQuantity: sizeAndQantityState[];
}
export interface ArticleDropdownProps {
    article: Article;
}
export interface sizeAndQantityState {
    string: string,
    value: string,
    quantity: number
}
export interface Color {
    value: string;
    string: string;
}
export interface currentArticleForm {
    id: string;
    hexValue: string;
    color: string;
    images: File[] | string[];
    productSizeAndQuantity: sizeAndQantityState[];
}
export interface productSliceForm {
    productName: string;
    productPrice: string;
    salePercentage: string;
    productDescription: string;
    activeColor: string;
    productCategory: string;
    productGender: string;
    articles: Article[];
    colors: Color[],
    currentArticleInd: number;
}
export interface ProductSliceState {
    isDialogOpen: boolean;
    articleEditMode: boolean;
    currentArticle: currentArticleForm;
    productForm: productSliceForm,
}

export interface ArticleDialogProps {
    isDialogOpen: boolean;
    setIsDialogOpen: (arg0: boolean) => void;
}