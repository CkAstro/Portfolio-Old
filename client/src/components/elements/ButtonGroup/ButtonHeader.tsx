import css from './ButtonGroup.module.css';

interface Props {
   text: string;
}

const ButtonHeader = ({ text }: Props) => (
   <div className={css.button__header}>
      <div className={css.button__header__content}>{text}</div>
   </div>
);

export default ButtonHeader;
