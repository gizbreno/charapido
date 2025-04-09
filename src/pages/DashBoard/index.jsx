import {auth} from '../../firebase'


const Dashboard = () => {

  const user = auth.currentUser

  console.log(user.phoneNumber)
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard