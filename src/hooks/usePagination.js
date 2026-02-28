import { useState } from 'react';

export const usePagination = (initialPage = 1, initialItemsPerPage = 12) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    setCurrentPage(prev => prev + 1);
  };

  const prevPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  };

  const resetPage = () => {
    setCurrentPage(1);
  };

  const getPageNumbers = (totalItems) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pageNumbers = [];
    
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    
    return pageNumbers;
  };

  const getPaginatedItems = (items) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  };

  const getTotalPages = (totalItems) => {
    return Math.ceil(totalItems / itemsPerPage);
  };

  const goToPage = (pageNumber, totalPages = 1) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return {
    currentPage,
    itemsPerPage,
    setCurrentPage,
    setItemsPerPage,
    paginate,
    nextPage,
    prevPage,
    resetPage,
    getPageNumbers,
    getPaginatedItems,
    getTotalPages,
    goToPage
  };
};
