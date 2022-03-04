import type { FC } from 'react';
import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';
import { Box, Divider, Typography } from '@material-ui/core';
import type { Order } from '../../types/order';
import { StatusBadge } from '../status-badge';
import { OrderDraggable } from './order-draggable';

interface OrderDraggableProps {
  badgeColor: string;
  id: string;
  orders: Order[];
  title: string;
}

export const OrderDroppable: FC<OrderDraggableProps> = (props) => {
  const { badgeColor, id, orders, title, ...other } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        maxWidth: 400,
        minWidth: 400,
        '& + &': {
          borderLeft: (theme) => `1px solid ${theme.palette.divider}`
        }
      }}
      {...other}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          px: 3,
          py: 2.5
        }}
      >
        <StatusBadge color={badgeColor} sx={{ mr: 2 }} />
        <Typography
          color="textSecondary"
          variant="overline"
          whiteSpace="nowrap"
        >
          {title}
        </Typography>
      </Box>
      <Divider />
      <Droppable droppableId={id}>
        {(provided) => (
          <Box
            ref={provided.innerRef}
            sx={{
              flexGrow: 1,
              p: 2
            }}
            {...provided.droppableProps}
          >
            {orders.map((order, index) => (
              <OrderDraggable
                badgeColor={badgeColor}
                key={order.id}
                index={index}
                order={order}
              />
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </Box>
  );
};

OrderDroppable.propTypes = {
  badgeColor: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  orders: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
};
