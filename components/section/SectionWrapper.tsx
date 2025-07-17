import { ReactNode } from "react"

interface SectionWrapperProps {
  title: string;
  children: ReactNode;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({ title, children }) => {
  return (
    <section
      id={title.toLowerCase().replace(/\s+/g, '-')}
    >
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ 
          fontSize: '1.875rem', 
          fontWeight: '700', 
          color: '#1f2937', 
          marginBottom: '1.5rem',
          borderBottom: '2px solid #e5e7eb',
          paddingBottom: '0.5rem'
        }}>
          {title}
        </h2>
        {children}
      </div>
    </section>
  )
}
