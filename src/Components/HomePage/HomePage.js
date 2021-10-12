import { Container, Link, makeStyles } from "@material-ui/core";

const HomePage = () => {
  return (
    <Container>
      <Link underline="hover" color="inherit" href="/qr">
        Generete QR code
      </Link>
      <Link underline="hover" color="inherit" href="/table">
        Add table
      </Link>
    </Container>
  );
};

export default HomePage;
