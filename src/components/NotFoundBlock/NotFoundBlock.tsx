import React, { FC } from 'react';
import classes from './NotFoundBlock.module.scss';

const NotFoundBlock: FC = () => {
   return (
      <h2 className={classes.title}>
         Ничего не найдено
      </h2>
   );
};

export default NotFoundBlock;