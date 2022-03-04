import { useEffect, useRef, useState } from 'react';
import type { FC, ChangeEvent, KeyboardEvent, FocusEvent } from 'react';
import PropTypes from 'prop-types';
import { InputBase } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import type { SxProps } from '@material-ui/system';
import { Search as SearchIcon } from '../icons/search';

interface QueryProps {
  disabled: boolean;
  onChange: (newQuery: string) => void;
  value: string;
  sx?: SxProps;
}

const QueryRoot = styled('div')(({ theme }) => ({
  alignItems: 'center',
  backgroundColor: 'background.paper',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  height: 42,
  width: '100%'
}));

export const Query: FC<QueryProps> = (props) => {
  const { disabled, onChange, value, ...other } = props;
  const [autoFocus, setAutoFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [tempValue, setTempValue] = useState('');

  useEffect(() => {
    setTempValue(value);
  }, [value]);

  useEffect(() => {
    if (!disabled && autoFocus && inputRef?.current) {
      inputRef.current.focus();
    }
  }, [disabled]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setTempValue(event.target.value);
  };

  const handleKeyup = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.keyCode === 13 && onChange) {
      onChange(tempValue);
    }
  };

  const handleFocus = (): void => {
    setAutoFocus(true);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>): void => {
    /*
     There is a situation where an input goes from not disabled to disabled and DOM emits a blur
     event, with event as undefined. This means, that sometimes we'll receive an React Synthetic
     event and sometimes undefined because when DOM triggers the event, React is unaware of it,
     or it simply does not emit the event. To bypass this behaviour, we store a local variable
     that acts as autofocus.
     */

    if (event) {
      setAutoFocus(false);
    }
  };

  return (
    <QueryRoot {...other}>
      <SearchIcon
        sx={{
          color: 'text.secondary',
          ml: 2,
          mr: 1
        }}
        fontSize="small"
      />
      <InputBase
        disabled={disabled}
        inputProps={{
          ref: inputRef,
          sx: {
            p: 0.75,
            '&::placeholder': {
              color: 'text.secondary',
              opacity: 1
            }
          }
        }}
        onBlur={handleBlur}
        onChange={handleChange}
        onFocus={handleFocus}
        onKeyUp={handleKeyup}
        placeholder="Search..."
        sx={{ flex: 1 }}
        value={tempValue}
      />
    </QueryRoot>
  );
};

Query.defaultProps = {
  value: ''
};

Query.propTypes = {
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.string
};
