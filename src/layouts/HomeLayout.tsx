import Header from '../components/header/HeaderComponent';
import Footer from '../components/footer/FooterComponent';
import { LayoutProps } from '../types';

const HomeLayout = ({ children }: LayoutProps) => {
   return (
      <>
         <Header />
         { children }
         <Footer />
      </>
   );
}

export default HomeLayout;
