import type { FC } from 'react';
import PropTypes from 'prop-types';
import { Autocomplete, TextField } from '@material-ui/core';
import type { AutocompleteProps } from '@material-ui/core';
import { alpha } from '@material-ui/core/styles';

interface AutocompleteFieldProps
  extends Omit<AutocompleteProps<string, true, false, false>, 'renderInput'> {
  error?: boolean;
  helperText?: string | string[];
  label: string;
  options: string[];
  placeholder?: string;

  [key: string]: any;
}

export const AutocompleteField: FC<AutocompleteFieldProps> = (props) => {
  const { error, helperText, label, options, placeholder, ...other } = props;

  return (
    <Autocomplete
      options={options}
      sx={{
        '& .MuiFilledInput-root .MuiFilledInput-input': {
          px: 1.5,
          py: 0.75
        }
      }}
      renderInput={({ InputProps, ...rest }) => (
        <TextField
          {...rest}
          error={error}
          helperText={helperText}
          label={label}
          placeholder={placeholder}
          sx={{
            '& .MuiFilledInput-root': {
              backgroundColor: 'background.paper',
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: 'neutral.300',
              borderRadius: 1,
              boxShadow: '0px 1px 2px 0px rgba(9, 30, 66, 0.08)',
              '&.MuiAutocomplete-inputRoot': {
                p: 0
              },
              transition: (theme) =>
                theme.transitions.create(['border-color', 'box-shadow']),
              '&:hover': {
                backgroundColor: 'background.paper'
              },
              '&.Mui-focused': {
                backgroundColor: 'background.paper',
                boxShadow: (theme) =>
                  `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`
              },
              '& .MuiFilledInput-input': {
                fontSize: 14,
                height: 'unset',
                lineHeight: 1.6,
                px: 1.5,
                py: 0.75
              },
              '&.Mui-disabled': {
                backgroundColor: 'action.disabledBackground',
                boxShadow: 'none',
                borderColor: alpha('#D6DBE1', 0.5)
              },
              ':not(.MuiInputBase-adornedStart)': {
                p: 0
              }
            }
          }}
          variant="filled"
          // eslint-disable-next-line react/jsx-no-duplicate-props
          InputProps={{
            disableUnderline: true,
            ...InputProps
          }}
          InputLabelProps={{
            shrink: true,
            sx: {
              color: 'text.primary',
              fontSize: 14,
              fontWeight: 500,
              mb: 0.5,
              position: 'relative',
              transform: 'none'
            }
          }}
        />
      )}
      ChipProps={{ variant: 'outlined' }}
      {...other}
    />
  );
};

AutocompleteField.propTypes = {
  error: PropTypes.bool,
  helperText: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  placeholder: PropTypes.string
};
