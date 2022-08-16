import { render, screen, userEvent, act, container } from '@/test';
import { ContactForm } from '..';

jest.mock('@/api');

describe('ContactForm (unit)', () => {
   test('ensure render', () => {
      const nameText = 'Name';
      const emailText = 'Email';
      const messageText = 'Message...';
      act(() => {
         render(<ContactForm />, container);
      });
      const form = document.querySelector('form');
      expect(form).toBeInTheDocument();
      expect(screen.getByDisplayValue(nameText)).toBeInTheDocument();
      expect(screen.getByDisplayValue(emailText)).toBeInTheDocument();
      expect(screen.getByDisplayValue(messageText)).toBeInTheDocument();
   });

   test('no submit without name', async () => {
      act(() => {
         render(<ContactForm />, container);
      });

      jest.spyOn(window, 'alert').mockImplementation(() => {});

      const emailInput = document.querySelector('input.form__email') as Element;
      const messageInput = document.querySelector(
         'textarea.form__message'
      ) as Element;

      await userEvent.type(emailInput, 'test@e.mail');
      await userEvent.type(messageInput, 'test message');
      await userEvent.click(screen.getByText('Submit'));

      expect(window.alert).toBeCalledWith('Please enter a name.');
   });

   test('no submit without email', async () => {
      act(() => {
         render(<ContactForm />, container);
      });

      jest.spyOn(window, 'alert').mockImplementation(() => {});

      const nameInput = document.querySelector('input.form__name') as Element;
      const messageInput = document.querySelector(
         'textarea.form__message'
      ) as Element;

      await userEvent.type(nameInput, 'test');
      await userEvent.type(messageInput, 'test message');
      await userEvent.click(screen.getByText('Submit'));

      expect(window.alert).toBeCalledWith('Please enter an email.');
   });

   test('no submit without message', async () => {
      act(() => {
         render(<ContactForm />, container);
      });

      jest.spyOn(window, 'alert').mockImplementation(() => {});

      const nameInput = document.querySelector('input.form__name') as Element;
      const emailInput = document.querySelector('input.form__email') as Element;

      await userEvent.type(nameInput, 'test');
      await userEvent.type(emailInput, 'test@e.mail');
      await userEvent.click(screen.getByText('Submit'));

      expect(window.alert).toBeCalledWith('Please enter a message.');
   });

   test('submit with correct info', async () => {
      act(() => {
         render(<ContactForm />, container);
      });

      jest.spyOn(window, 'alert').mockImplementation(() => {});

      const nameInput = document.querySelector('input.form__name') as Element;
      const emailInput = document.querySelector('input.form__email') as Element;
      const messageInput = document.querySelector(
         'textarea.form__message'
      ) as Element;

      await userEvent.type(nameInput, 'test');
      await userEvent.type(emailInput, 'test@e.mail');
      await userEvent.type(messageInput, 'test message');
      await userEvent.click(screen.getByText('Submit'));

      expect(window.alert).toBeCalledWith(
         'Message sent. Thank you for contacting me.'
      );
   });
});

describe('ContactForm (regex testing)', () => {
   test('regex catches incorrect email -- @x.xxx', async () => {
      act(() => {
         render(<ContactForm />, container);
      });

      jest.spyOn(window, 'alert').mockImplementation(() => {});

      const nameInput = document.querySelector('input.form__name') as Element;
      const emailInput = document.querySelector('input.form__email') as Element;
      const messageInput = document.querySelector(
         'textarea.form__message'
      ) as Element;

      await userEvent.type(nameInput, 'test');
      await userEvent.type(messageInput, 'test message');

      await userEvent.type(emailInput, '@e.mail');
      await userEvent.click(screen.getByText('Submit'));
      expect(window.alert).toBeCalledWith(
         'Please enter a valid email. If you see this message in error, contact me directly at astro.cekolb@gmail.com'
      );
   });

   test('regex catches incorrect email -- xx@xxx', async () => {
      act(() => {
         render(<ContactForm />, container);
      });

      jest.spyOn(window, 'alert').mockImplementation(() => {});

      const nameInput = document.querySelector('input.form__name') as Element;
      const emailInput = document.querySelector('input.form__email') as Element;
      const messageInput = document.querySelector(
         'textarea.form__message'
      ) as Element;

      await userEvent.type(nameInput, 'test');
      await userEvent.type(messageInput, 'test message');

      await userEvent.type(emailInput, 'e@mail');
      await userEvent.click(screen.getByText('Submit'));
      expect(window.alert).toBeCalledWith(
         'Please enter a valid email. If you see this message in error, contact me directly at astro.cekolb@gmail.com'
      );
   });

   test('regex catches incorrect email -- xx.xxx', async () => {
      act(() => {
         render(<ContactForm />, container);
      });

      jest.spyOn(window, 'alert').mockImplementation(() => {});

      const nameInput = document.querySelector('input.form__name') as Element;
      const emailInput = document.querySelector('input.form__email') as Element;
      const messageInput = document.querySelector(
         'textarea.form__message'
      ) as Element;

      await userEvent.type(nameInput, 'test');
      await userEvent.type(messageInput, 'test message');

      await userEvent.type(emailInput, 'e.mail');
      await userEvent.click(screen.getByText('Submit'));
      expect(window.alert).toBeCalledWith(
         'Please enter a valid email. If you see this message in error, contact me directly at astro.cekolb@gmail.com'
      );
   });

   test('regex allows complex email -- xx-xx+xx.x@xx.xx.xxx', async () => {
      act(() => {
         render(<ContactForm />, container);
      });

      jest.spyOn(window, 'alert').mockImplementation(() => {});

      const nameInput = document.querySelector('input.form__name') as Element;
      const emailInput = document.querySelector('input.form__email') as Element;
      const messageInput = document.querySelector(
         'textarea.form__message'
      ) as Element;

      await userEvent.type(nameInput, 'test');
      await userEvent.type(messageInput, 'test message');

      await userEvent.type(emailInput, 'te-st+em.ail@e.ma.iltest');
      await userEvent.click(screen.getByText('Submit'));
      expect(window.alert).toBeCalledWith(
         'Message sent. Thank you for contacting me.'
      );
   });
});
