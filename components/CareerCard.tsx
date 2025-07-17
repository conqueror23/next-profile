import { Career } from '../models'
const CareerCard = (career: Career) => {
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
