import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  specs?: Record<string, string>;
}

interface QuoteCartContextType {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
  itemCount: number;
}

const QuoteCartContext = createContext<QuoteCartContextType | undefined>(undefined);

export const QuoteCartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<Product[]>([]);

  const addItem = (product: Product) => {
    if (!items.find(item => item.id === product.id)) {
      setItems(prev => [...prev, product]);
    }
  };

  const removeItem = (productId: string) => {
    setItems(prev => prev.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const isInCart = (productId: string) => {
    return items.some(item => item.id === productId);
  };

  return (
    <QuoteCartContext.Provider value={{
      items,
      addItem,
      removeItem,
      clearCart,
      isInCart,
      itemCount: items.length
    }}>
      {children}
    </QuoteCartContext.Provider>
  );
};

export const useQuoteCart = () => {
  const context = useContext(QuoteCartContext);
  if (!context) {
    throw new Error('useQuoteCart must be used within a QuoteCartProvider');
  }
  return context;
};
