import { sizeAndQuantityArray, sizeAndQuantityArrayForPants } from '@/lib/data';
import { Article, Color, productSliceForm, ProductSliceState } from '@/lib/interfaces/productSlice';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: ProductSliceState = {
    isDialogOpen: false,
    articleEditMode: false,
    productFormEditMode: false,
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
        productCategory: "t-shirt",
        productGender: "male",
        sizeChart: "",
        articles: [],
        colors: [],
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
            state.articleEditMode = false; // edit modes only need to be true with click on edit otherwise if the modal closes make it false;
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
        editProductForm(state, action: PayloadAction<productSliceForm>) {
            state.productForm = action.payload;
            state.productFormEditMode = true;
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
            if (action.payload) {
                state.currentArticle = action.payload;
            } else {
                console.error("Article not found");
            }
        },
        updateArticle(state, action: PayloadAction<Article>) {
            const index = state.productForm.articles.findIndex(article => article.id === action.payload.id);
            if (index !== -1) {
                state.productForm.articles[index] = action.payload;
            } else {
                console.error("Article not found");
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
        uploadImages(state, action: PayloadAction<File[]>) {
            const newImages = action.payload;
            if (newImages.length > 0) {
                state.currentArticle.images = [
                    ...state.currentArticle.images,  // Keep existing images
                    ...newImages as File[]  // Add new uploaded files
                ];
            }
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
        addProductColor(state, action: PayloadAction<Color>) {
            state.productForm.colors.push(action.payload);
        },
        removeProductColor(state, action: PayloadAction<number>) {
            state.productForm.colors.splice(action.payload, 1);
        },
        setArticleEditMode(state, action: PayloadAction<boolean>) {
            state.articleEditMode = action.payload;
        },
        uploadSizeChart(state, action: PayloadAction<File | string>) {
            const newImage = action.payload;
            if (newImage) {
                state.productForm.sizeChart = newImage
            }
        },
        setPantSize(state) {
            state.currentArticle.productSizeAndQuantity = sizeAndQuantityArrayForPants;
        },
        activateClothLength(state) {
            state.productForm.fabricLength = "4";
        },
        deActivateClothLength(state) {
            state.productForm.fabricLength = null;
        },
        setClothLength(state, action: PayloadAction<string>) {
            state.productForm.fabricLength = action.payload;
        },
        addPantSize(state) {
            if (state.productForm.productCategory === 'pants') {
                const lastSizeEntry = state.currentArticle.productSizeAndQuantity[state.currentArticle.productSizeAndQuantity.length - 1];
                const newSize = lastSizeEntry ? (parseInt(lastSizeEntry.value) + 2).toString() : '30'; // Starting size is '30'

                state.currentArticle.productSizeAndQuantity.push({
                    string: newSize,
                    value: newSize,
                    quantity: 1,  // Default quantity set to 1
                });
            }
        },
        removePantSize(state) {
            if (state.productForm.productCategory === 'pants' && state.currentArticle.productSizeAndQuantity.length > 0) {
                state.currentArticle.productSizeAndQuantity.pop();
            }
        },
        resetProductStateValues(state) {
            state.productForm = {
                productName: "",
                productPrice: "",
                salePercentage: "",
                productDescription: "",
                activeColor: "",
                productCategory: "t-shirt",
                productGender: "male",
                sizeChart: "",
                articles: [],
                colors: [],
            }
            state.currentArticle = {
                id: "",
                hexValue: "",
                color: "",
                images: [],
                productSizeAndQuantity: sizeAndQuantityArray
            };
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
    editProductForm,
    addArticle,
    editArticle,
    updateArticle,
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
    resetProductStateValues,
    addProductColor,
    removeProductColor,
    setArticleEditMode,
    uploadSizeChart,
    setPantSize,
    addPantSize,
    removePantSize,
    activateClothLength,
    setClothLength,
    deActivateClothLength
} = productSlice.actions;

export default productSlice.reducer;
