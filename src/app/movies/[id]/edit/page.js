"use client";
import React, { useEffect, useState } from "react";
import MovieForm from "@/components/MovieForm";
import axios from "@/utils/axios";
import Loading from "@/components/Loading";

export default function EditMovie() {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const id = 123;

  async function fetchMovie() {
    const { data: movies } = await axios.get(`/api/movies/${id}`);
    setIsLoading(false);
    setMovie(movies);
  }

  useEffect(() => {
    fetchMovie();
  }, []);

  if (isLoading) return <Loading />;

  return <MovieForm value={movie} isEdit />;
}
