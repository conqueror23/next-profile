export class Service {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly description: string,
    readonly category: string,
    readonly price: string,
    readonly duration: string,
    readonly features: string[],
    readonly image?: string,
    readonly isPopular?: boolean
  ) { }
}