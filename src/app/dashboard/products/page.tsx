'use client'
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { setProductName, setProductPrice, setSalePercentage, setProductDescription, setActiveColor, setProductCategory, setProductGender, addArticle, editArticle, removeArticle, openArticleDialog } from '@/redux/ProductSlice';
import { RootState } from '@/redux/store';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import ArticleDialog from './Dialog';
import ArticleDropdown from './ArticleDropdown';
import ColorPicker from './ColorPicker';

const ProductPage: React.FC = () => {
  const dispatch = useDispatch();
  const { productForm } = useSelector((state: RootState) => state.product);
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
            {/* color picker component */}
            <ColorPicker />

            <div className="form-group">
              <Label>Product Description</Label>
              <Textarea value={productForm.productDescription} onChange={(e) => dispatch(setProductDescription(e.target.value))} />
            </div>
            <div className='flex gap-5 my-5'>
              <div className="form-group">
                <Label>Product Category</Label>
                <Select>
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
                <Select>
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
