import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import {
  setActiveColor,
  addProductColor,
  removeProductColor,
} from '@/redux/ProductSlice';
import { Trash } from 'lucide-react';

const ColorPicker: React.FC = () => {
  const dispatch = useDispatch();
  const colors = useSelector((state: RootState) => state.product.productForm.colors);
  const [newColor, setNewColor] = useState<string>('');
  const [newColorString, setNewColorString] = useState<string>('');

  const handleColorSelect = (color: string) => {
    dispatch(setActiveColor(color));
  };

  const handleAddColor = () => {
    if (newColor && newColorString) {
      dispatch(addProductColor({ value: newColor, string: newColorString }));
      setNewColor('');
      setNewColorString('');
    }
  };

  const handleRemoveColor = (index: number) => {
    dispatch(removeProductColor(index));
  };

  return (
    <div className='bg-white text-black rounded px-4 py-5 mb-5 border-blue border'>
      <ul className='flex flex-wrap w-full gap-4'>
        {colors.map((color, index) => (
          <li
            className='flex gap-2 justify-center items-center shadow-xl px-5 py-2 rounded-full'
            key={index}
          >
            <span
              className='pr-2'
              style={{
                backgroundColor: color.value,
                width: '20px',
                height: '20px',
                display: 'inline-block',
                borderRadius:"100%",
                marginRight: '10px',
              }}
              onClick={() => handleColorSelect(color.value)}
            ></span>
            {color.string}
            <Trash className='cursor-pointer' onClick={() => handleRemoveColor(index)} />
          </li>
        ))}
      </ul>
      <div className='flex mt-4'>
        <input
          name='colorPicker'
          type='color'
          value={newColor}
          onChange={(e) => setNewColor(e.target.value)}
        />
        <input
          type='text'
          name='colorName'
          value={newColorString}
          className='border-2 px-2'
          placeholder='Color name'
          onChange={(e) => setNewColorString(e.target.value)}
        />
        <button onClick={handleAddColor} className='p-1 ml-2 bg-black text-white rounded'>
          Add Color
        </button>
      </div>
    </div>
  );
};

export default ColorPicker;
