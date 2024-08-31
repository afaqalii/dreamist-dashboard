export interface sizeAndQantityState {
    string: string,
    value: string,
    quantity: number
}
export interface Article {
    id: string;
    hexValue: string,
    color: string,
    images: (string | File)[],
    productSizeAndQuantity: sizeAndQantityState[];
}
export interface ArticleDropdownProps {
    article: Article;
}

export interface Color {
    value: string;
    string: string;
}
export interface currentArticleForm {
    id: string;
    hexValue: string;
    color: string;
    images: (string | File)[];
    taanQuantity?: number | null,
    productSizeAndQuantity?: sizeAndQantityState[] | null;
}
export interface productSliceForm {
    id?: string; // because we don't have ID before adding the productForm to database thats why its optional or can be undefined
    productName: string;
    productPrice: string;
    fabricLength?: string | undefined | null;
    salePercentage?: string;
    productDescription: string;
    activeColor: string;
    sizeChart: string | File,
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