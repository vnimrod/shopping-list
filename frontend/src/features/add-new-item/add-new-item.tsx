import React, { useCallback, useEffect, useState } from 'react';
import { language } from '../../services/language';
import { getTexts } from './translations';
import styles from './add-new-item.module.scss';

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

  return (
    <div className={styles.AddNewItem}>
      <button>{texts.AddNewItem}</button>
    </div>
  );
};

export default AddNewItem;
