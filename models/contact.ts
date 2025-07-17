export class Contact {
  constructor(
    readonly email: string,
    readonly phone: string,
    readonly location: string,
    readonly linkedin?: string,
    readonly github?: string,
    readonly website?: string,
    readonly twitter?: string
  ) { }
}

export interface ContactInfo {
  label: string;
  value: string;
  link?: string;
  icon?: string;
}