import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Popup } from "react-leaflet";
import { Marker } from "react-leaflet";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import L from "leaflet";
import axios from "axios";
import { format } from "date-fns";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Slide from "@material-ui/core/Slide";
import Swal from "sweetalert2";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Mapaffiche = () => {
  const [data, setdata] = useState([]);
  const [open, setOpen] = React.useState(false);
  function geticon() {
    return L.icon({
      iconUrl: require("../../leaf-red.png"),
      shadowUrl: require("../../leaf-shadow.png"),
      iconSize: [38, 95], // size of the icon
      shadowSize: [50, 64], // size of the shadow
      iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62], // the same for the shadow
      popupAnchor: [-3, -76],
    });
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleaggre = () => {
    setOpen(false);
    click();
  };
  const fetchdata = async () => {
    const response = await axios.get(
      "http://localhost:2600/compaign/getcompaign"
    );
    ///  console.log(response.data);
    setdata(response.data);
  };
  const click = () => {
    const btn = document.getElementById("disable");
    btn.disabled = "true";
    btn.style.color = "black";
    btn.style.borderColor = "black";
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your participation has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <div>
      <MapContainer
        className="stylemap"
        center={[33.7931605, 9.5607653]}
        zoom={5}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {data.map((compaign) => (
          <Marker
            position={compaign.lacalisation}
            key={compaign._id}
            icon={geticon()}
          >
            <Popup className="popupstyle" style={{ height: 450, width: 450 }}>
              <div style={{ display: "flex" }}>
                <img src={compaign.image} className="imagestyle"></img>
                <div className="contentstyle">
                  <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                      <Typography variant="h5" component={"div"}>
                        Title :{compaign.title}
                      </Typography>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        component={"div"}
                        gutterBottom
                      >
                        Description :<i>{compaign.description} </i>
                      </Typography>
                      <Typography
                        sx={{ mb: 1.5 }}
                        component={"div"}
                        color="text.secondary"
                      >
                        Date : from{" "}
                        {format(new Date(compaign.date_debut), "yyyy/MM/dd")}
                        To {format(new Date(compaign.date_fin), "yyyy/MM/dd")}
                      </Typography>
                      <Typography component={"div"} variant="body2">
                        Chef : {compaign.chef}
                      </Typography>
                      <Button
                        id="disable"
                        onClick={() => {
                          handleClickOpen();
                        }}
                        size="small"
                        variant="outlined"
                      >
                        Participer
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Do You want to participate to our compaign?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleaggre} color="primary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default Mapaffiche;
