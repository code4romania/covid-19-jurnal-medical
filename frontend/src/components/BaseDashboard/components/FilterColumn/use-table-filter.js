import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";

const useTableFilter = items => {
  const copy = { ...items[0] };
  Object.keys(copy).forEach(key => (copy[key] = []));
  const [filters, setFilters] = useState([]);

  useEffect(() => setFilters(copy), []);

  const filteredItems = React.useMemo(() => {
    return items.filter(item =>
      Object.keys(filters).every(
        key => !filters[key].length || filters[key].includes(item[key])
      )
    );
  }, [items, filters]);

  const addOrRemove = (array, value) => {
    var index = array.indexOf(value);

    if (index === -1) {
      array.push(value);
    } else {
      array.splice(index, 1);
    }

    return array;
  };

  const requestFilter = (column, value) => {
    let selectedFilter = filters[column] ? filters[column] : [];
    selectedFilter = addOrRemove(selectedFilter, value);
    setFilters({
      ...filters,
      [column]: selectedFilter
    });
  };

  return { data: filteredItems, requestFilter, filters };
};

export default useTableFilter;
