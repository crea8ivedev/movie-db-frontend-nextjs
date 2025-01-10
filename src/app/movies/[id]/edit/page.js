"use client";

import React, { useEffect, useState } from "react";
import MovieForm from "@/components/MovieForm";
import axios from "@/utils/axios";
import Loading from "@/components/Loading";
import { useParams } from "next/navigation";

export default function EditMovie() {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchMovie() {
    const { data: movies } = await axios.get(`/api/movies/${id}`);
    setIsLoading(false);
    setMovie(movies);
  }

  useEffect(() => {
    fetchMovie();
  }, []);
  const { id } = useParams();

  if (isLoading) return <Loading />;

  return <MovieForm id={id} value={movie} isEdit />;
}
