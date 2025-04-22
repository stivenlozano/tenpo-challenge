import axios from "axios";
import { CarouselDataProps, PostersDataProps, TagResponseProps } from "../types";
import { BASE_URL, BASE_IMAGES_URL, HEADERS } from '../util/constants';

export const fetchPopularMovies = async () => {
  const response = await axios.get(
    `${BASE_URL}/trending/movie/week?include_adult=false&include_video=false&language=es-ES&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte={min_date}&release_date.lte={max_date}`,
    HEADERS
  );
  const movies = response.data.results.slice(0, 10);
  const data: CarouselDataProps[] = [];

  movies.map((movie: CarouselDataProps) => {
    data.push({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      backdrop_path: BASE_IMAGES_URL + movie.backdrop_path,
      genre_ids: movie.genre_ids,
    });
  });

  return data;
};

export const fetchMovies = async (idTag: number, page: number = 1) => {
  const response = await axios.get(
    `${BASE_URL}/discover/movie?language=es&page=${page}&sort_by=popularity.desc&with_genres=${idTag}`,
    HEADERS
  );
  const movies = response.data.results;
  const data: PostersDataProps[] = [];

  movies.map((movie: PostersDataProps) => {
    data.push({
      id: movie.id,
      poster_path: BASE_IMAGES_URL + movie.poster_path,
    });
  });

  return {
    results: data,
    total_pages: response.data.total_pages,
  };
};

export const fetchPopularSeries = async () => {
  const response = await axios.get(
    `${BASE_URL}/trending/tv/week?language=es-ES&page=1&sort_by=popularity.desc`,
    HEADERS
  );
  const series = response.data.results.slice(0, 10);
  const data: CarouselDataProps[] = [];

  series.map((serie: CarouselDataProps) => {
    data.push({
      id: serie.id,
      title: serie.name,
      overview: serie.overview,
      backdrop_path: BASE_IMAGES_URL + serie.backdrop_path,
      genre_ids: serie.genre_ids,
    });
  });

  return data;
};

export const fetchSeries = async (idTag: number, page: number = 1) => {
  const response = await axios.get(
    `${BASE_URL}/discover/tv?language=es&page=${page}&sort_by=popularity.desc&with_genres=${idTag}`,
    HEADERS
  );
  const series = response.data.results;
  const data: PostersDataProps[] = [];

  series.map((serie: PostersDataProps) => {
    data.push({
      id: serie.id,
      poster_path: BASE_IMAGES_URL + serie.poster_path,
    });
  });

  return {
    results: data,
    total_pages: response.data.total_pages,
  };
};

export const fetchTags = async () => {
  const response = await axios.get(
    `${BASE_URL}/genre/movie/list?language=es`,
    HEADERS
  );
  const tags = response.data.genres;
  const data: TagResponseProps[] = [];

  tags.map((tag: TagResponseProps) => {
    data.push({
      id: tag.id,
      name: tag.name,
    });
  });

  return data;
};

export const fetchDetailMovie = async (id: string) => {
  const response = await axios.get(
    `${BASE_URL}/movie/${id}?language=es-ES`,
    HEADERS
  );

  return response.data;
};

export const fetchDetailSerie = async (id: string) => {
  const response = await axios.get(
    `${BASE_URL}/tv/${id}?language=es-ES`,
    HEADERS
  );

  return response.data;
};

export const fetchCastMovie = async (id: string) => {
  const response = await axios.get(
    `${BASE_URL}/movie/${id}/credits?language=es-ES`,
    HEADERS
  );

  return response.data.cast;
};

export const fetchTrailerMovie = async (id: string) => {
  const response = await axios.get(
    `${BASE_URL}/movie/${id}/videos?language=es-ES`,
    HEADERS
  );

  return response.data.results;
};

export const fetchTrailerSerie = async (id: string) => {
  const response = await axios.get(
    `${BASE_URL}/tv/${id}/videos?language=es-ES`,
    HEADERS
  );

  return response.data.results;
};


export const fetchCastSerie = async (id: string) => {
  const response = await axios.get(`${BASE_URL}/tv/${id}/credits?language=es-ES`, HEADERS);
  return response.data.cast;
};
