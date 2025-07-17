import { ReactNode } from "react"

export const CardWrapper = (cardTitle: string, cardContent: ReactNode) => {
  // add card logic
  return (
    <div>
      <h1>
        {cardTitle}
      </h1>
      {cardContent}
    </div>
  )
}
