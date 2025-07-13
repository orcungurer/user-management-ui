import styled from "styled-components";

export const TableContainer = styled.div`
  overflow: auto;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #d2d2d2;

  &:hover {
    td {
      background-color: #f2f2f2;
    }
  }
`;

export const TableHeader = styled.th`
  padding-bottom: 1rem;
`;

export const TableCell = styled.td`
  padding: 0.5rem 0;
`;

export const NoData = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #777;
`;
