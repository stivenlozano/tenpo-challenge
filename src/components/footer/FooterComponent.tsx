import logotipo from "../../assets/logotipo.png";
import "./FooterComponent.css";

const FooterComponent = () => {
   return (
      <footer className="footer">
         <img className="footer__logotipo" src={logotipo} alt="logotipo" />
         <span className="footer__text">2025 | Desarrollado por Brayan Lozano</span>
      </footer>
   );
}

export default FooterComponent;