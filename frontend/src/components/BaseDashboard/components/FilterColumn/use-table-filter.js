import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";

const useTableFilter = items => {
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const columns = [];
    Object.keys(items[0]).forEach(key => (columns[key] = []));
    setFilters(columns);
  }, [items]);

  const filteredItems = React.useMemo(() => {
    return items.filter(item =>
      Object.keys(filters).every(
        key => !filters[key].length || filters[key].includes(item[key])
      )
    );
  }, [items, filters]);

  const addOrRemove = (array, value) => {
    const index = array.indexOf(value);
    if (index === -1) {
      return [...array, value];
    } else {
      return array.filter(el => el !== value);
    }
  };

  const requestFilter = (column, value) => {
    const selectedFilter = addOrRemove(filters[column] || [], value);

    setFilters({
      ...filters,
      [column]: selectedFilter
    });
  };

  return { data: filteredItems, requestFilter, filters };
};

export default useTableFilter;
