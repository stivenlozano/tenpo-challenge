import { CastProps } from '../../types'
import './CastComponent.css'

const BASE_IMAGES_URL = "https://image.tmdb.org/t/p/original";

const CastComponent: React.FC<CastProps> = ({ data }) => {
   return (
      <section className='cast'>
         <h2 className='cast__title'>ACTORES</h2>

         <div className='cast__items'>
            {data.map((item, index) => (
               <div key={index} className="cast__item">
                  <img className='cast__item-photo' src={BASE_IMAGES_URL + item.profile_path} alt={`Actor - ${item.name}`} />

                  <div className='cast__item-actor'>
                     <p className='cast__item-name'>{item.name}</p>
                     <span className='cast__item-character'>{item.character}</span>
                  </div>
               </div>
            ))}
         </div>
      </section>
   )
}

export default CastComponent