import { Career } from '@/models';
import CareerCard from '../CareerCard';
import { SectionWrapper } from './SectionWrapper';

interface CareerSectionProps {
  careers: Career[];
  title?: string;
}

export const CareerSection: React.FC<CareerSectionProps> = ({ 
  careers, 
  title = "Career" 
}) => {
  return (
    <SectionWrapper title={title}>
      <div>
        {careers.map((career, index) => (
          <CareerCard key={index} career={career} />
        ))}
      </div>
    </SectionWrapper>
  );
};
