import React, { useCallback,useMemo,useState,useRef,useEffect,} from "react";
import { MapContainer, TileLayer, Marker, Popup,useMapEvents,} from "react-leaflet";
import addWeeks from 'date-fns/addWeeks';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateRangePicker from '@mui/lab/DateRangePicker';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import L from "leaflet";
import { useForm, useFormState } from "react-hook-form";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
function getWeeksAfter(date, amount) {
  return date ? addWeeks(date, amount) : undefined;
}
const Maptun = () => {
  const [value, setValue] = React.useState([null, null]);
  const mapRef = useRef(); 
   const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm();
  const { isValid } = useFormState({
    control,
  });
  const [Open, setOpen] = React.useState(true);
  const [istrue, setistrue] = useState(true);
  const [isupload, setisupload] = useState(true);
  const [latLng, setLatLng] = useState([32.77, -99.8]);
  const [imgFile, imgFileSet] = useState([]);

  const [positions, setpositions] = useState([]);
  const [position, setposition] = useState([0, 0]);
  // const [test1,settest1]=useState(true);
  const [open, setopen] = useState(0);
  const [close, setclose] = useState(0);
  const [compaign, setcompaign] = useState({
    title: "",
    description: "",
    nbr_total_dons: 0,
    chef: "",
    type_don: "",
  });
  const { title, description } = compaign;
  const onImageChange = (i) => {
    const reader = new FileReader();

    if (i.target.files && i.target.files.length) {
      const [file] = i.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        imgFileSet(reader.result);
      };
      ////////  console.log(imgFile);
      setisupload(true);
    }
  };
  const onSubmit = (e) => {
    if (imgFile.length == 0) {
      setisupload(false);
    } else {
      var result = [];
    ///  result.push(e);
      result.push(e,{ image: imgFile },{loc:position},{time:value});
    ///  result.push({loc:position})
      console.log(result);
      axios.post("http://localhost:2600/compaign/add",result).catch((err) => {console.log(err);});
      setistrue(false);
      reset();
      setValue([null,null]);
      imgFileSet([]);
    }
  };
  const location = useRef(0);
  const handleChange = (e) => {
    setcompaign({ ...compaign, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setopen(0);
  };
  const handleClickOpen = () => {
    setclose(0);
    setopen(1);
  };

  const handlepublish = () => {
    setopen(0);
    setclose(1);
    const marker2 = new L.Marker(new L.LatLng(position[0], position[1]), {
      icon: geticon(),
    });
    mapRef.current.addLayer(marker2);
  };
  useEffect(() => {
    mapRef.current = L.map("map", {
      center: latLng,
      zoom: 7,
      layers: [
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "",
        }),
      ],
    });
  }, []);
  const centerRef = useRef(null);
  useEffect(() => {
    let lat;
    let lon;
    let test1 = true;
    let test2 = true;
    mapRef.current.on("dblclick", function (e) {
      let lat = e.latlng.lat;
      let lon = e.latlng.lng;
      const x = [lat, lon];
      setpositions([lat, lon]);
      if (test1 == true) {
        setposition([lat, lon]);
      }

      if (test2 == true) {
        handleClickOpen();
      }

      test1 = false;
      test2 = false;
    });
  }, [position]);

  function geticon() {
    return L.icon({
      iconUrl: require("../../R.png"),
      shadowUrl: require("../../leaf-shadow.png"),
      iconSize: [38, 95], // size of the icon
      shadowSize: [50, 64], // size of the shadow
      iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62], // the same for the shadow
      popupAnchor: [-3, -76],
    });
  }
  return (
    <div>
      <div id="map" style={{ width: 900, height: 580 }} />

      <Dialog open={open == 0 ? false : true}>
        <DialogTitle>Subscribe</DialogTitle>
        <div className="dflex">
<DialogContent>
         
          <DialogContentText>
            Hello it's time to start new Donation work
          </DialogContentText>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <input
                type="text"
                name="title"
                id="input"
                {...register("title", {
                  required: { value: true, message: "Title is required" },
                })}
              />
              <label className="control-label" htmlFor="input">
                Title
              </label>
              <i className="mtrl-select" />
              <i className="colorred">
                {errors?.title && errors.title.message}
              </i>
            </div>

            <div className="form-group">
              <textarea
                rows={4}
                id="textarea"
                defaultValue={""}
                name="description"
                {...register("description", {
                  required: { value: true, message: "Description is required" },
                })}
              />
              <label className="control-label" htmlFor="textarea">
                description
              </label>
              <i className="colorred">
                {errors?.description && errors.description.message}
              </i>
              <i className="mtrl-select" />
            </div>
            <div className="form-group">
              <input
                type="number"
                name="title"
                id="input"
                {...register("nbredons", {
                  required: { value: true, message: "Title is required" },
                })}
              />
              <label className="control-label" htmlFor="input">
                Nombre de dons
              </label>
              <i className="mtrl-select" />
              <i className="colorred">
                {errors?.title && errors.title.message}
              </i>
            </div>
            <div className="form-group">
              <input
                type="text"
                name="chef"
                id="input"
                {...register("chef", {
                  required: { value: true, message: "chef is required" },
                })}
              />
              <label className="control-label" htmlFor="input">
                Chef
              </label>
              <i className="mtrl-select" />
              <i className="colorred">
                {errors?.title && errors.title.message}
              </i>
            </div>

            <div className="form-group">
              <input
                type="text"
                name="type_donation"
                id="input"
                {...register("type", {
                  required: {
                    value: true,
                    message: "Type donation is required",
                  },
                })}
              />
              <label className="control-label" htmlFor="input">
                Type de donation
              </label>
              <i className="mtrl-select" />
              <i className="colorred">
                {errors?.title && errors.title.message}
              </i>
            </div>

            <div>
              <div className="mb-3">
                <div>
                  <div>
                    <label
                      htmlFor="file-upload"
                      className="custom-file-upload x"
                    >
                      Upload Image{" "}
                      <CloudUploadIcon className="y"> </CloudUploadIcon>
                    </label>
                  </div>
                  <input
                    onChange={onImageChange}
                    id="file-upload"
                    type="file"
                    name="file"
                  />
                  {isupload == false && (
                    <i className="colorred">image is not uploaded</i>
                  )}

                  <div className="col-md-4"></div>
                </div>
              </div>
              {imgFile.length > 0 && (
                <div className="preview">
                  <img
                    id="imgFile"
                    name="imgfile"
                    src={imgFile}
                    style={{
                      width: 250,
                      height: 250,
                      marginTop: 5,
                      borderRadius: 3,
                      borderStyle: "groove",
                    }}
                  />
                </div>
              )}
            </div>   
            <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateRangePicker
      required
        disablePast
        value={value}
        maxDate={getWeeksAfter(value[0], 4)}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField {...startProps} />
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField {...endProps} />
          </React.Fragment>
        )}
      />
    </LocalizationProvider>      
            <div className="submit-btns">            
                      <button  type="submit" className="mtr-btn">
                        <span>Save your compaign</span>
                </button> 
                <button type="reset" className="mtr-btn">
                        <span>Cancel</span>
                      </button>
                    </div>
            {istrue == false && (
              <Collapse in={Open}>
                <Alert
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mb: 2 }}
                >
                  Close me!
                </Alert>
              </Collapse>
            )}
          
          </form>
        </DialogContent>
        <div className="leaf">
</div>
        </div>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handlepublish}>Publish</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Maptun;
