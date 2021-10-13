import { Button, Container, makeStyles, Card, Icon } from "@material-ui/core";
import QRCode from "qrcode";
import { useEffect, useState } from "react";
import { addTable, fetchQueries, fetchTables } from "../../utils";

let needInterval = true;

const CreateQrCode = () => {
  const [tablesList, setTablesList] = useState([]);
  const [queries, setQueries] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    fetchTables().then((res) => {
      const tablesListArrPromise = [];
      res.map((item) =>
        tablesListArrPromise.push(genereteQrCode(item.tableNumber, item.id))
      );

      Promise.all(tablesListArrPromise).then((qrCodes) => {
        const mapped = qrCodes.map((item) => ({
          qr: item.qr,
          tableNumber: item.num,
          id: item.id,
        }));
        console.log(`mapped`, mapped);
        setTablesList(mapped);
      });
    });
  }, []);

  if (needInterval) {
    needInterval = false;
    setInterval(() => {
      fetchQueries().then((res) => {
        setQueries(res);
      });
    }, 10000);
  }
  console.log("res", queries);

  const onClick = (e) => {
    addTable(tablesList.length + 1);
    const newArrTablesList = [...tablesList];
    genereteQrCode(tablesList.length + 1).then((res) => {
      newArrTablesList.push(res);
      setTablesList(newArrTablesList);
    });
  };

  const genereteQrCode = async (num, id) => {
    try {
      const mainUrl = `http://localhost:3000/table/${num}`;
      const qr = await QRCode.toDataURL(mainUrl);
      return { qr, num, id };
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className={classes.container}>
      <Card>
        <h2 className={classes.title}>Generate QR Code</h2>
        <Button
          className={classes.buttonAdd}
          variant="outlined"
          color="primary"
          onClick={onClick}
        >
          <Icon fontSize="inherit">add_circle</Icon>
        </Button>
        {tablesList.length && (
          <ul>
            {tablesList.map((table, index) => (
              <li key={index + 1}>
                <a href={table.qr} download>
                  <img src={table.qr} alt="qrCode" />
                </a>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 10,
  },
  title: {
    display: "flex",
    justifyContent: "center",
    alineItems: "center",
    background: "#2e6ff2",
    color: "#fff",
    padding: 20,
    margin: 0,
  },
  button: {
    marginTop: 10,
  },
  buttonAdd: {
    fontSize: 100,
    width: 300,
    height: 300,
    marginTop: 20,
  },
}));

export default CreateQrCode;
