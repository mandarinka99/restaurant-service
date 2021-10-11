import {
  Button,
  Container,
  makeStyles,
  Card,
  TextField,
} from "@material-ui/core";
import QRCode from "qrcode";
import { useState } from "react";

const CreateQrCode = () => {
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState();

  const classes = useStyles();

  const genereteQrCode = async () => {
    try {
      const response = await QRCode.toDataURL(url);
      setImageUrl(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container className={classes.container}>
      <Card>
        <h2 className={classes.title}>Generate QR Code</h2>
        <TextField label="Enter URL" onChange={(e) => setUrl(e.target.value)} />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={() => genereteQrCode()}
        >
          Generate
        </Button>
        <br />
        {imageUrl && (
          <a href={imageUrl} download>
            <img src={imageUrl} alt="qrCode" />
          </a>
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
}));

export default CreateQrCode;
