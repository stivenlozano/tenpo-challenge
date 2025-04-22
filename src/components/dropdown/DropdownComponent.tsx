import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { DropdownProps } from "../../types";
import './DropdownComponent.css';

const DropdownComponent: React.FC<DropdownProps> = ({ onLogout }) => {
   const [isOpen, setIsOpen] = useState(false);

   const handleMouseEnter = () => setIsOpen(true);
   const handleMouseLeave = () => setIsOpen(false);

   return (
      <div className="dropdown" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
         <FontAwesomeIcon className="dropdown__profile" icon={faCircleUser} />

         {isOpen && (
            <ul className="dropdown__menu">
               <li className="dropdown__item">
                  <a className="dropdown__link" onClick={() => onLogout()}>
                     <FontAwesomeIcon icon={faRightFromBracket}/>
                     Cerrar sesión
                  </a>
               </li>
            </ul>
         )}
      </div>
   );
};

export default DropdownComponent;