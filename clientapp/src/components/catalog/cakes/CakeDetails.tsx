import { useEffect, useState } from "react";
import {
  Button,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { Cake } from "../../../models/Cake";
import agent from "../../../api/agent";
import { addDefaultSrc, StarRating } from "./CakeUtils";
import LoadingSpinner from "../../system/LoadingSpinner";
import NotFound from "../../system/NotFound";
import { ArrowBackIos as ArrowBack } from "@mui/icons-material";

export default function CakeDetails() {
  const { id } = useParams<{ id: string }>();
  const [cake, setCake] = useState<Cake | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      setLoading(true);

      agent.CakeCatalog.details(parseInt(id))
        .then(setCake)
        .catch(console.log)
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!cake) return <NotFound />;

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={6}>
        <img
          src={`${cake.imageUrl}`}
          alt={cake.name}
          style={{ width: "100%" }}
          onError={addDefaultSrc}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h3">{cake.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h4" color="secondary">
          Yum Factor {cake.yumFactor}
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Rating</TableCell>
                <TableCell>{StarRating(cake.yumFactor)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{cake.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Comment</TableCell>
                <TableCell>{cake.comment}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          component={Link}
          to={`/catalog/cakes/`}
          sx={{ mt: 4 }}
        >
          Back to Cakes
        </Button>
      </Grid>
    </Grid>
  );
}
