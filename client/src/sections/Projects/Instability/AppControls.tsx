import TriggerButton from './TriggerButton';
import css from './Instability.module.css';

type Props = {
   props: {
      pause: boolean;
      slowMo: boolean;
      handlePrev: () => void;
      handleNext: () => void;
      handlePause: () => void;
      handleSlowMo: () => void;
   };
};

const AppControls = ({ props }: Props) => {
   const { pause, slowMo, handlePrev, handleNext, handlePause, handleSlowMo } =
      props;

   return (
      <div className={css.buttonContainer}>
         <TriggerButton
            onClick={handlePrev}
            trigger={pause}
            props={{
               isActive: { style: '', text: <>&laquo; prev</> },
               isNotActive: { style: css.hidden, text: <>&laquo; prev</> },
            }}
         />
         <TriggerButton
            onClick={handlePause}
            trigger={pause}
            props={{
               isActive: { style: css.active, text: 'play' },
               isNotActive: { style: '', text: 'pause' },
            }}
         />
         <TriggerButton
            onClick={handleSlowMo}
            trigger={slowMo}
            props={{
               isActive: { style: css.active, text: 'normal' },
               isNotActive: { style: '', text: 'slow-mo' },
            }}
         />
         <TriggerButton
            onClick={handleNext}
            trigger={pause}
            props={{
               isActive: { style: '', text: <>next &raquo;</> },
               isNotActive: { style: css.hidden, text: <>next &raquo;</> },
            }}
         />
      </div>
   );
};

export default AppControls;
