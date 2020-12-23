import { createContext, useState } from 'react';

export const FilteringContext = createContext();

const FilteringProvider = ({ children }) => {
  const [invisibleQuizzesQuantity, setInvisibleQuizzesQuantity] = useState();
  return <FilteringContext.Provider value={{ invisibleQuizzesQuantity, setInvisibleQuizzesQuantity }}>{children}</FilteringContext.Provider>;
};

export default FilteringProvider;
