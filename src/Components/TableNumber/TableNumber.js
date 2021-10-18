import { useEffect } from "react";
import { useParams } from "react-router";
import { addQuery, fetchTables } from "../../utils";

const TableNumber = () => {
  const { number } = useParams();
  console.log(`number`, number);

  useEffect(() => {
    fetchTables().then((res) => {
      const findNumber = res.find(
        (item) => `${item.tableNumber}` === `${number}`
      );
      if (findNumber) {
        addQuery(number);
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
