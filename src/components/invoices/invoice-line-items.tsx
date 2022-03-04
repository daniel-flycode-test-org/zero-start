import type { FC } from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, Divider } from '@material-ui/core';
import type { Invoice } from '../../types/invoice';
import { InvoiceTable } from './invoice-table';

interface InvoiceLineItemsProps {
  invoice: Invoice;
}

export const InvoiceLineItems: FC<InvoiceLineItemsProps> = (props) => {
  const { invoice } = props;

  return (
    <Card variant="outlined">
      <CardHeader title="Line Items" />
      <Divider />
      <InvoiceTable invoice={invoice} />
    </Card>
  );
};

InvoiceLineItems.propTypes = {
  // @ts-ignore
  invoice: PropTypes.object.isRequired
};
