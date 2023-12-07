// components/GroupTable.tsx
import { TableContainer, Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react";
import React from "react";

interface TeamItem {
  id_time: string;
  nome_time: string;
  abreviacao_time: string;
  imagem_time: string;
}

interface GroupTableProps {
  group: TeamItem[];
  groupName: string;
}

const GroupTable: React.FC<GroupTableProps> = ({ group, groupName }) => (
  <TableContainer>
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th color="orange.400">{groupName}</Th>
        </Tr>
      </Thead>
      <Tbody>
        {group.map((team) => (
          <Tr key={team.id_time}>
            <Td color="white">{team.nome_time}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  </TableContainer>
);

export default GroupTable;
