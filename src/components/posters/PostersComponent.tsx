import { PostersProps } from '../../types'
import './PostersComponent.css'

const PostersComponent: React.FC<PostersProps> = ({ posters, onClick }) => {
   return (
      <section className='posters'>
         {posters.map((poster, index) => (
            <div key={index} className='posters__item' onClick={() => onClick(poster.id)}>
               <img className='posters__img' src={poster.poster_path} alt="Poster" loading="lazy" />
            </div>
         ))}
      </section>
   )
}

export default PostersComponent;