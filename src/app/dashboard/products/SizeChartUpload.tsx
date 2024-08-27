import { uploadSizeChart } from "@/redux/ProductSlice";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";

// Define your action creator type
interface SizeChartPropsType {
  selectedImage: string | null | File;
  setSelectedImage: (arg1: string | null | File) => void;
}

const SizeChartUpload: React.FC<SizeChartPropsType> = ({ selectedImage, setSelectedImage }) => {
  const sizeChartRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();

  // Function to handle the image upload
  const handleSizeChartUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      console.error("No file selected");
      return;
    }
    const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!validImageTypes.includes(file.type)) {
      alert("Please upload a valid image file (JPEG, PNG, GIF)");
      return;
    }
    const maxSizeInBytes = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSizeInBytes) {
      alert("File size should be less than 2MB");
      return;
    }
    setSelectedImage(file); // Set the image URL in state
    dispatch(uploadSizeChart(file)); // Dispatch the action with the image URL
  };

  // Function to trigger the hidden file input click
  const handleButtonClick = () => {
    if (sizeChartRef.current) {
      sizeChartRef.current.click();
    }
  };

  return (
    <div className="mt-10">
      <input
        type="file"
        ref={sizeChartRef}
        onChange={handleSizeChartUpload}
        accept="image/jpeg, image/png, image/gif"
        style={{ display: "none" }} // Hide the input
      />

      <button
        onClick={handleButtonClick}
        className="px-4 py-2 bg-blue text-white rounded hover:bg-blue/90"
      >
        Upload Size Chart
      </button>

      {selectedImage && (
        <div className="mt-4">
          <p>Preview:</p>
          <img
            src={typeof selectedImage === "object" ? URL.createObjectURL(selectedImage) : selectedImage}
            alt="Size Chart Preview"
            className="max-w-xs mt-2"
          />
        </div>
      )}
    </div>
  );
};


export default SizeChartUpload;
