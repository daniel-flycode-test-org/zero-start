import type { FC } from 'react';
import { List } from '@material-ui/core';

export const ActionList: FC = (props) => (
  <List
    dense
    sx={{
      backgroundColor: 'neutral.100',
      width: '100%'
    }}
    {...props}
  />
);
