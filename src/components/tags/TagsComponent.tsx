import React, { useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { TagsProps } from '../../types';
import './TagsComponent.css';

const TagsComponent: React.FC<TagsProps> = ({ tags, tagSelected, onChange }) => {
   const containerRef = useRef<HTMLDivElement>(null);
   const scrollAmount = 150;

   const scroll = (direction: 'left' | 'right') => {
      const el = containerRef.current;

      if (el) {
         const scrollBy = direction === 'left' ? -scrollAmount : scrollAmount;
         el.scrollBy({ left: scrollBy, behavior: 'smooth' });
      }
   }

   return (
      <div className="tags">
         <div className="tags__carousel" ref={containerRef}>
            {tags.map((tag, index) => (
               <div key={index} className={`tags__item  ${tagSelected == tag.id ? 'active' : ''}`} onClick={() => onChange(tag.id)}>
                  {tag.name}
               </div>
            ))}
         </div>

         <button className="tags__button left" onClick={() => scroll('left')}>
            <FontAwesomeIcon icon={faChevronLeft} />
         </button>

         <button className="tags__button right" onClick={() => scroll('right')}>
            <FontAwesomeIcon icon={faChevronRight} />
         </button>
      </div >
   )
}

export default TagsComponent;
