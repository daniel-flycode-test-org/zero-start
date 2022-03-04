export const applyPagination = (rows: Array<any>, page: number): Array<any> => {
  if (page === null) {
    return rows;
  }

  const paginated = rows.slice(page * 10, page * 10 + 10);

  return paginated.length ? paginated : rows;
};
