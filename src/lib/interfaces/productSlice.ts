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
    id?:string; // because we don't have ID before adding the productForm to database thats why its optional or can be undefined
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
export interface ProductSliceState {
    isDialogOpen: boolean;
    articleEditMode: boolean;
    productFormEditMode: boolean;
    currentArticle: currentArticleForm;
    productForm: productSliceForm,
}

export interface ArticleDialogProps {
    isDialogOpen: boolean;
    setIsDialogOpen: (arg0: boolean) => void;
}