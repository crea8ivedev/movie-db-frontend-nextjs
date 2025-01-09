"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import ImageUpload from "./ImageUpload";
import Input from "./Input";
import Button from "./Button";

import { useRouter } from "next/navigation";

import axios from "@/utils/axios";
import { useTranslation } from "react-i18next";

const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => {
  const year = 1900 + i;
  return { value: year, label: year.toString() };
}).reverse();

const defaultFormValue = {
  title: "",
  year: "",
  poster: "",
};

export default function MovieForm({ value, isEdit = false }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...value,
      year: yearOptions.find((val) => val.value == value?.year),
    },
  });

  const router = useRouter();
  const { id } = router.query;

  const { t } = useTranslation();

  async function onSubmit(data) {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("year", data.year?.value);
    if (typeof data.poster !== "string") {
      formData.append("poster", data.poster);
    }

    const options = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      if (!isEdit) {
        await axios.post(`/api/movies`, formData, options);
      } else {
        await axios.put(`/api/movies/${id}`, formData, options);
      }
      router.push("/movies");
    } catch (error) {}
  }

  const validateFile = (file) => {
    if (isEdit && file) return true;
    if (!file) return "addMovie.error.requires.poster";
    if (!["image/jpg", "image/jpeg", "image/png"].includes(file.type))
      return "Only PNG, JPG and JPEG images are allowed.";
    if (file.size > 2 * 1024 * 1024) return "File size should not exceed 2MB.";
    return true;
  };

  return (
    <div className="container mx-auto max-w-7xl px-4">
      <div className="flex justify-between w-full mb-10">
        <div className="flex items-end space-x-4">
          <h1 className="text-4xl text-white font-semibold leading-none">
            {t(isEdit ? "editMovie.heading" : "addMovie.heading")}
          </h1>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center md:items-start md:flex-row  gap-10 lg:gap-20">
          <Controller
            name="poster"
            control={control}
            rules={{
              validate: validateFile,
            }}
            render={({ field }) => (
              <ImageUpload
                file={field.value}
                setFile={(file) => field.onChange(file)}
                error={errors.poster}
              />
            )}
          />
          <div className="space-y-6 w-full px-10 md:px-0 md:w-[60%] lg:w-[55%]">
            <div>
              <Input
                type="text"
                placeholder={t("addMovie.placeholder.title")}
                className="w-full"
                {...register("title", {
                  required: "addMovie.error.requires.title",
                })}
              />
              {errors.title && (
                <span className="text-red-500 text-sm">
                  {t(errors.title.message)}
                </span>
              )}
            </div>

            <div>
              <Controller
                name="year"
                control={control}
                rules={{ required: "addMovie.error.requires.publish" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={yearOptions}
                    placeholder={t("addMovie.placeholder.publish")}
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                    styles={{
                      control: (base) => ({
                        ...base,
                        border: "none",
                        background: "transparent",
                        boxShadow: "none",
                        padding: "0",
                        width: "",
                      }),
                      menu: (base) => ({
                        ...base,
                        background: "var(--primary-light)",
                        border: "none",
                        color: "#D1D5DB",
                      }),
                      option: (base, state) => ({
                        ...base,
                        background: state.isSelected
                          ? "var(--primary)"
                          : state.isFocused
                          ? "var(--primary)"
                          : "transparent",
                        color: "#ffffff",
                        cursor: "pointer",
                      }),
                      singleValue: (base) => ({
                        ...base,
                        color: "#ffffff",
                        padding: "2px",
                      }),
                      placeholder: (base) => ({
                        ...base,
                        color: "#D1D5DB",
                        fontWeight: "400",
                        padding: "2px",
                      }),
                    }}
                    className="bg-primary-light border-transparent text-gray-300 text-sm rounded-lg focus:ring focus-visible:ring-primary-light focus-visible:border-primary block placeholder:text-gray-400 focus:border-primary/60 w-1/2"
                  />
                )}
              />
              {errors.year && (
                <span className="text-red-500 text-sm">
                  {t(errors.year.message)}
                </span>
              )}
            </div>
            <div className="flex items-center w-full space-x-4 pt-4">
              <Button
                type="button"
                onClick={() => router.push("/movies")}
                className="flex-1 bg-transparent !border-gray-300 focus:bg-primary focus:border-primary hover:border-primary"
              >
                {t("addMovie.button.cancel")}
              </Button>
              <Button type="submit" className="flex-1">
                {t("addMovie.button.submit")}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
