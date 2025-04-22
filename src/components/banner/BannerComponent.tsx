import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { BannerProps } from '../../types';
import './BannerComponent.css';

import IndicatorComponent from '../indicator/IndicatorComponent';

const BannerDetail: React.FC<BannerProps> = ({ banner='', poster='' , title='', year='', categories=[], average=0, overview='', onClick=()=>{} }) => {
   return (
      <section className='banner'>
         <img className='banner__backdrop' src={banner} alt="" />

         <div className='banner__content'>
            <div className='poster'>
               <img src={poster} alt="" className='poster__img' />
               <button className='poster__trailer' onClick={() => onClick()}>
                  <FontAwesomeIcon icon={faPlay} />
                  Reproducir tráiler
               </button>
            </div>

            <div className='summary'>
               <h1 className='summary__title'>{title} ({year.slice(0, 4)})</h1>
               <span className='summary__tags'>
                  {
                     categories.map((tag) => tag.name).join(', ')
                  }
               </span>

               <div className='summary__approval'>
                  <IndicatorComponent percentage={Math.round(Number(average) * 10)} size={60} strokeWidth={4} />
                  <span className='summary__text'>Puntuación de usuarios</span>
               </div>

               <span className='summary__subtitle'>Vista general</span>
               <p className='summary__description'>{overview}</p>
            </div>
         </div>
      </section>
   );
}

export default BannerDetail;