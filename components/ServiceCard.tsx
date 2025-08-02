import type { Service } from '../models/service'
import styles from '../styles/Home.module.css'

interface ServiceCardProps {
  service: Service;
  onLearnMore?: (service: Service) => void;
}

const ServiceCard = ({ service, onLearnMore }: ServiceCardProps) => {
  const { name, description, category, price, duration, features, isPopular } = service

  return (
    <div className={`${styles.card} ${isPopular ? styles.popularCard : ''}`}>
      {isPopular && (
        <div className={styles.popularBadge}>
          ⭐ Popular
        </div>
      )}
      
      <div className={styles.cardHeader}>
        <div className={styles.categoryBadge}>{category}</div>
        <h2>{name}</h2>
      </div>
      
      <p className={styles.cardDescription}>{description}</p>
      
      <div className={styles.cardDetails}>
        <div className={styles.priceInfo}>
          <strong>{price}</strong>
          <span className={styles.duration}>Duration: {duration}</span>
        </div>
        
        <div className={styles.features}>
          <h4>Key Features:</h4>
          <ul>
            {features.slice(0, 3).map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
            {features.length > 3 && (
              <li className={styles.moreFeatures}>+{features.length - 3} more...</li>
            )}
          </ul>
        </div>
      </div>
      
      <div className={styles.cardActions}>
        <button 
          className={styles.primaryButton}
          onClick={() => onLearnMore?.(service)}
        >
          Learn More
        </button>
        <button className={styles.secondaryButton}>
          Get Quote
        </button>
      </div>
    </div>
  )
}

export default ServiceCard