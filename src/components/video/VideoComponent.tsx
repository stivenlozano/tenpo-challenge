import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { VideoProps } from '../../types';
import './VideoComponent.css'

const VideoComponent: React.FC<VideoProps> = ({ video, show = false, onClose }) => {
   if (!video || !show) return null;

   return (
      <div className='trailer'>
         <div className='trailer__box'>
            <div className='trailer__header'>
               <span className="trailer__title">Repoducir tráiler</span>
               <FontAwesomeIcon className="trailer__icon" icon={faXmark} onClick={() => onClose(false)} />
            </div>
            <iframe
               className='trailer__iframe'
               src={`https://www.youtube.com/embed/${video.key}`}
               title="Trailer"
               frameBorder="0"
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
               allowFullScreen
            />
         </div>
      </div>
   );
};

export default VideoComponent;