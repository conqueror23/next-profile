import { Contact, ContactInfo } from '@/models';
import styles from '../styles/ContactDetails.module.css';

interface ContactDetailsProps {
  contact: Contact;
}

export const ContactDetails: React.FC<ContactDetailsProps> = ({ contact }) => {
  const contactItems: ContactInfo[] = [
    {
      label: 'Email',
      value: contact.email,
      link: `mailto:${contact.email}`,
      icon: '📧'
    },
    {
      label: 'Phone',
      value: contact.phone,
      link: `tel:${contact.phone.replace(/\D/g, '')}`,
      icon: '📱'
    },
    {
      label: 'Location',
      value: contact.location,
      icon: '📍'
    }
  ];

  if (contact.linkedin) {
    contactItems.push({
      label: 'LinkedIn',
      value: 'LinkedIn Profile',
      link: contact.linkedin,
      icon: '💼'
    });
  }

  if (contact.github) {
    contactItems.push({
      label: 'GitHub',
      value: 'GitHub Profile',
      link: contact.github,
      icon: '🐙'
    });
  }

  if (contact.website) {
    contactItems.push({
      label: 'Website',
      value: 'Personal Website',
      link: contact.website,
      icon: '🌐'
    });
  }

  if (contact.twitter) {
    contactItems.push({
      label: 'Twitter',
      value: 'Twitter Profile',
      link: contact.twitter,
      icon: '🐦'
    });
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Contact Information</h2>
      <div className={styles.contactGrid}>
        {contactItems.map((item, index) => (
          <div key={index} className={styles.contactItem}>
            <div className={styles.contactIcon}>
              {item.icon}
            </div>
            <div className={styles.contactContent}>
              <span className={styles.contactLabel}>{item.label}</span>
              {item.link ? (
                <a 
                  href={item.link} 
                  className={styles.contactLink}
                  target={item.link.startsWith('http') ? '_blank' : '_self'}
                  rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {item.value}
                </a>
              ) : (
                <span className={styles.contactValue}>{item.value}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};