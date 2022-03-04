import type { FC, ElementType } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import type { ButtonProps } from '@material-ui/core';
import type { SxProps } from '@material-ui/system';

interface MainSidebarLinkProps extends ButtonProps {
  component?: ElementType;
  label: string;
  sx?: SxProps;
  to: string;
}

export const MainSidebarLink: FC<MainSidebarLinkProps> = (props) => {
  const { component, to, label, sx, ...other } = props;

  return (
    <li>
      <Button
        component={component}
        color="inherit"
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          display: 'flex',
          width: '100%',
          ...sx
        }}
        to={to}
        variant="text"
        {...other}
      >
        {label}
      </Button>
    </li>
  );
};

MainSidebarLink.propTypes = {
  // @ts-ignore
  component: PropTypes.elementType,
  label: PropTypes.string,
  sx: PropTypes.object,
  to: PropTypes.string
};
