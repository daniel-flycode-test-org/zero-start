import { useRef, useState } from 'react';
import type { MutableRefObject } from 'react';

export const usePopover = (): [
  MutableRefObject<HTMLButtonElement>,
  boolean,
  () => void,
  () => void
] => {
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return [anchorRef, open, handleOpen, handleClose];
};
