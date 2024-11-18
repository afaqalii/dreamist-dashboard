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
            if (!state.articleEditMode) { // if it is not edit mode then clear the dialog values
                if (state.productForm.productCategory === "unstitched-fabric") {
                    state.currentArticle = {
                        id: "",
                        hexValue: "",
                        color: "",
                        images: [],
                        taanQuantity: null
                    }
                } else {
                    state.currentArticle = {
                        id: "",
                        hexValue: "",
                        color: "",
                        images: [],
                        productSizeAndQuantity: state.productForm.productCategory === "pants" ? sizeAndQuantityArrayForPants : sizeAndQuantityArray,
                    }
                }
            }
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
            if (state.currentArticle.productSizeAndQuantity)
                state.currentArticle.productSizeAndQuantity = state.currentArticle.productSizeAndQuantity.filter((x) => x.value !== "xxl");
        },
        showExtraLargeSize(state) {
            state.currentArticle.productSizeAndQuantity = [...sizeAndQuantityArray];
        },
        updateQuantity(state, action: PayloadAction<{ size: string, quantity: number }>) {
            const { size, quantity } = action.payload;
            if (quantity >= 0 && state.currentArticle.productSizeAndQuantity) {
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
        updateSelectedColor(state, action: PayloadAction<Color>) {
            state.currentArticle.hexValue = action.payload.value;
            state.currentArticle.color = action.payload.string
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
            state.currentArticle.taanQuantity = null;
            state.currentArticle.productSizeAndQuantity = null;
        },
        deActivateClothLength(state) {
            state.productForm.fabricLength = null;
            state.currentArticle.productSizeAndQuantity = sizeAndQuantityArray;
            state.currentArticle.taanQuantity = null
        },
        setClothLength(state, action: PayloadAction<string>) {
            state.productForm.fabricLength = action.payload;
        },
        addPantSize(state) {
            if (state.productForm.productCategory === 'pants' && state.currentArticle.productSizeAndQuantity) {
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
            if (state.productForm.productCategory === 'pants' && state.currentArticle.productSizeAndQuantity && state.currentArticle.productSizeAndQuantity.length > 0) {
                state.currentArticle.productSizeAndQuantity.pop();
            }
        },
        setTaanQuantity(state, action: PayloadAction<number | null>) {
            state.currentArticle.taanQuantity = action.payload
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
    deActivateClothLength,
    setTaanQuantity
} = productSlice.actions;

export default productSlice.reducer;
