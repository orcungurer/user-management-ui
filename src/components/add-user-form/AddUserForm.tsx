import { Fragment, useState } from "react";
import Button from "../ui/button/Button";
import { User } from "@/lib/generateUsers";
import { faker } from "@faker-js/faker";
import { CheckboxGroup, InputGroup, Title } from "./AddUserForm.styles";
import { ButtonWrapper } from "../ui/button/Button.styles";
import z from "zod";

interface AddUserFormProps {
  onAddUser: (user: User) => void;
  onClose: () => void;
}

const AddUserForm: React.FC<AddUserFormProps> = ({ onAddUser, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Superuser" as "Superuser" | "Admin" | "User",
    active: false,
  });

  const [errors, setErrors] = useState<string[]>([]);

  const userSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(["Superuser", "Admin", "User"], "Role is required"),
    active: z.boolean(),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = userSchema.safeParse(formData);

    if (!result.success) {
      const errorMessages = result.error.issues.map((err) => err.message);
      setErrors(errorMessages);
      return;
    }
    console.log("Validation result:", result);

    const newUser: User = {
      id: faker.string.uuid(),
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      active: formData.active,
      createdAt: new Date().toISOString(),
      location: {
        lat: Number(faker.location.latitude()),
        lng: Number(faker.location.longitude()),
      },
    };

    onAddUser(newUser);
    onClose();
  };

  return (
    <Fragment>
      <Title>Add New User</Title>
      <form onSubmit={handleSubmit}>
        <InputGroup>
          <label>Name:</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            placeholder="E.g., John Doe"
          />
        </InputGroup>
        <InputGroup>
          <label>Email:</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
            placeholder="E.g., example@example.com"
          />
        </InputGroup>
        <InputGroup>
          <label>Password:</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
            placeholder="At least 6 characters"
          />
        </InputGroup>
        <InputGroup>
          <label>Role:</label>
          <select
            value={formData.role}
            onChange={(e) =>
              setFormData({
                ...formData,
                role: e.target.value as "Superuser" | "Admin" | "User",
              })
            }
            required
          >
            <option value="" disabled>
              Select a role...
            </option>
            <option value="Superuser">Superuser</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
        </InputGroup>
        <CheckboxGroup>
          <label>Active: </label>
          <input
            type="checkbox"
            checked={formData.active}
            onChange={(e) =>
              setFormData({ ...formData, active: e.target.checked })
            }
          />
        </CheckboxGroup>
        {errors.length > 0 && (
          <ul
            style={{ color: "red", textAlign: "center", listStyleType: "none" }}
          >
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}
        <ButtonWrapper>
          <Button type="submit">Save</Button>
          <Button type="button" onClick={onClose} outline>
            Cancel
          </Button>
        </ButtonWrapper>
      </form>
    </Fragment>
  );
};

export default AddUserForm;
