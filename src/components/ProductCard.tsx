import { useEffect, useState } from "react";
import Spinner from "./ui/loader/loader";
import Image from "next/image";
import { calculatePrice, getUrlAfterAppspot } from "@/lib/helper";
import { productSliceForm } from "@/lib/interfaces/productSlice";
import { Edit2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { editProductForm } from "@/redux/ProductSlice";

const ProductCard = ({ index, item }: { index: number, item: productSliceForm }) => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const [isHovered, setIsHovered] = useState(false);
    const [activeArticle, setActiveArticle] = useState(item);
    const [activeColor, setActiveColor] = useState(item.activeColor);
    const [isLoading, setIsLoading] = useState(false); // New loading state

    // useEffect(() => {
    //     // Extracting the image that matches the activeColor hex value
    //     if (activeColor) {
    //         setIsLoading(true); // Set loading to true when color is changed
    //         const tempActiveArticle = item.articles?.find(
    //             (article) => article.hexValue === activeColor
    //         );
    //         // Set the active image based on the activeColor
    //         if (tempActiveArticle && tempActiveArticle.images.length > 0) {
    //             setActiveArticle(tempActiveArticle);
    //             setIsLoading(false); // Set loading to false when image is set
    //         }
    //     }
    // }, [item, activeColor]);

    useEffect(() => {
        console.log("item", item)
    }, [item])

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleColorChange = (color) => {
        setActiveColor(color.value); // sets the hex value to activeColor
    };

    const handleEdit = () => {
        router.push("/dashboard/products");
        dispatch(editProductForm(item))
    }
    return (
        <div
            className="mb-5"
        >
            <div className="flex items-center gap-4">
                <Trash2 />
                <Edit2 onClick={handleEdit} className="cursor-pointer" />
            </div>
            <figure
                // onClick={() => navigate(`/product/${item.id}/${item.productCategory}`)}
                className={`cursor-pointer relative rounded-lg overflow-hidden h-[320px] min-[420px]:h-[280px] min-[532px]:h-[300px] min-[600px]:h-[380px] min-[800px]:min-h-[400px]`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19)' }}
            >
                <div className="image-wrapper">
                    {activeArticle && activeArticle.articles ? (
                        <>
                            {
                                // false ?
                                // <div className="flex items-center justify-center h-full">
                                //     <Spinner />
                                // </div> :
                                <>
                                    <img
                                        src={item.articles[0].images[0]}
                                        // src={getUrlAfterAppspot(activeArticle.images[0])}
                                        className={`image ${isHovered ? 'image-hidden' : 'image-visible'}`}
                                        alt={item.title}
                                    />
                                    {/* <Image
                                            className={`image ${isHovered ? 'image-visible' : 'image-hidden'}`}
                                            loading="lazy"
                                            src={getUrlAfterAppspot(activeArticle.images[1])}
                                            alt={item.title}
                                            width="400"
                                        /> */}
                                </>
                            }

                        </>
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <Spinner />
                        </div>
                    )}
                </div>
            </figure>
            <div className="flex flex-col-reverse min-[960px]:flex-row mt-2 justify-between gap-3 min-[960px]:gap-5 py-[10px] text-left">
                <div>
                    <h1 className="text-black capitalize text-[13.5px]">
                        {item.productName}
                    </h1>
                    <div className="flex flex-col items-baseline min-[430px]:flex-row min-[430px]:items-center gap-1">
                        <p className={`${item.salePercentage ? "line-through" : ""} mt-[5px] text-black text-[13.5px]`}>
                            PKR {parseInt(item.productPrice).toLocaleString()}
                        </p>
                        {item.salePercentage && (
                            <p className="mt-[5px] bg-yellow px-1 whitespace-nowrap text-black text-[13.5px]">
                                PKR {calculatePrice(item.productPrice, item.salePercentage)}{" "}
                                <span className="ml-2">-{item.salePercentage}%</span>
                            </p>
                        )}
                    </div>
                </div>
                <div>
                    <ul className="flex flex-wrap justify-end items-center gap-1">
                        {item.colors?.map((color) => (
                            <li
                                key={color.value}
                                onClick={() => handleColorChange(color)}
                                style={{ backgroundColor: `${color.value}` }}
                                className={`${color.value == activeColor ? "border-[3px]" : "border-[#ddd] border-[3px]"
                                    }  rounded-full h-5 w-5 cursor-pointer `}
                            ></li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
