import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import agent from "../../api/agent";
import { Cake } from "../../models/Cake";
import LoadingSpinner from "../system/LoadingSpinner";
import AdminCakeList from "./AdminCakeList";
import { Add as AddIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Admin() {
  const [cakes, setCakes] = useState<Cake[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    agent.CakeCatalog.list()
      .then(setCakes)
      .finally(() => setLoading(false));
  }, []);

  const deleteById = async (id: number) => {
    const result = await agent.CakeCatalog.delete(id);

    if (result.status == 204) {
      toast.success("Success: Cake Deletion");
      setCakes(cakes.filter((c) => c.id != id));
    } else toast.error("Server Error: Cake Deletion");
  };

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <Button
        variant="contained"
        color="success"
        endIcon={<AddIcon />}
        sx={{ mb: 3 }}
        component={Link}
        to={`/admin/cakes/`}
      >
        Add new cake
      </Button>
      <AdminCakeList cakes={cakes} handleDelete={deleteById} />
    </>
  );
}
