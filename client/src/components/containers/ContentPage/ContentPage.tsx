import React from 'react';
import css from './ContentPage.module.css';

interface Props {
   style?: React.CSSProperties;
   children: React.ReactNode;
}

const ContentPage = ({ style, children }: Props) => (
   <div style={style} className={css.contentPage}>
      {children}
   </div>
);

ContentPage.defaultProps = { style: {} };

export { ContentPage };
