import Container from "../../components/container";
import { useUser } from "../../context/UserContext";

const Dashboard = () => {
  const { user } = useUser();

  return (
    <Container>
      <div className="bg-botoes h-full w-full overflow-y-auto">
        {user.events ? <>eventos</> : <div></div>}
      </div>
    </Container>
  );
};

export default Dashboard;
