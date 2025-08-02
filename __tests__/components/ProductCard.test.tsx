import { render, screen, fireEvent } from '@testing-library/react'
import ProductCard from '../../components/ProductCard'
import { Product } from '../../models/product'

const mockProduct = new Product(
  '1',
  'Gaming Laptop',
  'High-performance laptop for gaming and development',
  1299.99,
  'USD',
  'Electronics',
  '/images/laptop.jpg',
  ['/images/laptop1.jpg', '/images/laptop2.jpg'],
  true,
  5,
  4.5,
  124,
  ['gaming', 'laptop', 'high-performance'],
  { CPU: 'Intel i7', GPU: 'RTX 3070', RAM: '16GB' },
  true,
  true,
  15
)

const mockOutOfStockProduct = new Product(
  '2',
  'Wireless Mouse',
  'Ergonomic wireless mouse',
  49.99,
  'USD',
  'Accessories',
  '/images/mouse.jpg',
  [],
  false,
  0,
  4.2,
  89,
  ['mouse', 'wireless'],
  undefined,
  false,
  false
)

describe('ProductCard Component', () => {
  const mockOnAddToCart = jest.fn()
  const mockOnViewDetails = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />)
    
    expect(screen.getByText('Gaming Laptop')).toBeInTheDocument()
    expect(screen.getByText('High-performance laptop for gaming and development')).toBeInTheDocument()
    expect(screen.getByText('Electronics')).toBeInTheDocument()
    expect(screen.getByText('4.5 (124 reviews)')).toBeInTheDocument()
  })

  test('displays badges correctly for featured and new products', () => {
    render(<ProductCard product={mockProduct} />)
    
    expect(screen.getByText('New')).toBeInTheDocument()
    expect(screen.getByText('Featured')).toBeInTheDocument()
    expect(screen.getByText('-15%')).toBeInTheDocument()
  })

  test('calculates and displays discounted price correctly', () => {
    render(<ProductCard product={mockProduct} />)
    
    expect(screen.getByText('$1299.99')).toBeInTheDocument()
    expect(screen.getByText('$1104.99 USD')).toBeInTheDocument()
  })

  test('displays tags correctly', () => {
    render(<ProductCard product={mockProduct} />)
    
    expect(screen.getByText('gaming')).toBeInTheDocument()
    expect(screen.getByText('laptop')).toBeInTheDocument()
    expect(screen.getByText('high-performance')).toBeInTheDocument()
  })

  test('shows in stock status correctly', () => {
    render(<ProductCard product={mockProduct} />)
    
    expect(screen.getByText('✓ In Stock')).toBeInTheDocument()
  })

  test('shows out of stock status correctly', () => {
    render(<ProductCard product={mockOutOfStockProduct} />)
    
    expect(screen.getByText('✗ Out of Stock')).toBeInTheDocument()
    expect(screen.getByText('Unavailable')).toBeInTheDocument()
  })

  test('calls onViewDetails when View Details button is clicked', () => {
    render(<ProductCard product={mockProduct} onViewDetails={mockOnViewDetails} />)
    
    const viewDetailsButton = screen.getByText('View Details')
    fireEvent.click(viewDetailsButton)
    
    expect(mockOnViewDetails).toHaveBeenCalledWith(mockProduct)
  })

  test('calls onAddToCart when Add to Cart button is clicked for in-stock product', () => {
    render(<ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />)
    
    const addToCartButton = screen.getByText('Add to Cart')
    fireEvent.click(addToCartButton)
    
    expect(mockOnAddToCart).toHaveBeenCalledWith(mockProduct)
  })

  test('does not call onAddToCart for out-of-stock product', () => {
    render(<ProductCard product={mockOutOfStockProduct} onAddToCart={mockOnAddToCart} />)
    
    const unavailableButton = screen.getByText('Unavailable')
    fireEvent.click(unavailableButton)
    
    expect(mockOnAddToCart).not.toHaveBeenCalled()
  })

  test('displays star rating correctly', () => {
    render(<ProductCard product={mockProduct} />)
    
    const stars = screen.getByText('★★★★')
    expect(stars).toBeInTheDocument()
  })

  test('renders without optional props', () => {
    render(<ProductCard product={mockProduct} />)
    
    expect(screen.getByText('Gaming Laptop')).toBeInTheDocument()
  })

  test('renders without crashing', () => {
    expect(() => render(<ProductCard product={mockProduct} />)).not.toThrow()
  })
})