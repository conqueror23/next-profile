import type { Product } from '../models/product'
import styles from '../styles/Home.module.css'

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onViewDetails?: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart, onViewDetails }: ProductCardProps) => {
  const { 
    name, 
    description, 
    price, 
    currency, 
    category, 
    inStock, 
    rating, 
    reviewCount, 
    tags, 
    isNew, 
    isFeatured, 
    discount 
  } = product

  const discountedPrice = discount ? price * (1 - discount / 100) : price

  return (
    <div className={`${styles.card} ${isFeatured ? styles.featuredCard : ''}`}>
      <div className={styles.cardBadges}>
        {isNew && <span className={styles.newBadge}>New</span>}
        {isFeatured && <span className={styles.featuredBadge}>Featured</span>}
        {discount && <span className={styles.discountBadge}>-{discount}%</span>}
      </div>
      
      <div className={styles.cardHeader}>
        <div className={styles.categoryBadge}>{category}</div>
        <h2>{name}</h2>
      </div>
      
      <p className={styles.cardDescription}>{description}</p>
      
      <div className={styles.cardMeta}>
        <div className={styles.rating}>
          <span className={styles.stars}>{'★'.repeat(Math.floor(rating))}</span>
          <span className={styles.ratingText}>
            {rating} ({reviewCount} reviews)
          </span>
        </div>
        
        <div className={styles.tags}>
          {tags.slice(0, 3).map((tag, index) => (
            <span key={index} className={styles.tag}>{tag}</span>
          ))}
        </div>
      </div>
      
      <div className={styles.priceSection}>
        {discount && (
          <span className={styles.originalPrice}>${price.toFixed(2)}</span>
        )}
        <span className={styles.currentPrice}>
          ${discountedPrice.toFixed(2)} {currency}
        </span>
      </div>
      
      <div className={styles.stockInfo}>
        <span className={`${styles.stockStatus} ${inStock ? styles.inStock : styles.outOfStock}`}>
          {inStock ? '✓ In Stock' : '✗ Out of Stock'}
        </span>
      </div>
      
      <div className={styles.cardActions}>
        <button 
          className={styles.primaryButton}
          onClick={() => onViewDetails?.(product)}
        >
          View Details
        </button>
        <button 
          className={`${styles.secondaryButton} ${!inStock ? styles.disabled : ''}`}
          onClick={() => inStock && onAddToCart?.(product)}
          disabled={!inStock}
        >
          {inStock ? 'Add to Cart' : 'Unavailable'}
        </button>
      </div>
    </div>
  )
}

export default ProductCard