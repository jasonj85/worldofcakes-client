import { Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Container>
      <Typography variant="h5">404 Not Found :-(</Typography>
      <p>Please double check the url or return to the homepage.</p>
      <Button component={Link} to={"/catalog/cakes"}>
        Return to the cakes
      </Button>
    </Container>
  );
}
