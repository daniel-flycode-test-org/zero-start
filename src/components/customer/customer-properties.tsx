import type { FC } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import numeral from 'numeral';
import { Card, CardHeader, Divider } from '@material-ui/core';
import type { Customer } from '../../types/customer';
import { PropertyList } from '../property-list';
import { PropertyListItem } from '../property-list-item';

interface CustomerPropertiesProps {
  customer: Customer;
}

export const CustomerProperties: FC<CustomerPropertiesProps> = (props) => {
  const { customer, ...other } = props;

  return (
    <Card variant="outlined" {...other}>
      <CardHeader title="Customer Properties" />
      <Divider />
      <PropertyList>
        <PropertyListItem
          divider
          label="Tax Exempt"
          value={customer.isTaxExempt ? 'Yes' : 'No'}
        />
        <PropertyListItem
          divider
          label="Store Credit"
          value={`${numeral(customer.storeCredit).format('$0,0.00')} USD`}
        />
        <PropertyListItem divider label="Status" value={customer.status} />
        <PropertyListItem
          label="Signup"
          value={format(customer.createdAt, 'dd MM yyyy HH:mm')}
        />
      </PropertyList>
    </Card>
  );
};

CustomerProperties.propTypes = {
  // @ts-ignore
  customer: PropTypes.object.isRequired
};
