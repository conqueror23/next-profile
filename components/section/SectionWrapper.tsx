import { ReactNode } from "react"

export const SectionWrapper = (section: string, children: ReactNode) => {
  return (
    <section
      id={section}
    >
      {children}
    </section>
  )
}
