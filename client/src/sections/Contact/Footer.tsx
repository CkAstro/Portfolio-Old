import { Icons } from '@/components/elements';
import { baseUrl } from '@/api';
import css from './Contact.module.css';

function Footer() {
   return (
      <div className={css.footer}>
         <div className={css.linkContainer}>
            <div
               role="img"
               alt="View me on Github"
               onClick={() =>
                  window.open('https://github.com/CkAstro', '_blank')
               }
            >
               <Icons.GitHub size={24} />
            </div>
            <div className={css.resume}>
               <a href={`${baseUrl}/resume`} target="_blank" rel="noreferrer">
                  resume
               </a>
            </div>
            <div
               alt="View me on LinkedIn"
               onClick={() =>
                  window.open(
                     'https://www.linkedin.com/in/christopher-kolb-071334232/',
                     '_blank'
                  )
               }
            >
               <Icons.LinkedIn size={24} />
            </div>
         </div>
         <div className={css.copyright}>
            Copyright Christopher Kolb, 2022. Site design by me.
         </div>
      </div>
   );
}

export default Footer;
