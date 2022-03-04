import type { FC } from 'react';
import PropTypes from 'prop-types';
import { MenuItem } from '@material-ui/core';
import type { FilledTextFieldProps } from '@material-ui/core';
import { InputField } from './input-field';
import { StatusBadge } from './status-badge';

interface Option {
  color: string;
  label: string;
  value: string;
}

interface StatusSelectProps extends Omit<FilledTextFieldProps, 'variant'> {
  options: Option[];
}

export const StatusSelect: FC<StatusSelectProps> = (props) => {
  const { options, ...other } = props;

  return (
    <InputField fullWidth select {...other}>
      {options.map((option) => (
        <MenuItem
          key={option.value}
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
          value={option.value}
        >
          <StatusBadge
            color={option.color}
            sx={{
              backgroundColor: option.color,
              mr: 1
            }}
          />
          {option.label}
        </MenuItem>
      ))}
    </InputField>
  );
};

StatusSelect.propTypes = {
  // @ts-ignore
  options: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ).isRequired
};
