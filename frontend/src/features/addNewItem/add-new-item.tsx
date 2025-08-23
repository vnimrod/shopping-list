import React, { useCallback, useEffect, useState } from 'react';
import { language } from '../../services/language';
import { getTexts } from './translations/index';

// זמנית לשינוי שפה
export function useForceUpdate() {
  const [, setTick] = useState(0);
  return useCallback(() => setTick((t) => t + 1), []);
}

const AddNewItem = () => {
  const forceUpdate = useForceUpdate();

  // זמנית לשינוי שפה
  useEffect((): any => {
    const unsub = language.subscribe(forceUpdate);
    return unsub;
  }, [forceUpdate]);

  // זמנית לשינוי שפה
  const texts = getTexts(language.selectedLanguage);

  return <div>{texts.AddNewItem}</div>;
};

export default AddNewItem;
