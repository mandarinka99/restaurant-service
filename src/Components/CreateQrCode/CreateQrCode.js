import { Button, Container, makeStyles, Card, Icon } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
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
        const activeTable = [];
        res.forEach((item) => {
          activeTable.push(Number(item.tableNumber));
        });
        setQueries(activeTable);
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

        {!!tablesList.length && (
          <ul className={classes.qrList}>
            <li className={classes.qr}>
              <Button
                className={classes.buttonAdd}
                variant="outlined"
                color="primary"
                onClick={onClick}
              >
                <Icon fontSize="inherit">add_circle</Icon>
              </Button>
            </li>
            {tablesList.map((table, index) => (
              <li
                key={index + 1}
                className={[
                  classes[
                    queries.includes(table.tableNumber) ? "isActiveQr" : "qr"
                  ],
                ].join(" ")}
              >
                <h3>Table - {table.tableNumber}</h3>
                <a href={table.qr} download>
                  <img src={table.qr} alt="qrCode" className={classes.qrImg} />
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
  buttonAdd: {
    fontSize: 100,
    width: 335,
    height: 335,
  },
  qrList: {
    padding: 20,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  qr: {
    margin: 20,
    width: 335,
    height: 335,
    border: "1px solid #3f51b5",
    borderRadius: 5,
    listStyle: "none",
    display: "block",
    textAlign: "center",
  },
  isActiveQr: {
    margin: 20,
    width: 335,
    height: 335,
    border: "3px solid red",
    borderRadius: 5,
    listStyle: "none",
    display: "block",
    textAlign: "center",
  },
  qrImg: {
    width: 230,
  },
}));

export default CreateQrCode;
