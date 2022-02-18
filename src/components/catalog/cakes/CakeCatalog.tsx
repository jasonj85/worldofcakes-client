import agent from "../../../api/agent";
import { useEffect, useState } from "react";
import { Cake } from "../../../models/Cake";
import CakeList from "./CakeList";
import LoadingSpinner from "../../system/LoadingSpinner";

export default function Catalog() {
  const [cakes, setCakes] = useState<Cake[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    agent.CakeCatalog.list()
      .then(setCakes)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;

  return <CakeList cakes={cakes} />;
}
