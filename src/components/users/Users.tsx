import { generateFakeUsers, User } from "@/lib/generateUsers";
import { useEffect, useState } from "react";
import Table from "../table/Table";
import Pagination from "../pagination/Pagination";
import { ITEMS_PER_PAGE } from "@/constants/pagination";
import Filters from "../filters/Filters";
import { ActionsContainer, Title, Container } from "./Users.styles";
import { LOCAL_STORAGE_KEY } from "@/constants/constants";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchUser, setSearchUser] = useState("");
  const [role, setRole] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredUsers = users.filter((user) => {
    return (
      user.name.toLowerCase().includes(searchUser.toLowerCase()) &&
      (role ? user.role === role : true)
    );
  });

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    const storedUsers = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      const fakeUsers = generateFakeUsers();
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(fakeUsers));
      setUsers(fakeUsers);
    }
  }, []);

  return (
    <Container>
      <Title>Users</Title>
      <ActionsContainer>
        <Filters
          onFilter={(searchUser, selectedRole) => {
            setSearchUser(searchUser);
            setRole(selectedRole);
          }}
          setCurrentPage={setCurrentPage}
        />
      </ActionsContainer>
      <Table users={paginatedUsers} />
      <Pagination
        totalItems={filteredUsers.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </Container>
  );
};

export default Users;
