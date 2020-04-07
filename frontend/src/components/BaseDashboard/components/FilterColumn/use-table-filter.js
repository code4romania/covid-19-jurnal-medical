import * as React from "react";
import { useState } from "react";

const useTableFilter = items => {
  const copy = { ...items[0] };
  Object.keys(copy).forEach(key => (copy[key] = []));
  const [filters, setFilters] = useState(copy);

  const filteredItems = React.useMemo(() => {
    return items.filter(item => {
      for (var key in filters) {
        if (filters[key].length > 0 && !filters[key].includes(item[key])) {
          return false;
        }
      }
      return true;
    });
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
    if (!filters[column]) {
      filters[column] = [];
    }
    filters[column] = addOrRemove(filters[column], value);
    setFilters({ ...filters });
  };

  return { data: filteredItems, requestFilter, filters };
};

export default useTableFilter;
