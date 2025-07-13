import styled from "styled-components";

const CardContainer = styled.div`
  background-color: #fff;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
`;

const Card: React.FC<{
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}> = ({ children, className, onClick }) => {
  return (
    <CardContainer className={className} onClick={onClick}>
      {children}
    </CardContainer>
  );
};

export default Card;
