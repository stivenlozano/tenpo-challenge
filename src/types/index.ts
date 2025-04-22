export interface LayoutProps {
  children: React.ReactNode;
}

export interface IndicatorProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
}

export interface CastResponseProps {
  adult: false;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: number;
  order: number;
}

export interface CastProps {
  data: CastResponseProps[];
}

export interface TagResponseProps {
  id: number;
  name: string;
}

export interface TagsProps {
  tags: TagResponseProps[];
  tagSelected: number;
  onChange: (id: number) => void;
}

export interface VideoResponseProps {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export interface VideoProps {
  video?: VideoResponseProps;
  show: boolean;
  onClose: (value: boolean) => void;
}

export interface CarouselDataProps {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  backdrop_path: string;
  genre_ids: GenresResponseProps[];
}

export interface CarouselProps {
  slides: CarouselDataProps[];
  tags: TagResponseProps[];
  btnTitle: string;
  autoSlide?: boolean;
  autoSlideInterval?: number;
  onClick: (id: number) => void;
}

export interface GenresResponseProps {
  id: number;
  name: string;
}

export interface BannerProps {
  banner?: string;
  poster?: string;
  title?: string;
  year?: string;
  categories?: GenresResponseProps[];
  average?: number;
  overview?: string;
  onClick?: () => void;
}

export interface PostersDataProps {
  id: number;
  poster_path: string;
}

export interface PostersProps {
  posters: PostersDataProps[];
  onClick: (id: number) => void;
}

export interface SeriesResponseProps {
  backdrop_path: string;
  poster_path: string;
  name: string;
  last_air_date: string;
  genres: GenresResponseProps[];
  vote_average: number;
  overview: string;
}

export interface MovieResponseProps {
  backdrop_path: string;
  poster_path: string;
  title: string;
  release_date: string;
  genres: GenresResponseProps[];
  vote_average: number;
  overview: string;
}

export interface DropdownProps {
  onLogout: () => void;
}