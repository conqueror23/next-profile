import { Education } from '@/models';
import { EducationCard } from '../EducationCard';
import { SectionWrapper } from './SectionWrapper';

interface EducationSectionProps {
  educations: Education[];
  title?: string;
}

export const EducationSection: React.FC<EducationSectionProps> = ({ 
  educations, 
  title = "Education" 
}) => {
  return (
    <SectionWrapper title={title}>
      <div>
        {educations.map((education, index) => (
          <EducationCard key={index} education={education} />
        ))}
      </div>
    </SectionWrapper>
  );
};