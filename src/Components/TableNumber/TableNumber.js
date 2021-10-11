import { Button, Container, TextField } from "@material-ui/core";
import { useState } from "react";
import axios from "axios";

const baseURL =
  "https://new-project-d3d31-default-rtdb.europe-west1.firebasedatabase.app/";

const addTable = async (tableNumber) => {
  try {
    const { data } = await axios.post(`${baseURL}restaurant.json`, {
      tableNumber: tableNumber,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

const TableNumber = () => {
  const [tableNumber, setTableNumber] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(`tableId`, tableNumber);
    addTable(tableNumber);
  };

  const onHandleChange = (e) => {
    setTableNumber(e.target.value);
  };

  return (
    <Container>
      <form onSubmit={onSubmit}>
        <TextField
          type="text"
          name="tableId"
          value={tableNumber}
          onChange={onHandleChange}
          label="Table number"
          required
          variant="outlined"
          size="small"
        />
        <Button type="submit" color="primary" size="small" variant="outlined">
          ADD TABLE
        </Button>
      </form>
    </Container>
  );
};

export default TableNumber;
