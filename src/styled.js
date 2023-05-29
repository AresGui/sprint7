import styled from 'styled-components';

export const Panell = styled.form`
    width: 500px;
    height: auto;
    border: black solid 5px;
    border-radius: 10px;

    //display: ${({ isRight }) => isRight ? 'block' : 'none'};
`;

export const Opcion = styled.div`
    display: flex;
    flex-direction: row;
`
export const Label = styled.label`
  font-size: medium;
`;

