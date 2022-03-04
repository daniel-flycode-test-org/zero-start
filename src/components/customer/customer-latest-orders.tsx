import type { FC } from 'react';
import PropTypes from 'prop-types';
import { Card, Typography } from '@material-ui/core';
import type { Order } from '../../types/order';
import { OrderPreviewItem } from '../order/order-preview-item';
import { OrderPreviewList } from '../order/order-preview-list';
import { ResourceUnavailable } from '../resource-unavailable';

interface CustomerLatestOrdersProps {
  orders: Order[];
}

export const CustomerLatestOrders: FC<CustomerLatestOrdersProps> = (props) => {
  const { orders, ...other } = props;

  return (
    <div {...other}>
      <Typography color="textPrimary" variant="h6" sx={{ mb: 3 }}>
        Latest Orders
      </Typography>
      {orders.length ? (
        <Card variant="outlined">
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
      ) : (
        <ResourceUnavailable />
      )}
    </div>
  );
};

CustomerLatestOrders.defaultProps = {
  orders: []
};

CustomerLatestOrders.propTypes = {
  orders: PropTypes.array
};
