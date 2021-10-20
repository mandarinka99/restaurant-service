import { useEffect } from "react";
import { useParams } from "react-router";
import { fetchTables, updateTable } from "../../utils";

const TableNumber = () => {
  const { number } = useParams();

  useEffect(() => {
    fetchTables().then((res) => {
      const findIndex = res.findIndex(
        (item) => `${item.tableNumber}` === `${number}`
      );
      if (findIndex >= 0) {
        updateTable(res[findIndex].id, true);
      }
    });
  }, []);

  return (
    <>
      <h2>The waiter runs to you</h2>
    </>
  );
};

export default TableNumber;
