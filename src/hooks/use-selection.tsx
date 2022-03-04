import { useState } from 'react';
import type { ChangeEvent } from 'react';

export const useSelection = (
  rows
): [
  string[],
  (event: ChangeEvent<HTMLInputElement>, rowId: string) => void,
  (event: ChangeEvent<HTMLInputElement>) => void
] => {
  const [selectedRows, setSelectedRows] = useState<string[] | []>([]);

  const handleSelect = (
    event: ChangeEvent<HTMLInputElement>,
    rowId: string
  ): void => {
    setSelectedRows((prevSelectedRows) => {
      if (event.target.checked) {
        return [...prevSelectedRows, rowId];
      }

      return prevSelectedRows.filter((selectedRow) => selectedRow !== rowId);
    });
  };

  const handleClearSelected = (): void => {
    setSelectedRows([]);
  };

  const handleSelectAll = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.checked) {
      setSelectedRows(rows.map((row) => row.id));
      return;
    }

    handleClearSelected();
  };

  return [selectedRows, handleSelect, handleSelectAll];
};
