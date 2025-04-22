import { useEffect, useState, useRef, useCallback, Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { CarouselDataProps, TagResponseProps, PostersDataProps } from '../types';
import { fetchPopularMovies, fetchTags, fetchMovies } from '../services/api';

import HomeLayout from '../layouts/HomeLayout';
import InfiniteScrollComponent from '../components/infiniteScroll/InfiniteScrollComponent';

const CarouselComponent = lazy(() => import('../components/carousel/CarouselComponent'));
const TagsComponent = lazy(() => import('../components/tags/TagsComponent'));
const PostersComponent = lazy(() => import('../components/posters/PostersComponent'));

function MoviesPage() {
   const navigate = useNavigate();

   const [loading, setLoading] = useState(false);
   const [popularMovies, setPopularMovies] = useState<CarouselDataProps[]>([]);
   const [tag, setTag] = useState<number>(28);
   const [tags, setTags] = useState<TagResponseProps[]>([]);
   const [movies, setMovies] = useState<PostersDataProps[]>([]);
   const [page, setPage] = useState(1);
   const [hasMore, setHasMore] = useState(true);
   const observerRef = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
      const loadInitial = async () => {
         const [billboardData, tagsData] = await Promise.all([fetchPopularMovies(), fetchTags()]);
         setPopularMovies(billboardData);
         setTags(tagsData);
      };

      loadInitial();
   }, []);

   useEffect(() => {
      setMovies([]);
      setPage(1);
      setHasMore(true);
   }, [tag]);

   const loadMovies = useCallback(async () => {
      if (loading || !hasMore) return;

      setLoading(true);
      try {
         const data = await fetchMovies(tag, page);

         setMovies(prev => {
            const ids = new Set(prev.map(m => m.id));
            const newMovies = data.results.filter(m => !ids.has(m.id));
            return [...prev, ...newMovies];
         });
         setHasMore(page < data.total_pages);
         setPage(prev => prev + 1);
      } catch (error) {
         console.error('Error al cargar películas:', error);
      } finally {
         setLoading(false);
      }
   }, [tag, page, loading, hasMore]);

   useEffect(() => {
      if (!observerRef.current) return;

      const observer = new IntersectionObserver((entries) => {
         if (entries[0].isIntersecting) {
            loadMovies();
         }
      }, { threshold: 1 });

      const current = observerRef.current;
      observer.observe(current);

      return () => {
         if (current) observer.unobserve(current);
      };
   }, [loadMovies]);

   const handleClickCarousel = (id: number) => navigate(`/movies/${id}`);

   return (
      <HomeLayout>
         <Suspense fallback={<InfiniteScrollComponent />}>
            <CarouselComponent slides={popularMovies} tags={tags} autoSlide btnTitle='Ir a la pelicula' onClick={handleClickCarousel} />
         </Suspense>

         <Suspense fallback={<InfiniteScrollComponent />}>
            <TagsComponent tags={tags} onChange={(id) => setTag(id)} tagSelected={tag} />
         </Suspense>

         <Suspense fallback={<InfiniteScrollComponent />}>
            <PostersComponent posters={movies} onClick={handleClickCarousel} />
         </Suspense>

         {loading && <InfiniteScrollComponent />}

         <div ref={observerRef} />
      </HomeLayout>
   );
}

export default MoviesPage;
