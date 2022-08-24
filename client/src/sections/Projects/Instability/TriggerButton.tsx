import css from './instability.module.css';

type Props = {
   onClick: () => void;
   trigger: boolean;
   props: {
      isActive: { style: string; text: string | React.ReactNode };
      isNotActive: { style: string; text: string | React.ReactNode };
   };
};

const TriggerButton = ({ onClick, trigger, props }: Props): JSX.Element => (
   <div
      className={`noselect ${css.interactButton} ${
         trigger ? props.isActive.style : props.isNotActive.style
      }`}
      onClick={onClick}
   >
      {trigger ? props.isActive.text : props.isNotActive.text}
   </div>
);

export default TriggerButton;
