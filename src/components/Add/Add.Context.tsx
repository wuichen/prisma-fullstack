import React, { createContext, useState, ReactChild } from 'react';
// import { navigate } from 'gatsby'
import { useRouter } from 'next/router';
import { getBreakpointFromTheme, getWindowDimensions } from 'utils';

// it returns two components Provider and Consumer
export const AddContext = createContext({
  showAdd: false,
  toggleAdd: (event?: Event) => {},
});

export function AddProvider({ children }: { children: ReactChild }) {
  const [showAdd, setShowAdd] = useState(false);
  const router = useRouter();
  function toggleAdd(event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    const { width } = getWindowDimensions();
    const tablet = getBreakpointFromTheme('tablet');

    setShowAdd((prevAdd) => !prevAdd);
    // TIPS: originally, the page directs to another page instead of opening modal for smaller screen devices
    // if (width > tablet) {
    // 	setShowAdd(prevAdd => !prevAdd);
    // } else {
    // 	router.push('/contact');
    // }
  }

  return <AddContext.Provider value={{ showAdd, toggleAdd }}>{children}</AddContext.Provider>;
}
