import type { FC } from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, Divider } from '@material-ui/core';
import type { Order } from '../../types/order';
import { OrderSummary } from './order-summary';

interface OrderLineItemsProps {
  order: Order;
}

export const OrderLineItems: FC<OrderLineItemsProps> = (props) => {
  const { order, ...other } = props;

  return (
    <Card variant="outlined" {...other}>
      <CardHeader title="Line Items" />
      <Divider />
      <OrderSummary order={order} />
    </Card>
  );
};

OrderLineItems.propTypes = {
  // @ts-ignore
  order: PropTypes.object
};
