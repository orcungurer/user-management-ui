import { generateFakeUsers, User } from "@/lib/generateUsers";
import { useEffect, useState } from "react";
import Table from "../table/Table";
import Pagination from "../pagination/Pagination";
import { ITEMS_PER_PAGE } from "@/constants/pagination";
import Filters from "../filters/Filters";
import {
  ActionsContainer,
  Title,
  Container,
  ToggleButtons,
} from "./Users.styles";
import { LOCAL_STORAGE_KEY } from "@/constants/constants";
import Button from "../ui/button/Button";
import ToggleGroup from "../ui/toggle-group/ToggleGroup";
import CardList from "../card-list/CardList";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchUser, setSearchUser] = useState("");
  const [role, setRole] = useState("");
  const [view, setView] = useState<"table" | "card">("table");
  const [list, setList] = useState<"paginated" | "all">("paginated");
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

  const visibleUsers = list === "all" ? filteredUsers : paginatedUsers;

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

  useEffect(() => {
    setCurrentPage(1);
  }, [list]);

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
        <ToggleButtons>
          <ToggleGroup
            options={["table", "card"]}
            value={view}
            onClick={setView}
          />
          <ToggleGroup
            options={["paginated", "all"]}
            value={list}
            onClick={setList}
          />
        </ToggleButtons>
        <Button>Add New User</Button>
      </ActionsContainer>
      {view === "table" && <Table users={visibleUsers} />}
      {view === "card" && <CardList users={visibleUsers} />}
      {list === "paginated" && (
        <Pagination
          totalItems={filteredUsers.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </Container>
  );
};

export default Users;
