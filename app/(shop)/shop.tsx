import { useState, useEffect } from 'react'
import ProductCard from '../../components/ProductCard'
import { Product } from '../../models/product'
import styles from '../../styles/Home.module.css'
import productsData from '../../data/products.json'

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [activeFilter, setActiveFilter] = useState<string>('All')
  const [sortBy, setSortBy] = useState<string>('featured')
  const [cart, setCart] = useState<Product[]>([])

  useEffect(() => {
    const productInstances = productsData.map(data => 
      new Product(
        data.id,
        data.name,
        data.description,
        data.price,
        data.currency,
        data.category,
        data.image,
        data.gallery,
        data.inStock,
        data.stockQuantity,
        data.rating,
        data.reviewCount,
        data.tags,
        data.specifications ? Object.fromEntries(
          Object.entries(data.specifications).filter(([_, value]) => value !== undefined)
        ) : undefined,
        data.isNew,
        data.isFeatured,
        data.discount
      )
    )
    setProducts(productInstances)
    setFilteredProducts(productInstances)
  }, [])

  const categories = ['All', ...Array.from(new Set(products.map(product => product.category)))]

  const handleFilterChange = (category: string) => {
    setActiveFilter(category)
    let filtered = category === 'All' ? products : products.filter(product => product.category === category)
    
    // Apply sorting
    filtered = sortProducts(filtered, sortBy)
    setFilteredProducts(filtered)
  }

  const handleSortChange = (sortOption: string) => {
    setSortBy(sortOption)
    const sorted = sortProducts(filteredProducts, sortOption)
    setFilteredProducts(sorted)
  }

  const sortProducts = (productList: Product[], sortOption: string): Product[] => {
    const sorted = [...productList]
    switch (sortOption) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price)
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price)
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating)
      case 'newest':
        return sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
      case 'featured':
      default:
        return sorted.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0))
    }
  }

  const handleAddToCart = (product: Product) => {
    setCart(prev => [...prev, product])
    alert(`Added "${product.name}" to cart!\n\nCart now contains ${cart.length + 1} item(s).`)
  }

  const handleViewDetails = (product: Product) => {
    alert(`Product Details: ${product.name}\n\nRating: ${product.rating}/5 (${product.reviewCount} reviews)\nPrice: $${product.price}\nIn Stock: ${product.inStock ? 'Yes' : 'No'}\n\nThis would typically open a detailed product page.`)
  }

  const featuredProducts = products.filter(product => product.isFeatured)
  const newProducts = products.filter(product => product.isNew)

  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Digital Products Store</h1>
        <p className={styles.pageSubtitle}>
          High-quality templates, components, and development tools to accelerate your projects. 
          Built by developers, for developers.
        </p>
      </div>

      {/* Featured Products Section */}
      {featuredProducts.length > 0 && (
        <section className={styles.featuredSection}>
          <h2>🌟 Featured Products</h2>
          <div className={styles.grid}>
            {featuredProducts.slice(0, 3).map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </section>
      )}

      {/* New Products Section */}
      {newProducts.length > 0 && (
        <section className={styles.newSection}>
          <h2>🆕 Latest Releases</h2>
          <div className={styles.grid}>
            {newProducts.slice(0, 2).map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </section>
      )}

      {/* Filters and Sorting */}
      <div className={styles.controlsSection}>
        <div className={styles.filterSection}>
          <span className={styles.filterLabel}>Category:</span>
          {categories.map(category => (
            <button
              key={category}
              className={`${styles.filterButton} ${activeFilter === category ? styles.active : ''}`}
              onClick={() => handleFilterChange(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className={styles.sortSection}>
          <label className={styles.sortLabel}>
            Sort by:
            <select 
              value={sortBy} 
              onChange={(e) => handleSortChange(e.target.value)}
              className={styles.sortSelect}
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </label>
        </div>
      </div>

      {/* All Products Grid */}
      <section className={styles.allProductsSection}>
        <h2>All Products ({filteredProducts.length})</h2>
        <div className={styles.grid}>
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      </section>

      {filteredProducts.length === 0 && (
        <div className={styles.noResults}>
          <p>No products found for the selected category.</p>
        </div>
      )}

      {/* Cart Summary */}
      {cart.length > 0 && (
        <div className={styles.cartSummary}>
          <p>🛒 Cart: {cart.length} item(s)</p>
          <button className={styles.primaryButton}>
            View Cart
          </button>
        </div>
      )}

      {/* Newsletter Section */}
      <div className={styles.newsletterSection}>
        <h2>Stay Updated</h2>
        <p>Get notified about new products and exclusive discounts.</p>
        <div className={styles.newsletterForm}>
          <input 
            type="email" 
            placeholder="Enter your email"
            className={styles.emailInput}
          />
          <button className={styles.primaryButton}>
            Subscribe
          </button>
        </div>
      </div>
    </div>
  )
}

export default Shop
