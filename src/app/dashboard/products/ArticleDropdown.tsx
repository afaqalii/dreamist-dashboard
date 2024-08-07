import { ArticleDropdownProps } from '@/lib/interfaces/productSlice';
import { editArticle, openArticleDialog, removeArticle, setArticleEditMode } from '@/redux/ProductSlice';
import { AppDispatch } from '@/redux/store';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

const ArticleDropdown = ({ article }: ArticleDropdownProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const [isAccordianOpen, setIsAccordianOpen] = useState(false);

    const handleDelete = () => {
        dispatch(removeArticle(article.id))
    }
    const handleEdit = () => {
        dispatch(setArticleEditMode(true));
        dispatch(editArticle(article))
        dispatch(openArticleDialog());
    }
    return (
        <div className='mt-5'>
            <div onClick={() => setIsAccordianOpen(!isAccordianOpen)} className='flex justify-between p-5 bg-white text-blue cursor-pointer'>
                <h1 className='text-blue'>{article.color} Article</h1>
                <div className='flex items-center gap-3'>
                    <p onClick={handleDelete}>Delete</p>
                    <p onClick={handleEdit}>Edit</p>
                </div>
            </div>
            <div className={`grid overflow-hidden transition-all duration-300 ease-in-out ${isAccordianOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className={`${isAccordianOpen ? "" : "hidden"} overflow-hidden text-blue mt-2 p-4`}>
                    <h1>Color: <span className='font-bold'>{article.color}</span></h1>
                    <div className='mt-2'>
                        <p>Images</p>
                        <div className='flex gap-2'>
                            {article.images.map((selectedFile, index) => (
                                <div key={index} className="relative max-w-[80px] object-cover">
                                    <img
                                        src={
                                            typeof selectedFile === "object"
                                                ? URL.createObjectURL(selectedFile)
                                                : selectedFile
                                        }
                                        alt="Selected picture"
                                        className="mt-2 object-cover w-full h-full"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArticleDropdown