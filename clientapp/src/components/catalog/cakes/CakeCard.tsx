import { Cake as CakeIcon } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Cake } from "../../../models/Cake";
import { addDefaultSrc, StarRating } from "./CakeUtils";

interface IProps {
  cake: Cake;
}

export default function CakeCard({ cake }: IProps) {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "secondary.main" }}>
            <CakeIcon />
          </Avatar>
        }
        title={cake.name}
        titleTypographyProps={{
          sx: { fontWeight: "bold" },
        }}
      ></CardHeader>
      <CardMedia
        sx={{ objectFit: "cover", bgcolor: "primary.light", maxWidth: "450px" }}
        component="img"
        height="180"
        image={`${cake.imageUrl}`}
        onError={addDefaultSrc}
        alt={cake.name}
        title={cake.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" color="secondary">
          Yum Factor: {cake.yumFactor}
        </Typography>
        <Typography gutterBottom variant="h5" component="div" color="primary">
          {StarRating(cake.yumFactor)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {cake.comment}
        </Typography>
      </CardContent>
      <CardActions>
        <Button component={Link} to={`/catalog/cakes/${cake.id}`} size="small">
          View cake
        </Button>
      </CardActions>
    </Card>
  );
}
