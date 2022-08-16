import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import css from './Navbar.module.css';

interface Element {
   title: string;
   link: string;
}

const elements: Array<Element> = [
   { title: 'Home', link: 'home' },
   { title: 'About', link: 'about' },
   { title: 'Portfolio', link: 'projects' },
   { title: 'Research', link: 'research' },
   { title: 'Contact', link: 'contact' },
];

interface Props {
   scrollValue: number;
}

const Navbar = ({ scrollValue }: Props) => {
   const [isStatic, setIsStatic] = useState<boolean>(false);

   useEffect(() => {
      if (scrollValue > window.innerHeight - 1) return setIsStatic(true);
      if (scrollValue < window.innerHeight - 40) return setIsStatic(false);
      // eslint-disable-next-line consistent-return, no-useless-return
      return;
   }, [scrollValue]);

   const preventDraggable = (event: any) => event.preventDefault();

   const navLinks = elements.map((dir) => (
      <Link
         key={dir.title}
         activeClass={css.active}
         smooth
         spy
         to={dir.link}
         containerId="mainContainer"
         onDragStart={preventDraggable}
         className={`noselect ${css.navbar__link}`}
      >
         {dir.title}
      </Link>
   ));

   return (
      <div className={`${css.container} ${isStatic ? css.static : ''}`}>
         <div className="contentContainer">
            <div className={css.navbar}>
               {navLinks}
               <div className={`noselect ${css.navbar__brand}`}>
                  CHRISTOPHER KOLB
               </div>
            </div>
         </div>
      </div>
   );
};

export { Navbar };
