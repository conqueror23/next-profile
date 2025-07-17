import { GetStaticProps } from 'next';
import Head from 'next/head';
import { Career, Education, Contact } from '@/models';
import { ResumeHeader } from '@/components/ResumeHeader';
import { CareerSection } from '@/components/section/CareerSection';
import { EducationSection } from '@/components/section/EducationSection';
import { ContactDetails } from '@/components/ContactDetails';
import styles from '../styles/Resume.module.css';

interface ResumePageProps {
  summary: {
    title: string;
    summary: string;
    highlights: string[];
    skills: string[];
  };
  careers: any[];
  educations: any[];
  contact: any;
}

const ResumePage: React.FC<ResumePageProps> = ({
  summary,
  careers,
  educations,
  contact
}) => {
  return (
    <>
      <Head>
        <title>Resume - {summary.title}</title>
        <meta name="description" content={summary.summary} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={styles.container}>
        <div className={styles.content}>
          <ResumeHeader
            title={summary.title}
            summary={summary.summary}
            highlights={summary.highlights}
            skills={summary.skills}
          />

          <div className={styles.sections}>
            <div className={styles.mainSections}>
              <CareerSection careers={careers} title="Professional Experience" />
              <EducationSection educations={educations} title="Education" />
            </div>
            
            <div className={styles.sidebar}>
              <ContactDetails contact={contact} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // Import JSON data
  const summaryData = await import('../data/summary.json');
  const careerData = await import('../data/career.json');
  const educationData = await import('../data/education.json');
  const contactData = await import('../data/contact.json');

  // Transform data to plain objects (serializable)
  const careers = careerData.default.map((career: any) => ({
    title: career.title,
    company: career.company,
    responsibilities: career.responsibilities,
    startTime: career.startTime,
    endTime: career.endTime,
    duration: career.duration
  }));

  const educations = educationData.default.map((education: any) => ({
    institution: education.institution,
    degree: education.degree,
    field: education.field,
    startDate: education.startDate,
    endDate: education.endDate,
    grade: education.grade,
    description: education.description,
    achievements: education.achievements
  }));

  const contact = {
    email: contactData.default.email,
    phone: contactData.default.phone,
    location: contactData.default.location,
    linkedin: contactData.default.linkedin,
    github: contactData.default.github,
    website: contactData.default.website,
    twitter: contactData.default.twitter
  };

  return {
    props: {
      summary: summaryData.default,
      careers,
      educations,
      contact,
    },
  };
};

export default ResumePage;