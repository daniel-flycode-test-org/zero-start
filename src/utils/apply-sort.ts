const descendingComparator = (a: any, b: any, sortBy: string): number => {
  if (b[sortBy] < a[sortBy]) {
    return -1;
  }

  if (b[sortBy] > a[sortBy]) {
    return 1;
  }

  return 0;
};

export const applySort = (
  rows: Array<any>,
  sort: string,
  sortBy: string
): Array<any> => {
  if (!rows || !sort) {
    return rows;
  }

  return rows.sort((a, b) =>
    sort === 'desc'
      ? descendingComparator(a, b, sortBy)
      : -descendingComparator(a, b, sortBy)
  );
};
