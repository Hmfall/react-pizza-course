import React, { FC } from 'react';

const CartEmpty: FC = () => {
   return (
      <div style={{ textAlign: 'center' }}>
         <h2 style={{ padding: '30px 0' }}>
            Корзина пуста
         </h2>
      </div>
   );
};

export default CartEmpty;