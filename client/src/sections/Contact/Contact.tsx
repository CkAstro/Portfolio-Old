import { ContactForm } from '@/components/elements';
import { baseUrl } from '@/api';
import Footer from './Footer';
import css from './Contact.module.css';

const Contact = () => (
   <>
      <div className={css.headerContainer}>
         <h1 className={css.style1}>
            Contact <span style={{ fontWeight: '100' }}>Me</span>
         </h1>
         <p>Interested in working together or have a question? Let me know!</p>
         <p>
            <a href={`${baseUrl}/resume`} target="_blank" rel="noreferrer">
               View my resume here.
            </a>
         </p>
      </div>
      <ContactForm />
      <Footer />
   </>
);

export { Contact };
