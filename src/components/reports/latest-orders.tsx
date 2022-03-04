import type { FC } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Card, CardHeader, Divider } from '@material-ui/core';
import type { Order } from '../../types/order';
import { OrderPreviewItem } from '../order/order-preview-item';
import { OrderPreviewList } from '../order/order-preview-list';

interface LatestOrdersProps {
  orders: Order[];
}

export const LatestOrders: FC<LatestOrdersProps> = (props) => {
  const { orders } = props;

  return (
    <Card variant="outlined" {...props}>
      <CardHeader
        action={
          <Button
            color="primary"
            component={RouterLink}
            to="/dashboard/orders"
            variant="text"
          >
            Go to orders
          </Button>
        }
        title="Latest Orders"
      />
      <Divider />
      <OrderPreviewList>
        {orders.map((order, index) => (
          <OrderPreviewItem
            divider={orders.length > index + 1}
            key={order.id}
            order={order}
          />
        ))}
      </OrderPreviewList>
    </Card>
  );
};

LatestOrders.propTypes = {
  orders: PropTypes.array
};
