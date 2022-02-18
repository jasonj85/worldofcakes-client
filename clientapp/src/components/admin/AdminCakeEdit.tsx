import { Link, useParams } from "react-router-dom";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Cake } from "../../models/Cake";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Button,
  Grid,
  TextField,
  Typography,
  ButtonGroup,
} from "@mui/material";
import { useEffect, useState } from "react";
import agent from "../../api/agent";
import LoadingSpinner from "../system/LoadingSpinner";
import axios, { AxiosResponse } from "axios";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// validation schema provided by yup
const schema = yup.object().shape({
  name: yup.string().required().max(30),
  comment: yup.string().required().max(200),
  yumFactor: yup.number().required().min(0).max(5),
});

export default function AdminCakeEdit() {
  const { id } = useParams<{ id: string }>();
  const mode: string = id ? "Edit" : "Create";
  const navigate = useNavigate();

  const [cake, setCake] = useState<Cake | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState("");

  const fileChangeHandler = (event: any) => {
    setImage(event.target.files[0]);
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchData(id);
      setLoading(false);
    }
  }, [id]);

  const fetchData = async (id: string) => {
    const data: Cake = await agent.CakeCatalog.details(parseInt(id));
    setCake(data);
  };

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<Cake>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Cake> = async (data: Cake) => {
    if (image) {
      // upload image and save url
      const upload: AxiosResponse = await uploadImage();
      data.imageUrl = upload.data.url;
      toast.success(`Success: Image upload`);
    } else if (mode === "Edit") {
      data.imageUrl = cake?.imageUrl!;
    }

    let response: any;

    if (mode === "Edit")
      response = await agent.CakeCatalog.update(parseInt(id!), data);
    else if (mode === "Create") response = await agent.CakeCatalog.create(data);

    console.log(response!);

    if (response && response.id) {
      toast.success(`Success: Cake ${mode}`);
      navigate("/admin");
    } else toast.error("Server Error");
  };

  const uploadImage = async () => {
    // upload image to my cloundinary hosting account
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "unsigned-dev");
    data.append("cloud_name", "developerjay");
    data.append("folder", "cakes");

    const upload = await axios.post(
      "https://api.cloudinary.com/v1_1/developerjay/image/upload",
      data
    );
    return upload;
  };

  if (loading || (mode === "Edit" && !cake)) return <LoadingSpinner />;

  return (
    <>
      <Typography variant="h4">{mode} Cake</Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ maxWidth: 500, padding: 10 }}
      >
        <Grid container>
          <Grid item>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="name"
                  variant="outlined"
                  error={!!errors.name}
                  helperText={errors.name ? errors.name?.message : ""}
                  fullWidth={true}
                  sx={{ mt: 3 }}
                  value={field.value || cake?.name || ""}
                />
              )}
            />

            <Controller
              name="comment"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="comment"
                  variant="outlined"
                  error={!!errors.comment}
                  helperText={errors.comment ? errors.comment?.message : ""}
                  fullWidth={true}
                  multiline={true}
                  sx={{ mt: 3 }}
                  value={field.value || cake?.comment || ""}
                />
              )}
            />

            <Controller
              name="yumFactor"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="yumFactor"
                  variant="outlined"
                  type="number"
                  error={!!errors.yumFactor}
                  helperText={errors.yumFactor ? errors.yumFactor?.message : ""}
                  fullWidth={true}
                  sx={{ mt: 3 }}
                  value={field.value || cake?.yumFactor || ""}
                />
              )}
            />

            {cake?.imageUrl && !image && (
              <img
                src={`${cake.imageUrl}`}
                alt={cake.name}
                style={{ width: "200px", marginTop: "20px" }}
              />
            )}

            <Controller
              name="imageUrl"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="file"
                  variant="outlined"
                  sx={{ mt: 3 }}
                  value={field.value}
                  onChange={fileChangeHandler}
                />
              )}
            />
          </Grid>
          <Grid item>
            <ButtonGroup sx={{ mt: 3 }}>
              <Button
                variant="outlined"
                startIcon={<ArrowBack />}
                component={Link}
                to={`/admin`}
                sx={{ mr: 3 }}
              >
                Cancel
              </Button>
              <Button variant="contained" color="success" type="submit">
                {mode}
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
