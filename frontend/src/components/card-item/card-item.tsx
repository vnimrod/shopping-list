import React from 'react';
import styles from './card-item.module.scss';

interface CardItemProps {
  icon?: React.ReactNode;
  text?: string;
  className?: string;
}

const CardItem: React.FC<CardItemProps> = ({ 
  icon, 
  text = "Data Consolidation", 
  className 
}) => {
  return (
    <div className={`${styles.cardItem} ${className || ''}`}>
      <div className={styles.topLeftCircle}></div>
      <div className={styles.content}>
        {icon && <div className={styles.icon}>{icon}</div>}
        <div className={styles.text}>{text}</div>
      </div>
    </div>
  );
};

export default CardItem;
