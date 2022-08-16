import style from './instability.module.css';

function TriggerButton({ onClick, trigger, props }) {
   return (
      <div
         className={`noselect ${style.interactButton} ${
            trigger ? props.isActive.style : props.isNotActive.style
         }`}
         onClick={onClick}
      >
         {trigger ? props.isActive.text : props.isNotActive.text}
      </div>
   );
}

export default TriggerButton;
