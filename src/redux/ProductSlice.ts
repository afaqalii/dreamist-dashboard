import { sizeAndQuantityArray } from '@/lib/data';
import { Article, Color, ProductSliceState } from '@/lib/interfaces/productSlice';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: ProductSliceState = {
    isDialogOpen: false,
    currentArticle: {
        id: "",
        hexValue: "",
        color: "",
        images: [],
        productSizeAndQuantity: sizeAndQuantityArray
    },
    productForm: {
        productName: "",
        productPrice: "",
        salePercentage: "",
        productDescription: "",
        activeColor: "",
        productCategory: "T-Shirts",
        productGender: "Male",
        articles: [],
        colors: [],
        currentArticleInd: -1,
    }
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        openArticleDialog(state) {
            state.isDialogOpen = true;
        },
        closeArticleDialog(state) {
            state.isDialogOpen = false;
        },
        setProductName(state, action: PayloadAction<string>) {
            state.productForm.productName = action.payload;
        },
        setProductPrice(state, action: PayloadAction<string>) {
            state.productForm.productPrice = action.payload;
        },
        setSalePercentage(state, action: PayloadAction<string>) {
            state.productForm.salePercentage = action.payload;
        },
        setProductDescription(state, action: PayloadAction<string>) {
            state.productForm.productDescription = action.payload;
        },
        setActiveColor(state, action: PayloadAction<string>) {
            state.productForm.activeColor = action.payload;
        },
        setProductCategory(state, action: PayloadAction<string>) {
            state.productForm.productCategory = action.payload;
        },
        setProductGender(state, action: PayloadAction<string>) {
            state.productForm.productGender = action.payload;
        },
        addArticle(state, action: PayloadAction<Article>) {
            state.productForm.articles.push(action.payload);
            state.currentArticle = {
                id: "",
                hexValue: "",
                color: "",
                images: [],
                productSizeAndQuantity: sizeAndQuantityArray
            };
        },
        editArticle(state, action: PayloadAction<Article>) {
            const index = state.productForm.articles.findIndex(article => article.id === action.payload.id);
            if (index !== -1) {
                state.productForm.articles[index] = action.payload;
            }
        },
        removeArticle(state, action: PayloadAction<string>) {
            state.productForm.articles = state.productForm.articles.filter(article => article.id !== action.payload);
        },
        removeExtraLargeSize(state) {
            state.currentArticle.productSizeAndQuantity = state.currentArticle.productSizeAndQuantity.filter((x) => x.value !== "xxl");
        },
        showExtraLargeSize(state) {
            state.currentArticle.productSizeAndQuantity = [...sizeAndQuantityArray];
        },
        updateQuantity(state, action: PayloadAction<{ size: string, quantity: number }>) {
            const { size, quantity } = action.payload;
            if (quantity >= 0) {
                const sizeItem = state.currentArticle.productSizeAndQuantity.find(item => item.value === size);
                if (sizeItem) {
                    sizeItem.quantity = quantity;
                }
            }
        },
        uploadImages(state, action: PayloadAction<string[]>) {
            state.currentArticle.images.push(...action.payload);
        },
        removeImage(state, action: PayloadAction<number>) {
            state.currentArticle.images.splice(action.payload, 1);
        },
        removeAllImages(state) {
            state.currentArticle.images = [];
        },
        updateSelectedColor(state, action: PayloadAction<string>) {
            state.currentArticle.hexValue = action.payload;
        },
        resetCurrentArticle(state) {
            state.currentArticle = {
                id: "",
                hexValue: "",
                color: "",
                images: [],
                productSizeAndQuantity: sizeAndQuantityArray
            };
        },
        addProductColor(state, action: PayloadAction<Color>) {
            state.productForm.colors.push(action.payload);
        },
        removeProductColor(state, action: PayloadAction<number>) {
            state.productForm.colors.splice(action.payload, 1);
        },
    },
});

export const {
    setProductName,
    setProductPrice,
    setSalePercentage,
    setProductDescription,
    setActiveColor,
    setProductCategory,
    setProductGender,
    addArticle,
    editArticle,
    removeArticle,
    openArticleDialog,
    closeArticleDialog,
    removeExtraLargeSize,
    showExtraLargeSize,
    updateQuantity,
    uploadImages,
    removeImage,
    removeAllImages,
    updateSelectedColor,
    resetCurrentArticle,
    addProductColor,
    removeProductColor,
} = productSlice.actions;

export default productSlice.reducer;
