import App from './App';
import css from './NeuralNet.module.css';

function Page() {
   return (
      <div className={css.contentContainer}>
         <h1>Neural Network</h1>
         <p>
            Begin by writing a number in the left box. An explanation for the
            plots on the right is coming soon.
         </p>
         <App />
      </div>
   );
}

export default Page;
