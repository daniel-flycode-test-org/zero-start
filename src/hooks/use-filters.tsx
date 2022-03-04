import { useState } from 'react';
import type { Filter } from '../types/filter';

const blankFilter: Filter = {
  property: {
    name: '',
    type: ''
  },
  operator: {
    value: '',
    typesAccepted: []
  },
  value: ''
};

export const useFilters = (
  properties,
  operators,
  initialFilters = []
): {
  addFilter: (index: number) => void;
  clearFilters: () => void;
  filters: Filter[];
  handleOperatorChange: (
    filterIndex: number,
    selectedOperatorValue: string
  ) => void;
  handlePropertyChange: (
    filterIndex: number,
    selectedPropertyName: string
  ) => void;
  handleValueChange: (filterIndex: number, value: string) => void;
  removeFilter: (index: number) => void;
  shouldApplyFilters: boolean;
} => {
  const [filters, setFilters] = useState(() =>
    initialFilters?.length ? initialFilters : [blankFilter]
  );

  let shouldApplyFilters = true;

  for (let i = 0; i < filters.length; i++) {
    if (
      !filters[i].property.name ||
      !filters[i].operator.value ||
      (!filters[i].operator.typesAccepted.includes('blank') &&
        !filters[i].value)
    ) {
      shouldApplyFilters = false;
      break;
    }
  }

  const addFilter = (index: number): void => {
    if (!shouldApplyFilters) {
      return;
    }

    const temp = [...filters];
    temp.splice(index, 0, blankFilter);
    setFilters(temp);
  };

  const clearFilters = (): void => {
    setFilters([blankFilter]);
  };

  const removeFilter = (index: number): void => {
    if (filters.length === 1) {
      clearFilters();
      return;
    }

    setFilters((prevFilters) =>
      prevFilters.filter((_, _index) => _index !== index)
    );
  };

  const handlePropertyChange = (
    filterIndex: number,
    selectedPropertyName: string
  ): void => {
    const temp = [...filters];
    const selectedProperty = properties.find(
      (property) => property.name === selectedPropertyName
    );

    temp[filterIndex] = {
      property: selectedProperty,
      operator: {
        value: '',
        typesAccepted: []
      },
      value: ''
    };

    setFilters(temp);
  };

  const handleOperatorChange = (
    filterIndex: number,
    selectedOperatorValue: string
  ): void => {
    const temp = [...filters];
    const selectedOperator = operators.find(
      (operator) => operator.value === selectedOperatorValue
    );

    temp[filterIndex] = {
      ...temp[filterIndex],
      operator: selectedOperator
    };

    setFilters(temp);
  };

  const handleValueChange = (filterIndex: number, value: string): void => {
    const temp = [...filters];

    temp[filterIndex] = {
      ...temp[filterIndex],
      value
    };

    setFilters(temp);
  };

  return {
    addFilter,
    clearFilters,
    filters,
    handlePropertyChange,
    handleOperatorChange,
    handleValueChange,
    removeFilter,
    shouldApplyFilters
  };
};
