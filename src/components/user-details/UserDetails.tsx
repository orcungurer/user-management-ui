import { useEffect, useState } from "react";
import Card from "../ui/card/Card";
import { Container, Title } from "../users/Users.styles";
import { LOCAL_STORAGE_KEY } from "@/constants/constants";
import { User } from "@/lib/generateUsers";
import Button from "../ui/button/Button";
import { useRouter } from "next/router";
import { UserInfo } from "./UserDetails.styles";
import { ButtonWrapper } from "../ui/button/Button.styles";
import dynamic from "next/dynamic";

const UserMap = dynamic(() => import("./UserMap"), { ssr: false });

const UserDetails: React.FC<{ id: string }> = ({ id }) => {
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    const storedUsers = localStorage.getItem(LOCAL_STORAGE_KEY);
    const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];

    const user = users.find((user) => user.id === id);
    setUserDetails(user || null);
  }, [id]);

  if (!userDetails) {
    return <div>User not found.</div>;
  }

  console.log("User Details:", userDetails);

  return (
    <Container>
      <Title>User Details</Title>
      <Card>
        <UserInfo>
          <strong>Name:</strong>
          <p>{userDetails.name}</p>
        </UserInfo>
        <UserInfo>
          <strong>Email:</strong>
          <p>{userDetails.email}</p>
        </UserInfo>
        <UserMap lat={userDetails.location.lat} lng={userDetails.location.lng} />
      </Card>
      <ButtonWrapper>
        <Button onClick={() => router.back()}>Back</Button>
      </ButtonWrapper>
    </Container>
  );
};

export default UserDetails;
