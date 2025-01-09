"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import axios from "@/utils/axios.js";
import useAuth from "@/hooks/useAuth.js";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

export default function Login() {
  const setIsLogin = useAuth((state) => state.setIsLogin);
  const isLogin = useAuth((state) => state.isLogin);
  const router = useRouter();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    try {
      await axios.post("/api/auth/login", data);
      setIsLogin(true);
      router.push("/movies");
    } catch (error) {
      setError("email", {
        message: error?.response?.data?.message,
      });
    }
  }

  if (isLogin) {
    return router.push("/movies");
  }

  return (
    <div className="grid place-content-center h-[calc(100%_-_62px)]">
      <div className="w-80">
        <h1 className="text-white font-semibold text-[45px] text-center mb-7">
          {t("login.heading")}
        </h1>
        <form
          className="space-y-6 flex flex-col"
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
        >
          <div>
            <Input
              type="text"
              placeholder={t("login.placeholder.email")}
              className="w-full"
              {...register("email", {
                required: "login.error.requires.email",
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                  message: "login.error.validation.email",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-400 text-sm">
                {t(errors.email.message)}
              </span>
            )}
          </div>
          <div>
            <Input
              type="password"
              placeholder={t("login.placeholder.password")}
              className="w-full"
              {...register("password", {
                required: "login.error.requires.password",
                minLength: {
                  value: 8,
                  message: "login.error.validation.password",
                },
              })}
            />
            {errors.password && (
              <span className="text-red-400 text-sm">
                {t(errors.password.message)}
              </span>
            )}
          </div>
          <div className="flex justify-center">
            <label className="inline-flex items-center text-gray-400 space-x-3">
              <Input
                type="checkbox"
                className="checked:bg-primary focus:checked:bg-primary active:bg-primary focus:active:bg-primary focus:outline-none focus:ring-offset-0 cursor-pointer"
                {...register("rememberMe")}
              />
              <span>{t("login.check")}</span>
            </label>
          </div>
          <Button type="submit" className="w-full block">
            {t("login.button")}
          </Button>
        </form>
      </div>
    </div>
  );
}
