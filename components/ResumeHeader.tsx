import styles from '../styles/ResumeHeader.module.css';

interface ResumeHeaderProps {
  title: string;
  summary: string;
  highlights: string[];
  skills: string[];
}

export const ResumeHeader: React.FC<ResumeHeaderProps> = ({
  title,
  summary,
  highlights,
  skills
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.summary}>{summary}</p>
      </div>

      <div className={styles.content}>
        <div className={styles.highlights}>
          <h3 className={styles.sectionTitle}>Key Highlights</h3>
          <ul className={styles.highlightList}>
            {highlights.map((highlight, index) => (
              <li key={index} className={styles.highlightItem}>
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.skills}>
          <h3 className={styles.sectionTitle}>Core Skills</h3>
          <div className={styles.skillGrid}>
            {skills.map((skill, index) => (
              <span key={index} className={styles.skillTag}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};