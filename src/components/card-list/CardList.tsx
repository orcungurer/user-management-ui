import { User } from "@/lib/generateUsers";
import Card from "../ui/card/Card";
import Button from "../ui/button/Button";
import { useRouter } from "next/router";
import styled from "styled-components";

interface CardListProps {
  users: User[];
}

const CardsContainer = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CardList: React.FC<CardListProps> = ({ users }) => {
  const router = useRouter();

  return (
    <CardsContainer>
      {users.map((user) => (
        <Card key={user.id}>
          <CardContent>
            <p>
              <strong>Name:</strong>
            </p>
            <p>{user.name}</p>
            <p>
              <strong>Email:</strong>
            </p>
            <p>{user.email}</p>
            <p>
              <strong>Role:</strong>
            </p>
            <p>{user.role}</p>
            <p>
              <strong>Created:</strong>
            </p>
            <p>{new Date(user.createdAt).toLocaleDateString()}</p>
            <Button onClick={() => router.push(`users/${user.id}`)}>
              Details
            </Button>
          </CardContent>
        </Card>
      ))}
    </CardsContainer>
  );
};

export default CardList;
