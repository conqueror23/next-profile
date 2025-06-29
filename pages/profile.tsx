import type { NextPage } from 'next'
import { Summary, Projects, Careers } from "../components/index"
const Profile: NextPage = () => {
  return (
    <>
      <h1> Profile</h1>
      <Summary />
      <Projects />
      <Careers />
    </>

  )
}


export default Profile
