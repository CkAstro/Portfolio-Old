import TriggerButton from './triggerbutton';
import style from './instability.module.css';

function AppControls({ props }) {
   const { pause, slowMo, handlePrev, handleNext, handlePause, handleSlowMo } =
      props;

   return (
      <div className={style.buttonContainer}>
         <TriggerButton
            onClick={handlePrev}
            trigger={pause}
            props={{
               isActive: { style: '', text: <>&laquo; prev</> },
               isNotActive: { style: style.hidden, text: <>&laquo; prev</> },
            }}
         />
         <TriggerButton
            onClick={handlePause}
            trigger={pause}
            props={{
               isActive: { style: style.active, text: 'play' },
               isNotActive: { style: '', text: 'pause' },
            }}
         />
         <TriggerButton
            onClick={handleSlowMo}
            trigger={slowMo}
            props={{
               isActive: { style: style.active, text: 'normal' },
               isNotActive: { style: '', text: 'slow-mo' },
            }}
         />
         <TriggerButton
            onClick={handleNext}
            trigger={pause}
            props={{
               isActive: { style: '', text: <>next &raquo;</> },
               isNotActive: { style: style.hidden, text: <>next &raquo;</> },
            }}
         />
      </div>
   );
}

export default AppControls;
