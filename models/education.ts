export class Education {
  constructor(
    readonly institution: string,
    readonly degree: string,
    readonly field: string,
    readonly startDate: string,
    readonly endDate: string,
    readonly grade?: string,
    readonly description?: string,
    readonly achievements?: string[]
  ) { }
}