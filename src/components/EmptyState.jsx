import React from "react";
import Button from '@/components/Button'

import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

export default function EmptyState() {
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <div className="grid place-content-center h-screen">
      <div className="space-y-6 flex flex-col items-center">
        <h1 className="text-4xl text-white font-semibold">
          {t("emptyState.heading")}
        </h1>
        <Button onClick={()=>router.push("/movies/create")}>{t("emptyState.addMovie")}</Button>
      </div>
    </div>
  );
}
