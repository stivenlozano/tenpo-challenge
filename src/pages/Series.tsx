import { useEffect, useState, useRef, useCallback, Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { CarouselDataProps, TagResponseProps, PostersDataProps } from '../types'
import { fetchPopularSeries, fetchTags, fetchSeries } from '../services/api';

import HomeLayout from '../layouts/HomeLayout';
import InfiniteScrollComponent from '../components/infiniteScroll/InfiniteScrollComponent';

const CarouselComponent = lazy(() => import('../components/carousel/CarouselComponent'));
const TagsComponent = lazy(() => import('../components/tags/TagsComponent'));
const PostersComponent = lazy(() => import('../components/posters/PostersComponent'));

function SeriesPage() {
   const navigate = useNavigate();

   const [loading, setLoading] = useState(false);
   const [popularSeries, setPopularSeries] = useState<CarouselDataProps[]>([]);
   const [tag, setTag] = useState<number>(18);
   const [tags, setTags] = useState<TagResponseProps[]>([]);
   const [series, setSeries] = useState<PostersDataProps[]>([]);
   const [page, setPage] = useState(1);
   const [hasMore, setHasMore] = useState(true);
   const observerRef = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
      const loadInitial = async () => {
         const [popularSeriesData, tagsData] = await Promise.all([fetchPopularSeries(), fetchTags()]);
         setPopularSeries(popularSeriesData);
         setTags(tagsData);
      };

      loadInitial();
   }, []);

   useEffect(() => {
      setSeries([]);
      setPage(1);
      setHasMore(true);
   }, [tag]);

   const loadSeries = useCallback(async () => {
      if (loading || !hasMore) return;

      setLoading(true);
      try {
         const data = await fetchSeries(tag, page);

         setSeries(prev => {
            const ids = new Set(prev.map(m => m.id));
            const newSeries = data.results.filter(m => !ids.has(m.id));
            return [...prev, ...newSeries];
         });
         setHasMore(page < data.total_pages);
         setPage(prev => prev + 1);
      } catch (error) {
         console.error('Error al cargar series:', error);
      } finally {
         setLoading(false);
      }
   }, [tag, page, loading, hasMore]);

   useEffect(() => {
      if (!observerRef.current) return;

      const observer = new IntersectionObserver((entries) => {
         if (entries[0].isIntersecting) {
            loadSeries();
         }
      }, { threshold: 1 });

      const current = observerRef.current;
      observer.observe(current);

      return () => {
         if (current) observer.unobserve(current);
      };
   }, [loadSeries]);

   const handleClickCarousel = (id: number) => navigate(`/series/${id}`);

   return (
      <HomeLayout>
         <Suspense fallback={<InfiniteScrollComponent />}>
            <CarouselComponent slides={popularSeries} tags={tags} autoSlide btnTitle='Ir a la serie' onClick={handleClickCarousel} />
         </Suspense>

         <Suspense fallback={<InfiniteScrollComponent />}>
            <TagsComponent tags={tags} onChange={(id) => setTag(id)} tagSelected={tag} />
         </Suspense>

         <Suspense fallback={<InfiniteScrollComponent />}>
            <PostersComponent posters={series} onClick={handleClickCarousel} />
         </Suspense>

         {loading && <InfiniteScrollComponent />}

         <div ref={observerRef} />
      </HomeLayout>
   );
}

export default SeriesPage;
