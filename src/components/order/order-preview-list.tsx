import type { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { List } from '@material-ui/core';

interface OrderPreviewListProps {
  children: ReactNode;
}

export const OrderPreviewList: FC<OrderPreviewListProps> = (props) => {
  const { children, ...other } = props;

  return (
    <List disablePadding sx={{ width: '100%' }} {...other}>
      {children}
    </List>
  );
};

OrderPreviewList.propTypes = {
  children: PropTypes.node
};
