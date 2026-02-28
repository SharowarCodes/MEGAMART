import React, { createContext, useContext, useReducer } from 'react';

const FilterContext = createContext();

const filterReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CATEGORY':
      return {
        ...state,
        category: action.payload
      };

    case 'SET_CATEGORIES':
      return {
        ...state,
        categories: action.payload
      };

    case 'SET_PRICE_RANGE':
      return {
        ...state,
        priceRange: action.payload
      };

    case 'SET_BRANDS':
      return {
        ...state,
        brands: action.payload
      };

    case 'SET_RATING':
      return {
        ...state,
        rating: action.payload
      };

    case 'SET_SORT':
      return {
        ...state,
        sort: action.payload
      };

    case 'SET_SEARCH':
      return {
        ...state,
        search: action.payload
      };

    case 'SET_COLOR':
      return {
        ...state,
        color: action.payload
      };

    case 'SET_DISCOUNT':
      return {
        ...state,
        discount: action.payload
      };

    case 'SET_AVAILABILITY':
      return {
        ...state,
        availability: action.payload
      };

    case 'CLEAR_ALL_FILTERS':
      return {
        ...initialState
      };

    case 'APPLY_MULTIPLE_FILTERS':
      return {
        ...state,
        ...action.payload
      };

    default:
      return state;
  }
};

const initialState = {
  category: null,
  categories: [],
  priceRange: [0, 50000],
  brands: [],
  rating: 0,
  sort: 'popularity',
  search: '',
  color: '',
  discount: 0,
  availability: 'all'
};

export const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(filterReducer, initialState);

  const setCategory = (category) => {
    dispatch({ type: 'SET_CATEGORY', payload: category });
  };

  const setCategories = (categories) => {
    dispatch({ type: 'SET_CATEGORIES', payload: categories });
  };

  const setPriceRange = (priceRange) => {
    dispatch({ type: 'SET_PRICE_RANGE', payload: priceRange });
  };

  const setBrands = (brands) => {
    dispatch({ type: 'SET_BRANDS', payload: brands });
  };

  const setRating = (rating) => {
    dispatch({ type: 'SET_RATING', payload: rating });
  };

  const setSort = (sort) => {
    dispatch({ type: 'SET_SORT', payload: sort });
  };

  const setSearch = (search) => {
    dispatch({ type: 'SET_SEARCH', payload: search });
  };

  const setColor = (color) => {
    dispatch({ type: 'SET_COLOR', payload: color });
  };

  const setDiscount = (discount) => {
    dispatch({ type: 'SET_DISCOUNT', payload: discount });
  };

  const setAvailability = (availability) => {
    dispatch({ type: 'SET_AVAILABILITY', payload: availability });
  };

  const clearAllFilters = () => {
    dispatch({ type: 'CLEAR_ALL_FILTERS' });
  };

  const applyMultipleFilters = (filters) => {
    dispatch({ type: 'APPLY_MULTIPLE_FILTERS', payload: filters });
  };

  const hasActiveFilters = () => {
    return (
      state.category ||
      state.categories.length > 0 ||
      state.priceRange[0] > 0 ||
      state.priceRange[1] < 50000 ||
      state.brands.length > 0 ||
      state.rating > 0 ||
      state.search ||
      state.color ||
      state.discount > 0 ||
      state.availability !== 'all'
    );
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (state.category) count++;
    if (state.categories.length > 0) count += state.categories.length;
    if (state.priceRange[0] > 0 || state.priceRange[1] < 50000) count++;
    if (state.brands.length > 0) count += state.brands.length;
    if (state.rating > 0) count++;
    if (state.search) count++;
    if (state.color) count++;
    if (state.discount > 0) count++;
    if (state.availability !== 'all') count++;
    return count;
  };

  const updateFilters = (filters) => {
    dispatch({ type: 'APPLY_MULTIPLE_FILTERS', payload: filters });
  };

  const value = {
    ...state,
    updateFilters,
    setCategory,
    setCategories,
    setPriceRange,
    setBrands,
    setRating,
    setSort,
    setSearch,
    setColor,
    setDiscount,
    setAvailability,
    clearAllFilters,
    applyMultipleFilters,
    hasActiveFilters,
    getActiveFiltersCount
  };

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};
