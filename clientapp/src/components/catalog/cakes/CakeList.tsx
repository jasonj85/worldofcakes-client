import { Grid } from "@mui/material";
import { Cake } from "../../../models/Cake";
import CakeCard from "./CakeCard";

interface IProps {
  cakes: Cake[];
}

export default function CakeList({ cakes }: IProps) {
  return (
    <Grid container spacing={4}>
      {cakes.map((cake) => (
        <Grid item md={6} lg={4} key={cake.id}>
          <CakeCard cake={cake} />
        </Grid>
      ))}
    </Grid>
  );
}
