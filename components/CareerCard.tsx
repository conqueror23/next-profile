import { Career } from '../models'

interface CareerCardProps {
  career: Career;
}

const CareerCard: React.FC<CareerCardProps> = ({ career }) => {
  const { title, company, startTime, endTime, responsibilities } = career
  return (
    <div>
      <span>
        <h2> {title}</h2 >
        <h3>{company}</h3>
      </span>
      <span>
        <span>{startTime}</span>
        <span>{endTime}</span>
      </span>
      <p>
        {responsibilities}
      </p>
    </div>
  )
}

export default CareerCard
