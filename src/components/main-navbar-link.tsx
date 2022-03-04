import type { FC, ReactNode, ElementType } from 'react';
import PropTypes from 'prop-types';
import { Box, Button } from '@material-ui/core';
import type { ButtonProps } from '@material-ui/core';

interface MainNavbarLinkProps extends ButtonProps {
  component?: ElementType;
  dropdown?: ReactNode;
  label: string;
  to?: string;
}

// NOTE: Dropdown is a div element, we display it on list item hover

export const MainNavbarLink: FC<MainNavbarLinkProps> = (props) => {
  const { component, label, dropdown, to, ...other } = props;

  return (
    <Box
      component="li"
      sx={{
        '&:hover > div': {
          display: 'block'
        }
      }}
    >
      <Button
        color="inherit"
        component={component}
        to={to}
        variant="text"
        {...other}
      >
        {label}
      </Button>
      {dropdown}
    </Box>
  );
};

MainNavbarLink.propTypes = {
  // @ts-ignore
  component: PropTypes.elementType,
  dropdown: PropTypes.node,
  label: PropTypes.string,
  to: PropTypes.string
};
