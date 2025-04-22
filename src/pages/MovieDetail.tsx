import { lazy, Suspense, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { VideoResponseProps, MovieResponseProps } from '../types';
import { BASE_IMAGES_URL } from '../util/constants';
import { fetchDetailMovie, fetchCastMovie, fetchTrailerMovie } from '../services/api';

import HomeLayout from '../layouts/HomeLayout';
import BannerComponent from '../components/banner/BannerComponent';
import VideoComponent from '../components/video/VideoComponent';
import InfiniteScrollComponent from '../components/infiniteScroll/InfiniteScrollComponent';

const CastComponent = lazy(() => import('../components/cast/CastComponent'));

const MovieDetailPage = () => {
   const { id, } = useParams<string>();
   const [movie, setMovie] = useState<MovieResponseProps>();
   const [cast, setCast] = useState([]);
   const [video, setVideo] = useState<VideoResponseProps>();
   const [openTrailer, setOpenTrailer] = useState(false);

   const loadMovie = async (id: string) => {
      const data = await fetchDetailMovie(id);
      setMovie(data);
   };

   const loadCast = async (id: string) => {
      const data = await fetchCastMovie(id);
      setCast(data);
   };

   const loadTrailer = async (id: string) => {
      const data = await fetchTrailerMovie(id);
      const officialTrailer = data.find((video: VideoResponseProps) => video.type === "Trailer" && video.site === "YouTube")
      setVideo(officialTrailer);
   };

   const handleOpenTrailer = () => video ? setOpenTrailer(true) : null;
   const handleCloseTrailer = () => setOpenTrailer(prev => !prev)

   useEffect(() => {
      if (!id) return;

      loadMovie(id);
      loadCast(id);
      loadTrailer(id);
   }, [id]);

   useEffect(() => {
      if (openTrailer) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
  
      return () => {
        document.body.style.overflow = 'auto';
      };
   }, [openTrailer]);
  
   return (
      <HomeLayout>
         <Suspense fallback={<InfiniteScrollComponent />}>
            <BannerComponent
               banner={BASE_IMAGES_URL + movie?.backdrop_path}
               poster={BASE_IMAGES_URL + movie?.poster_path}
               title={movie?.title}
               year={movie?.release_date}
               categories={movie?.genres}
               average={movie?.vote_average}
               overview={movie?.overview}
               onClick={handleOpenTrailer}
            />
         </Suspense>

         <Suspense fallback={<InfiniteScrollComponent />}>
            <CastComponent data={cast} />
         </Suspense>

         <VideoComponent video={video} show={openTrailer} onClose={handleCloseTrailer} />
      </HomeLayout>
   );
}

export default MovieDetailPage;