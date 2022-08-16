import css from './ButtonGroup.module.css';

interface Props {
   text: string;
   onClick: () => void;
   className: string;
}

const Button = ({ text, onClick, className }: Props) => (
   <div className={`${css.button} ${className}`} onClick={onClick}>
      <div className={css.button__content}>{text}</div>
   </div>
);

export default Button;
