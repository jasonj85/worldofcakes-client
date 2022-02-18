import { StarRateRounded } from "@mui/icons-material";
import { SyntheticEvent } from "react";

// display star rating based on rating score
export function StarRating(rating: number) {
  var stars = [];

  for (let i = 1; i <= rating; i++) {
    stars.push(<StarRateRounded key={i} />);
  }

  return stars;
}

// if image fails to load set default in it's place
export function addDefaultSrc(e: SyntheticEvent<HTMLImageElement, Event>) {
  e.currentTarget.src = "/cakes/cake-placeholder.png";
}
