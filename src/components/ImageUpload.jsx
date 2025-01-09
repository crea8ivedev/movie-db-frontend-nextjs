import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import cn from "classnames";

export default function ImageUpload({ file, setFile, error }) {
  const [preview, setPreview] = useState(file);
  const [isDragging, setIsDragging] = useState(false);
  const { t } = useTranslation();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      updateFile(selectedFile);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);

    const selectedFile = event.dataTransfer.files[0];
    if (selectedFile) {
      updateFile(selectedFile);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  const updateFile = (selectedFile) => {
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(selectedFile);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreview(null);
    document.getElementById("dropzone-file").value=""
  };

  return (
    <div className="flex items-center justify-center w-full px-10 md:px-0 md:w-[60%] lg:w-[45%]">
      <div
        className={cn(
          "flex flex-col items-center justify-center w-full border-2 rounded-lg cursor-pointer bg-primary-light aspect-[3/4] relative",
          isDragging ? "border-primary border-dotted" : "border-gray-400 border-dashed"
        )}
        style={{
          backgroundImage: preview ? `url(${preview})` : null,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "10px",
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {preview ? (
          <button onClick={handleRemoveFile} className="absolute top-6 right-6 p-2 bg-red-400 text-white rounded-md">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
              className="size-6"
            >
              <path d="m289.94 256 95-95A24 24 0 0 0 351 127l-95 95-95-95a24 24 0 0 0-34 34l95 95-95 95a24 24 0 1 0 34 34l95-95 95 95a24 24 0 0 0 34-34z"></path>
            </svg>
          </button>
        ) : null}
        <label
          htmlFor="dropzone-file"
          className="w-full h-full flex flex-col items-center justify-center"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {!preview ? (
              <>
                <svg
                  className="w-8 h-8 mb-4 text-gray-400 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-300">
                  {t("addMovie.placeholder.file")}
                </p>
                <p className="text-xs text-gray-400">
                  PNG, JPG, JPEG (MAX. 800x400px)
                </p>
                {error && (
                  <span className="text-red-500 text-sm mt-1">
                    {t(error.message)}
                  </span>
                )}
              </>
            ) : null}
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept="image/png, image/jpeg, image/jpg"
          />
        </label>
      </div>
    </div>
  );
}
