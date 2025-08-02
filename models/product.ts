export class Product {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly description: string,
    readonly price: number,
    readonly currency: string,
    readonly category: string,
    readonly image: string,
    readonly gallery: string[],
    readonly inStock: boolean,
    readonly stockQuantity: number,
    readonly rating: number,
    readonly reviewCount: number,
    readonly tags: string[],
    readonly specifications?: Record<string, string>,
    readonly isNew?: boolean,
    readonly isFeatured?: boolean,
    readonly discount?: number
  ) { }
}