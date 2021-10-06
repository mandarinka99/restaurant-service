import {
  Button,
  Container,
  makeStyles,
  Card,
  TextField,
} from "@material-ui/core";
import QRCode from "qrcode";
import { useRef, useState } from "react";
import QrReader from "react-qr-reader";

const CreateQrCode = () => {
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState();
  const [scanResaltFile, setScanResaltFile] = useState("");
  const classes = useStyles();
  const qrRef = useRef(null);

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

// read qrCode
// <Button
//   className={classes.button}
//   variant="contained"
//   color="secondary"
//   onClick={() => {}}
// >
//   Scan QR Code
// </Button>
// <QrReader
//   ref={qrRef}
//   delay={300}
//   style={{ width: "100%" }}
//   onError={handleErrorFile}
//   onScan={handleScanFile}
//   legacyMode
// />
// <h2>Scanned Code</h2>

// const handleErrorFile = (error) => {
//   console.log(error);
// };

// const handleScanFile = (result) => {
//   if (result) {
//     setScanResaltFile(result);
//   }
// };
