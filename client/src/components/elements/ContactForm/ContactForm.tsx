/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint no-restricted-globals: ["warn", "name"] */
import { useState } from 'react';
import { sendUserMessage } from '@/api';
import css from './ContactForm.module.css';

interface Message {
   name: string;
   email: string;
   message: string;
}

const ContactForm = () => {
   const defaultName = 'Name';
   const defaultEmail = 'Email';
   const defaultMessage = 'Message...';

   const [name, setName] = useState<string>(defaultName);
   const [email, setEmail] = useState<string>(defaultEmail);
   const [message, setMessage] = useState<string>(defaultMessage);
   const [hasPendingSubmit, setHasPendingSubmit] = useState<boolean>(false);
   const [sentMessage, setSentMessage] = useState<Message>({
      name: '',
      email: '',
      message: '',
   });

   const handleFocus = (event: any) => event.target.select();
   const handleNameChange = (event: any) => setName(event.target.value);
   const handleEmailChange = (event: any) => setEmail(event.target.value);
   const handleMessageChange = (event: any) => setMessage(event.target.value);

   const handleSubmit = (event: any) => {
      event.preventDefault();
      if (hasPendingSubmit) return undefined;
      if (name === defaultName) return alert('Please enter a name.');
      if (email === defaultEmail) return alert('Please enter an email.');
      if (message === defaultMessage) return alert('Please enter a message.');
      if (
         name === sentMessage.name &&
         email === sentMessage.email &&
         message === sentMessage.message
      )
         return alert('Message already received!');

      const regex = /(^[\w+-.]+)@((?:[\w]+\.)+)([a-zA-Z]+)/;
      if (!regex.test(email))
         return alert(
            'Please enter a valid email. If you see this message in error, contact me directly at astro.cekolb@gmail.com'
         );

      setHasPendingSubmit(true);
      return sendUserMessage({ name, email, message })
         .then((res) => {
            if (res.success) setSentMessage({ name, email, message });
            alert(res.message);
         })
         .then(() => setHasPendingSubmit(false))
         .catch(() => setHasPendingSubmit(false));
   };

   return (
      <div className={css.formContainer}>
         <form onSubmit={handleSubmit}>
            <label className={css.form__name}>
               <input
                  type="text"
                  className={`${css.form__name} ${
                     name === defaultName || name === sentMessage.name
                        ? css.inactive
                        : ''
                  }`}
                  onFocus={handleFocus}
                  value={name}
                  onChange={handleNameChange}
               />
            </label>
            <label className={css.form__email}>
               <input
                  type="text"
                  className={`${css.form__email} ${
                     email === defaultEmail || email === sentMessage.email
                        ? css.inactive
                        : ''
                  }`}
                  onFocus={handleFocus}
                  value={email}
                  onChange={handleEmailChange}
               />
            </label>
            <label className={css.form__message}>
               <textarea
                  className={`${css.form__message} ${
                     message === defaultMessage ||
                     message === sentMessage.message
                        ? css.inactive
                        : ''
                  }`}
                  onFocus={handleFocus}
                  value={message}
                  onChange={handleMessageChange}
                  rows={8}
               />
            </label>
            <div className={css.form__submit} onClick={handleSubmit}>
               Submit
            </div>
         </form>
      </div>
   );
};

export { ContactForm };
