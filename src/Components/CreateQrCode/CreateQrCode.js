import { Button, Container, makeStyles, Card, Icon } from "@material-ui/core";
import QRCode from "qrcode";
import { useEffect, useState } from "react";
import { addTable, fetchTables, updateTable } from "../../utils";

let needInterval = true;

const CreateQrCode = () => {
  const [tablesList, setTablesList] = useState([]);

  const classes = useStyles();

  const getTablesList = () => {
    fetchTables().then((res) => {
      const tablesListArrPromise = [];
      res.map((item) => tablesListArrPromise.push(genereteQrCode(item)));

      Promise.all(tablesListArrPromise).then((qrCodes) => {
        setTablesList(qrCodes);
      });
    });
  };

  useEffect(() => {
    getTablesList();
  }, []);

  console.log(`tablesList`, tablesList);

  if (needInterval) {
    needInterval = false;
    setInterval(() => {
      getTablesList();
    }, 10000);
  }

  const onClick = (e) => {
    addTable(tablesList.length + 1);
    const newArrTablesList = [...tablesList];
    genereteQrCode(tablesList.length + 1).then((res) => {
      newArrTablesList.push({ tableNumber: tablesList.length + 1, ...res });
      setTablesList(newArrTablesList);
    });
  };

  const genereteQrCode = async (item) => {
    try {
      const mainUrl = `http://localhost:3000/table/${item.tableNumber}`;
      const qr = await QRCode.toDataURL(mainUrl);
      return { qr, ...item };
    } catch (error) {
      console.log(error);
    }
  };

  const deleteActiveTable = async (id, isActive) => {
    await updateTable(id, isActive);
    getTablesList();
  };

  return (
    <Container className={classes.container}>
      <Card>
        <h2 className={classes.title}>Generate QR Code</h2>
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
          {!!tablesList.length &&
            tablesList.map((table) => (
              <li
                key={table.id}
                className={[classes[table.isActive ? "isActiveQr" : "qr"]].join(
                  " "
                )}
              >
                <h3>Table - {table.tableNumber}</h3>
                <a href={table.qr} download className={classes.qrLink}>
                  <img src={table.qr} alt="qrCode" className={classes.qrImg} />
                </a>
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  onClick={() => deleteActiveTable(table.id, false)}
                >
                  OK
                </Button>
              </li>
            ))}
        </ul>
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
  qrLink: {
    display: "block",
  },
  qrImg: {
    width: 230,
  },
}));

export default CreateQrCode;
