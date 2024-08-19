import { Select } from '@/components/ui/select';
import { formatPrice } from '@/lib/helper';
import { order } from '@/lib/interfaces';
import moment from 'moment';
import React, { useRef, useState } from 'react';

const orderStatusOptions = [
    "pending",
    "delivered",
    "canceled",
    "returned"
];

const Accordian = ({ order }: { order: order }) => {
    const { fullName, address, province, city, phoneNumber } = order?.orderDetails;
    const { items: orderedItems } = order;
    const [open, setOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);  // Specify the type here
    const formattedDate = moment(order.orderDate).format('MMMM Do YYYY, h:mm a');

    const handleButtonClick = () => {
        setOpen(!open);
    };

    const handleSelectClick = (event: { stopPropagation: () => void; }) => {
        event.stopPropagation();
    };

    return (
        <div className='w-full mb-3 text-left'>
            <button
                onClick={handleButtonClick}
                className="flex justify-between items-center flex-wrap gap-4 text-left max-[520px]:text-sm w-full py-5 bg-black text-white px-4 rounded transition-colors duration-300"
            >
                <div>
                    {fullName} from {city + ", " + province} ordered on: {formattedDate}
                </div>
                <div onClick={handleSelectClick}>
                    <Select>
                        {/* Additional select options can be added here */}
                    </Select>
                </div>
            </button>
            <div
                ref={contentRef}
                className={`overflow-hidden transition-all duration-500 ease-in-out`}
                style={{
                    maxHeight: open && contentRef.current ? `${contentRef.current.scrollHeight}px` : '0px'
                }}
            >
                <div className="p-4 bg-gray-900 rounded overflow-x-auto remove-scrollbar">
                    <table className="min-w-full">
                        <thead className='capitalize'>
                            <tr className='max-[520px]:text-sm text-base '>
                                <th className="px-4 py-2">Product details</th>
                                <th className="px-4 py-2">phone number</th>
                                <th className="px-4 py-2">address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderedItems?.map((item, index) => (
                                <tr key={index} className='max-[520px]:text-sm'>
                                    <td className="border px-4 py-2">
                                        <div className="flex max-[520px]:flex-col gap-5">
                                            <figure className="min-w-[100px] max-w-[80px]">
                                                <img
                                                    className="w-full h-full object-cover"
                                                    src={item.images[0]}
                                                    alt={item.productName}
                                                />
                                            </figure>
                                            <div className="text-xs">
                                                <h1 className="text-[13px] font-bold">
                                                    {item.productName}
                                                </h1>
                                                <h1 className="my-2">
                                                    {formatPrice(item.productPrice)}
                                                </h1>
                                                <p className="capitalize mb-1">{item.color}</p>
                                                <p className="capitalize">{item.size}</p>
                                                <p className="capitalize">{item.quantity}X</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="border px-4 py-2">0{phoneNumber}</td>
                                    <td className="border px-4 py-2">{address}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Accordian;
