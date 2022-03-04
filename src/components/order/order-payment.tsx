import type { FC } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardHeader, Divider, Grid } from '@material-ui/core';
import type { Order } from '../../types/order';
import { PropertyList } from '../property-list';
import { PropertyListItem } from '../property-list-item';

interface OrderPaymentProps {
  order: Order;
  onEdit: () => void;
}

const paymentStatusOptions = [
  {
    value: 'paid',
    label: 'Paid'
  },
  {
    value: 'not-paid',
    label: 'Not paid'
  }
];

const paymentMethodOptions = [
  {
    value: 'debit',
    label: 'Direct debit'
  },
  {
    value: 'paypal',
    label: 'Paypal'
  }
];

export const OrderPayment: FC<OrderPaymentProps> = (props) => {
  const { onEdit, order, ...other } = props;
  const paymentStatusOption = paymentStatusOptions.find(
    (option) => option.value === order.paymentStatus
  );
  const paymentMethodOption = paymentMethodOptions.find(
    (option) => option.value === order.paymentMethod
  );

  return (
    <Card variant="outlined" {...other}>
      <CardHeader
        action={
          <Button color="primary" onClick={onEdit} variant="text">
            Edit
          </Button>
        }
        title="Payment &amp; Courier Details"
      />
      <Divider />
      <Grid container>
        <Grid item sm={6} xs={12}>
          <PropertyList>
            <PropertyListItem
              label="Stripe Payment ID"
              value={order?.paymentId}
            />
            <PropertyListItem
              label="Payment Status"
              value={paymentStatusOption.label}
            />
            <PropertyListItem
              label="Payment Method"
              value={paymentMethodOption.label}
            />
          </PropertyList>
        </Grid>
        <Grid item sm={6} xs={12}>
          <PropertyList>
            <PropertyListItem label="Courier" value={order.courier} />
            <PropertyListItem label="Tracking ID" value={order.trackingCode} />
          </PropertyList>
        </Grid>
      </Grid>
    </Card>
  );
};

OrderPayment.propTypes = {
  onEdit: PropTypes.func,
  // @ts-ignore
  order: PropTypes.object.isRequired
};
