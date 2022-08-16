import React from 'react';
import css from './Cluster.module.css';

interface Props {
   children?: React.ReactNode | null;
}

const Cluster = ({ children }: Props) => (
   <div className={css.cluster}>{children}</div>
);

Cluster.defaultProps = { children: null };

export { Cluster };
