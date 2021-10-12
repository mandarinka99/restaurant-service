import { Button, Container, makeStyles, Card, Icon } from "@material-ui/core";
import axios from "axios";
import QRCode from "qrcode";
import { useEffect, useState } from "react";

const baseURL =
  "https://new-project-d3d31-default-rtdb.europe-west1.firebasedatabase.app/";

const fetchTables = async () => {
  try {
    const { data } = await axios.get(`${baseURL}restaurant.json`);
    const res = data
      ? Object.entries(data).map(([id, table]) => ({ id, ...table }))
      : [];
    console.log(`res`, res);
    return res;
  } catch (error) {
    throw error;
  }
};

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

const CreateQrCode = () => {
  const [imagesUrl, setImagesUrl] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    fetchTables().then((res) => {
      const qrArrPromise = [];
      res.map((item) => qrArrPromise.push(genereteQrCode(item.tableNumber)));

      Promise.all(qrArrPromise).then((qr) => {
        setImagesUrl(qr);
      });
    });
  }, []);

  const onClick = (e) => {
    addTable(imagesUrl.length + 1);
    const newArrImagesUrl = [...imagesUrl];
    genereteQrCode(imagesUrl.length + 1).then((res) => {
      newArrImagesUrl.push(res);
      console.log(`newArrImagesUrl`, newArrImagesUrl);
      setImagesUrl(newArrImagesUrl);
    });
  };

  const genereteQrCode = (num) => {
    try {
      const mainUrl = `http://localhost:3000/table?number=${num}`;
      return QRCode.toDataURL(mainUrl);
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
        {imagesUrl.length && (
          <ul>
            {imagesUrl.map((imageUrl, index) => (
              <li key={index + 1}>
                <a href={imageUrl} download>
                  <img src={imageUrl} alt="qrCode" />
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
