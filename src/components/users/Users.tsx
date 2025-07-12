import { generateFakeUsers, User } from "@/lib/generateUsers";
import { useEffect, useState } from "react";

const LOCAL_STORAGE_KEY = "users";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);

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
    <div>
      <h1>Users</h1>
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <strong>Name:</strong> {user.name} - {" "}
              <strong>Email:</strong> {user.email} - {" "}
              <strong>Role:</strong> {user.role} - {" "}
              <strong>Date:</strong> {new Date(user.createdAt).toLocaleDateString()} - {" "}
              <strong>Location:</strong> {user.location.lat}, {user.location.lng}
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default Users;
