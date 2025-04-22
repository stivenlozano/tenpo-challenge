import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm, faTv, faBars, faXmark, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from '../../auth/Auth'
import logotipo from "../../assets/logotipo.png";
import "./HeaderComponent.css";

import DropdownComponent from "../dropdown/DropdownComponent";

const HeaderComponent = () => {
  const { logout } = useContext(AuthContext);
  const [scrolled, setScrolled] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [])

  useEffect(() => {
      if (submenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
  
      return () => {
        document.body.style.overflow = 'auto';
      };
   }, [submenuOpen]);

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <nav className="nav">
          <NavLink to="/">
            <img className="logotipo" src={logotipo} alt="" />
          </NavLink>

          <ul className="menubar">
            <li className="menubar__item">
              <NavLink className="menubar__link" to="/movies">
                <FontAwesomeIcon className="menubar__icon" icon={faFilm} />
                Peliculas
              </NavLink>
            </li>

            <li className="menubar__item">
              <NavLink className="menubar__link" to="/series">
                <FontAwesomeIcon className="menubar__icon" icon={faTv} />
                Series
              </NavLink>
            </li>
          </ul>

          <ul className="menu-aside">
            <li className="menu-aside__item">
              <DropdownComponent onLogout={logout} />
            </li>
          </ul>

          <ul className="menubar-mobile">
            <li className="menubar-mobile__item">
              <FontAwesomeIcon className="menubar-mobile__icon" icon={faBars} onClick={() => setSubmenuOpen(true)} />
            </li>
          </ul>

          <div className={`menu-mobile ${submenuOpen ? "slide-in" : ""}`}>
            <ul className="menu-mobile__items">
              <li className="menu-mobile__head">
                <img className="logotipo" src={logotipo} alt="" />
                <FontAwesomeIcon icon={faXmark} onClick={() => setSubmenuOpen(false)}/>
              </li>

              <li className="menu-mobile__item">
                <NavLink className="menu-mobile__link" to="/movies">
                  <FontAwesomeIcon className="menu-mobile__icon" icon={faFilm} /> Peliculas
                </NavLink>
              </li>

              <li className="menu-mobile__item">
                <NavLink className="menu-mobile__link" to="/series">
                  <FontAwesomeIcon className="menu-mobile__icon" icon={faTv} /> Series
                </NavLink>
              </li>

              <li className="menu-mobile__item" onClick={logout}>
                <div className="menu-mobile__link">
                  <FontAwesomeIcon icon={faRightFromBracket}/> Cerrar sesión
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </header >
    </>
  );
}

export default HeaderComponent;
