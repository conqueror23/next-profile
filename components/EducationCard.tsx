import { Education } from '@/models';
import styles from '../styles/EducationCard.module.css';

interface EducationCardProps {
  education: Education;
}

export const EducationCard: React.FC<EducationCardProps> = ({ education }) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.degree}>{education.degree}</h3>
        <span className={styles.period}>
          {formatDate(education.startDate)} - {formatDate(education.endDate)}
        </span>
      </div>
      
      <div className={styles.institution}>
        <h4>{education.institution}</h4>
        <p className={styles.field}>{education.field}</p>
      </div>

      {education.grade && (
        <div className={styles.grade}>
          <span className={styles.gradeLabel}>Grade: </span>
          <span className={styles.gradeValue}>{education.grade}</span>
        </div>
      )}

      {education.description && (
        <p className={styles.description}>{education.description}</p>
      )}

      {education.achievements && education.achievements.length > 0 && (
        <div className={styles.achievements}>
          <h5>Key Achievements:</h5>
          <ul>
            {education.achievements.map((achievement, index) => (
              <li key={index}>{achievement}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};