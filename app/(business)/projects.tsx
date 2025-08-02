import { useState, useEffect } from 'react'
import ServiceCard from '../../components/ServiceCard'
import { Service } from '../../models/service'
import styles from '../../styles/Home.module.css'
import servicesData from '../../data/services.json'

const Projects = () => {
  const [services, setServices] = useState<Service[]>([])
  const [filteredServices, setFilteredServices] = useState<Service[]>([])
  const [activeFilter, setActiveFilter] = useState<string>('All')

  useEffect(() => {
    const serviceInstances = servicesData.map(data => 
      new Service(
        data.id,
        data.name,
        data.description,
        data.category,
        data.price,
        data.duration,
        data.features,
        data.image,
        data.isPopular
      )
    )
    setServices(serviceInstances)
    setFilteredServices(serviceInstances)
  }, [])

  const categories = ['All', ...Array.from(new Set(services.map(service => service.category)))]

  const handleFilterChange = (category: string) => {
    setActiveFilter(category)
    if (category === 'All') {
      setFilteredServices(services)
    } else {
      setFilteredServices(services.filter(service => service.category === category))
    }
  }

  const handleLearnMore = (service: Service) => {
    alert(`Learn more about: ${service.name}\n\nThis would typically open a detailed service page or modal.`)
  }

  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Business Services</h1>
        <p className={styles.pageSubtitle}>
          Professional development services to bring your ideas to life. 
          From concept to deployment, we provide end-to-end solutions 
          tailored to your business needs.
        </p>
      </div>

      <div className={styles.filterSection}>
        {categories.map(category => (
          <button
            key={category}
            className={`${styles.filterButton} ${activeFilter === category ? styles.active : ''}`}
            onClick={() => handleFilterChange(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {filteredServices.map(service => (
          <ServiceCard
            key={service.id}
            service={service}
            onLearnMore={handleLearnMore}
          />
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className={styles.noResults}>
          <p>No services found for the selected category.</p>
        </div>
      )}

      <div className={styles.ctaSection}>
        <h2>Ready to Start Your Project?</h2>
        <p>Get in touch to discuss your requirements and receive a custom quote.</p>
        <div className={styles.ctaButtons}>
          <button className={styles.primaryButton}>
            Schedule Consultation
          </button>
          <button className={styles.secondaryButton}>
            View Portfolio
          </button>
        </div>
      </div>
    </div>
  )
}

export default Projects
