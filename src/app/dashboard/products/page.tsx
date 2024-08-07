'use client'
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setProductName, setProductPrice, setSalePercentage, setProductDescription, setActiveColor, setProductCategory, setProductGender, addArticle, editArticle, removeArticle, openArticleDialog, resetProductStateValues } from '@/redux/ProductSlice';
import { RootState } from '@/redux/store';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import ArticleDialog from './Dialog';
import ArticleDropdown from './ArticleDropdown';
import ColorPicker from './ColorPicker';
import Spinner from '@/components/ui/loader/loader';
import { database, storage } from '@/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { push, set, ref as dbRef } from 'firebase/database';

const ProductPage: React.FC = () => {
  const dispatch = useDispatch();
  const { productForm } = useSelector((state: RootState) => state.product);
  const [isUploading, setIsUploading] = useState(false);

  const handleUploadProduct = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      // Create a copy of the productForm to update it with new image URLs
      let updatedProductForm = { ...productForm, articles: [...productForm.articles] };
      for (const articleIndex in updatedProductForm.articles) {
        const article = updatedProductForm.articles[articleIndex];
        const articleDownloadUrls = [];
        // Iterate over images in each article
        for (const file of article.images) {
          if (typeof file === "object") {
            console.log("File name:", file.name); // Debugging log
            console.log("Product category:", productForm.productCategory); // Debugging log
            if (!file.name || !productForm.productCategory) {
              console.error("File name or product category is undefined");
              setIsUploading(false);
              return; // Exit if file name or category is undefined
            }
            // Create a reference to the file location in Firebase storage
            const imgRef = ref(storage, `${productForm.productCategory}/${file.name}`);
            try {
              await uploadBytes(imgRef, file);
              const url = await getDownloadURL(imgRef);
              articleDownloadUrls.push(url);
            } catch (error) {
              setIsUploading(false);
              return; // Exit on error
            }
          }
        }
        // Update the copied productForm with the new image URLs
        updatedProductForm.articles[articleIndex] = {
          ...article,
          images: articleDownloadUrls,
        };
      }
      // make an array of productColors from the article colors uploaded
      const productColors = updatedProductForm.articles.map(article => ({
        value: article.hexValue,
        string: article.color,
      }));
      // Push product data to Firebase Database
      const newProductRef = push(dbRef(database, `products`));
      await set(newProductRef, {
        ...updatedProductForm,
        productColors,
        id: newProductRef.key,
        createdAt: new Date().toISOString(),
      });
      dispatch(resetProductStateValues())
      setIsUploading(false);
    } catch (error) {
      console.error("Error uploading product data:", error);
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto">
      <ArticleDialog />
      <Tabs defaultValue='product'>
        <TabsList className='my-5'>
          <TabsTrigger className='py-2 px-10' value='product'>Product</TabsTrigger>
          <TabsTrigger className='py-2 px-10' value='articles'>Articles</TabsTrigger>
        </TabsList>
        <>
          <TabsContent value="product">
            <div className="form-group">
              <Label>Product Name</Label>
              <Input value={productForm.productName} onChange={(e) => dispatch(setProductName(e.target.value))} />
            </div>
            <div className="form-group">
              <Label>Product Price</Label>
              <Input value={productForm.productPrice} onChange={(e) => dispatch(setProductPrice(e.target.value))} />
            </div>
            <div className="form-group">
              <Label>Sale Percentage</Label>
              <Input value={productForm.salePercentage} onChange={(e) => dispatch(setSalePercentage(e.target.value))} />
            </div>
            <div className='mb-5'>
              <Label>Select active color</Label>
              <Select value={productForm.activeColor} onValueChange={(value) => {
                dispatch(setActiveColor(value));
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Active Color for an article" />
                </SelectTrigger>
                <SelectContent>
                  {
                    productForm.colors.map((color) => (
                      <SelectItem value={color.value}>{color.string}</SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
            </div>
            {/* color picker component */}
            <div>
              <Label>Add colors for your article</Label>
              <ColorPicker />
            </div>
            <div className="form-group">
              <Label>Product Description</Label>
              <Textarea value={productForm.productDescription} onChange={(e) => dispatch(setProductDescription(e.target.value))} />
            </div>
            <div className='flex gap-5 my-5'>
              <div className="form-group">
                <Label>Product Category</Label>
                <Select value={productForm.productCategory} onValueChange={(value) => {
                  dispatch(setProductCategory(value));
                }}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="T-shirt" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="t-shirt">T-shirt</SelectItem>
                    <SelectItem value="polos">Polos</SelectItem>
                    <SelectItem value="trousers">Trousers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="form-group">
                <Label>Product Gender</Label>
                <Select value={productForm.productGender} onValueChange={(value) => {
                  dispatch(setProductGender(value))
                }}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Male" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="unisex">Unisex</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button disabled={isUploading} onClick={handleUploadProduct} className='mt-5'>{isUploading ? <Spinner /> : 'Upload product'}</Button>
          </TabsContent>
          <TabsContent value="articles">
            <Button onClick={() => dispatch(openArticleDialog())}>Add Article</Button>
            <ul>
              {productForm?.articles?.map((article) => (
                <ArticleDropdown article={article} />
              ))}
            </ul>
          </TabsContent>
        </>
      </Tabs>
    </div>
  );
};

export default ProductPage;
