import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { v4 as uuidv4 } from 'uuid';
import {
    addArticle,
    closeArticleDialog,
    editArticle,
    removeExtraLargeSize,
    showExtraLargeSize,
    updateQuantity,
    uploadImages,
    removeImage,
    removeAllImages,
    updateSelectedColor,
    updateArticle
} from '@/redux/ProductSlice';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Trash2, Upload } from 'lucide-react';
import { DialogTitle } from '@radix-ui/react-dialog';
import { isCurrentArticleValid } from '@/lib/helper';

const ArticleDialog = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [showSize, setShowSize] = useState(true);
    const { isDialogOpen, articleEditMode, productForm, currentArticle } = useSelector((state: RootState) => state.product);
    const imagesRef = useRef<HTMLInputElement>(null);

    const handleArticle = () => {
        if (currentArticle && isCurrentArticleValid(currentArticle)) {
            if (articleEditMode)
                dispatch(updateArticle(currentArticle))
            else {
                const newArticle = {
                    ...currentArticle,
                    id: uuidv4(),
                };
                dispatch(addArticle(newArticle));
            }
            dispatch(closeArticleDialog());
        } else {
            console.error('All fields must be filled.');
        }
    };
    const handleSaveEdit = () => {
        dispatch(editArticle(currentArticle));
        dispatch(closeArticleDialog());
    };

    const handleSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const filesArray = Array.from(event.target.files).map(file => (file));
            dispatch(uploadImages(filesArray));
        }
    };

    const handleRemoveImgFile = (index: number) => {
        dispatch(removeImage(index));
        if (imagesRef.current?.files) {
            const files = Array.from(imagesRef.current.files);
            files.splice(index, 1);
            const dataTransfer = new DataTransfer();
            files.forEach(file => dataTransfer.items.add(file));
            imagesRef.current.files = dataTransfer.files;
        }
    };
    const handleRemoveAllImages = () => {
        dispatch(removeAllImages());
        if (imagesRef.current) {
            imagesRef.current.value = "";
        }
    };
    const openFile = (ref: React.RefObject<HTMLInputElement>) => {
        if (ref.current) {
            ref.current.click();
        }
    };

    return (
        <Dialog open={isDialogOpen}>
            <DialogContent>
                <DialogTitle>
                    <div>
                        <Label>Select Article Color</Label>
                        <Select value={currentArticle.hexValue} onValueChange={(value) => dispatch(updateSelectedColor(value))}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select color" />
                            </SelectTrigger>
                            <SelectContent>
                                {productForm.colors.map((color) => (
                                    <SelectItem key={color.value} value={color.value}>{color.string}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </DialogTitle>
                <div>
                    <p>{showSize ? 'Remove' : 'Show'} XXL size</p>
                    <Switch onClick={() => {
                        if (showSize) {
                            dispatch(removeExtraLargeSize());
                            setShowSize(false);
                        } else {
                            dispatch(showExtraLargeSize());
                            setShowSize(true);
                        }
                    }} className='mt-2' />
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                    {currentArticle.productSizeAndQuantity.map((info, index) => (
                        <div key={index}>
                            <span className='capitalize'>{info.string}</span>
                            <Input type='number' className='px-2 rounded-sm border-black' value={info.quantity} onChange={(e) =>
                                dispatch(updateQuantity({ size: info.value, quantity: parseInt(e.target.value) }))
                            } />
                        </div>
                    ))}
                </div>
                <section>
                    <input
                        ref={imagesRef}
                        onChange={(e) => handleSelectFile(e)}
                        type="file"
                        name="uploadImages"
                        className="hidden"
                        accept="image/*"
                        id="uploadImages"
                    />
                    {currentArticle.images.length > 0 && (
                        <div className="relative flex flex-wrap gap-2 mr-auto mt-2 mb-4 max-h-[200px] overflow-auto">
                            {currentArticle.images.map((selectedFile, index) => (
                                <div key={index} className="relative max-w-[80px] min-h-[100px] object-cover">
                                    <span className="absolute right-1 top-3 cursor-pointer bg-red-500 rounded-full p-1">
                                        <Trash2 color='white' size="15px" onClick={() => handleRemoveImgFile(index)} />
                                    </span>
                                    <img
                                        src={typeof selectedFile === "string" ? selectedFile : URL.createObjectURL(selectedFile)}
                                        alt="Selected picture"
                                        className="mt-2 object-cover w-full h-full"
                                    />
                                </div>
                            ))}
                            <div className="flex flex-wrap gap-3 w-full mt-4">
                                <button
                                    type='button'
                                    className="bg-blue flex-1 text-white text-sm h-[35px] items-center justify-center px-[15px]"
                                    onClick={() => openFile(imagesRef)}
                                >
                                    Add Image
                                </button>
                                <button
                                    onClick={handleRemoveAllImages}
                                    className="bg-blue flex-1 text-white text-sm h-[35px] items-center justify-center px-[15px]"
                                >
                                    Remove All
                                </button>
                            </div>
                        </div>
                    )}
                    {currentArticle.images.length === 0 && (
                        <div className="mt-3">
                            <h1 className="form-label">
                                Media
                            </h1>
                            <label
                                className="grid place-content-center max-w-[500px] mt-3 py-5 cursor-pointer border-dashed border-2 border-blue w-full"
                                htmlFor="uploadImages"
                            >
                                <Upload className="mx-auto text-4xl text-primary-blue" />
                                <p className="mb-3 font-light">Drop you files here</p>
                                <Button
                                    onClick={() => openFile(imagesRef)}
                                >
                                    choose files
                                </Button>
                            </label>
                        </div>
                    )}
                </section>
                <div>
                    <Button onClick={() => dispatch(closeArticleDialog())} variant="outline">Cancel</Button>
                    <Button onClick={handleArticle}>{articleEditMode ? "Update Article" : "Add Article"}</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ArticleDialog;
