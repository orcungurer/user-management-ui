import { useRef } from "react";
import Button from "../ui/button/Button";
import { FiltersContainer } from "./Filters.styles";

export interface FiltersProps {
  onFilter: (search: string, type: string) => void;
  setCurrentPage: (page: number) => void;
}

const Filters: React.FC<FiltersProps> = ({ onFilter, setCurrentPage }) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const roleRef = useRef<HTMLSelectElement>(null);

  const applyFiltersHandler = () => {
    const searchValue = searchRef.current?.value || "";
    const roleValue = roleRef.current?.value || "";

    setCurrentPage(1);
    onFilter(searchValue, roleValue);
  };

  return (
    <FiltersContainer>
      <input ref={searchRef} type="text" placeholder="Search a User" />
      <select ref={roleRef}>
        <option value="">All</option>
        <option value="Superuser">Superuser</option>
        <option value="Admin">Admin</option>
        <option value="User">User</option>
      </select>
      <Button onClick={applyFiltersHandler}>Search</Button>
    </FiltersContainer>
  );
};

export default Filters;
