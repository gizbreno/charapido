import {auth} from '../../firebase'
import Container from '../../components/container'

const Dashboard = () => {

  const user = auth.currentUser

  console.log(user.phoneNumber)
  return (
    <Container >
      <div className='bg-botoes h-full w-full overflow-y-auto'>sss</div>
    </Container>
  )
}

export default Dashboard