import { lazy, Suspense, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { VideoResponseProps, SeriesResponseProps } from '../types';
import { BASE_IMAGES_URL } from '../util/constants';
import { fetchDetailSerie, fetchCastSerie, fetchTrailerSerie } from '../services/api';

import HomeLayout from '../layouts/HomeLayout';
import VideoComponent from '../components/video/VideoComponent';
import BannerComponent from '../components/banner/BannerComponent';
import InfiniteScrollComponent from '../components/infiniteScroll/InfiniteScrollComponent';

const CastComponent = lazy(() => import('../components/cast/CastComponent'));

const SerieDetailPage = () => {
   const { id, } = useParams<string>();
   const [serie, setSerie] = useState<SeriesResponseProps>();
   const [cast, setCast] = useState([]);
   const [video, setVideo] = useState<VideoResponseProps>();
   const [openTrailer, setOpenTrailer] = useState(false);

   const loadSerie = async (id: string) => {
      const data = await fetchDetailSerie(id);
      setSerie(data);
   };

   const loadCast = async (id: string) => {
      const data = await fetchCastSerie(id);
      setCast(data);
   };

   const loadTrailer = async (id: string) => {
      const data = await fetchTrailerSerie(id);
      const officialTrailer = data.find((video: VideoResponseProps) => video.type === "Trailer" && video.site === "YouTube")
      setVideo(officialTrailer);
   };

   const handleOpenTrailer = () => video ? setOpenTrailer(true) : null;
   const handleCloseTrailer = () => setOpenTrailer(prev => !prev);

   useEffect(() => {
      if (!id) return;

      loadSerie(id);
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
               banner={BASE_IMAGES_URL + serie?.backdrop_path}
               poster={BASE_IMAGES_URL + serie?.poster_path}
               title={serie?.name}
               year={serie?.last_air_date}
               categories={serie?.genres}
               average={serie?.vote_average}
               overview={serie?.overview}
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

export default SerieDetailPage;