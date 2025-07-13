import Card from "../ui/card/Card";
import { User } from "@/lib/generateUsers";
import Button from "../ui/button/Button";
import { useRouter } from "next/router";
import {
  NoData,
  StyledTable,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from "./Table.styles";

export interface TableProps {
  users: User[];
}

const Table: React.FC<TableProps> = ({ users }) => {
  const router = useRouter();

  return (
    <Card>
      <TableContainer>
        <StyledTable>
          <thead>
            <TableRow>
              <TableHeader>Name</TableHeader>
              <TableHeader>Email</TableHeader>
              <TableHeader>Role</TableHeader>
              <TableHeader>Creation Date</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {users.map((user: User) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  {new Date(user.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button onClick={() => router.push(`users/${user.id}`)}>
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </StyledTable>
        {users.length === 0 && <NoData>No users found.</NoData>}
      </TableContainer>
    </Card>
  );
};

export default Table;
