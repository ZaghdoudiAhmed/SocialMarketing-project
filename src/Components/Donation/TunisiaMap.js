import React, { useEffect, useState } from "react";
import anychart from "anychart";
import axios from "axios";
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useNavigate } from "react-router-dom";
import Calendar from "../Donation/Calendar";

function TunisiaMap(props) {
	const [bool,setbool]= useState('false');
	const [open, setOpen] = useState(false);

	  
	const handleClickOpen = () => {
		setOpen(true);
	  };
	
	  const handleClose = () => {
		setOpen(false);
	  };
  let navigate = useNavigate();
  let nbrGafsa=0;
  let nbrNabeul = 0;
  let nbrSfax = 0;
  let nbrMednine = 0;
  let nbrTunis = 0;
  let nbrAriana = 0;
  let nbrMahdia = 0;
  let nbrSousse = 0;
  let nbrKasserine = 0;
  let nbrTozeur = 0;
  let nbrKairawen = 0;
  let nbrZaghwen = 0;
  let nbrSidiBouzid = 0;
  let nbrGendouba = 0;
  let nbrMonastir = 0;
  let nbrGabes = 0;
  let nbrSiliana = 0;
  let nbrKef = 0;
  let nbrManouba = 0;
  let nbrBenArous = 0;
  let nbrBeja = 0;
  let nbrBizerte = 0;
  let nbrTatouin = 0;
  let nbrKbeli = 0;
  const charge =async ()=>{
	var map = anychart.map();

var dataSet = anychart.data.set([
{ id: "TN.4431", value: 0 },
{ id: "TN.TO", value: 1, donation: nbrTozeur },
{ id: "TN.MN", value: 2, donation: nbrManouba },
{ id: "TN.BJ", value: 3, donation: nbrBeja },
{ id: "TN.BA", value: 4, donation: nbrBenArous },
{ id: "TN.BZ", value: 5, donation: nbrBizerte },
{ id: "TN.JE", value: 6, donation: nbrGendouba },
{ id: "TN.NB", value: 7, donation: nbrNabeul },
{ id: "TN.TU", value: 8, donation: nbrTunis },
{ id: "TN.KF", value: 9, donation: nbrKef },
{ id: "TN.KS", value: 10, donation: nbrKasserine },
{ id: "TN.GB", value: 11, donation: nbrGabes },
{ id: "TN.GF", value: 12, donation: nbrGafsa },
{ id: "TN.SZ", value: 13, donation: nbrSidiBouzid },
{ id: "TN.SF", value: 14, donation: nbrSfax },
{ id: "TN.SL", value: 15, donation: nbrSiliana },
{ id: "TN.MH", value: 16, donation: nbrMahdia },
{ id: "TN.MS", value: 17, donation: nbrMonastir },
{ id: "TN.KR", value: 18, donation: nbrKairawen },
{ id: "TN.SS", value: 19, donation: nbrSousse },
{ id: "TN.ZA", value: 20, donation: nbrZaghwen },
{ id: "TN.ME", value: 21, donation: nbrMednine },
{ id: "TN.KB", value: 22, donation: nbrKbeli },
{ id: "TN.TA", value: 23, donation: nbrTatouin },
]);

var series = map.choropleth(dataSet);
// enable the tooltips and format them at once
series.tooltip().format(function (e) {
return "donations : " + e.getData("donation");
});
series.geoIdField("id");
series.colorScale(anychart.scales.linearColor("#deebf7", "#3182bd"));
series.hovered().fill("#addd8e");
map.geoData(anychart.maps["tunisia"]);
map.credits().enabled(false);

map.container("container2");
map.draw();
//affichage et redirectionnement
var func_listen = async function (e) {
const pi = e.pointIndex;
let response;
switch (pi) {
  case 1:
	response = await axios.get(
	  "http://localhost:2600/donation/0listdonationbylocation/Tozeur"
	);
	navigate("/home", { state: response.data });
	break;
  case 2:
	console.log("Manouba");
	break;
  case 3:
	console.log("Beja");
	break;
  case 4:
	console.log("BenArous");
	break;
  case 5:
	console.log("Bizerte");
	break;
  case 6:
	console.log("Gendouba");
	break;
  case 7:
	response = await axios.get(
	  "http://localhost:2600/donation/listdonationbylocation/Nabeul"
	);
	navigate("/home", { state: response.data });
	break;
  case 8:
	console.log("Tunis");
	break;
  case 9:
	console.log("Kef");
	break;
  case 10:
	console.log("Kasserine");
	break;
  case 11:
	console.log("Gabes");
	break;
  case 12:
	response = await axios.get(
	  "http://localhost:2600/donation/listdonationbylocation/Gafsa"
	);
	navigate("/home", { state: response.data });
	break;
  case 13:
	console.log("SidiBouzid");
	break;
  case 14:
	response = await axios.get(
	  "http://localhost:2600/donation/listdonationbylocation/Sfax"
	);
	console.log(response.data);
	navigate("/home", { state: response.data });
	break;
  case 15:
	console.log("Siliana");
	break;
  case 16:
	console.log("Mahdia");
	break;
  case 17:
	console.log("Monastir");
	break;
  case 18:
	console.log("Kairawen");
	break;
  case 19:
	console.log("Sousse");
	break;
  case 20:
	console.log("Zaghwen");
	break;
  case 21:
	console.log("Mednine");
	break;
  case 22:
	console.log("Kbeli");
	break;
  case 23:
	console.log("Tatouin");
	break;
}
};
//affichage seulemennt
var func_listen1 = async function (e) {
const pi = e.pointIndex;
let response;
switch (pi) {
  case 1:
	console.log("Tozeur");
	break;
  case 2:
	console.log("Manouba");
	break;
  case 3:
	console.log("Beja");
	break;
  case 4:
	console.log("BenArous");
	break;
  case 5:
	console.log("Bizerte");
	break;
  case 6:
	console.log("Gendouba");
	break;
  case 7:
	response = await axios.get(
	  "http://localhost:2600/donation/listdonationbylocation/Nabeul"
	);
	break;
  case 8:
	console.log("Tunis");
	break;
  case 9:
	console.log("Kef");
	break;
  case 10:
	console.log("Kasserine");
	break;
  case 11:
	console.log("Gabes");
	break;
  case 12:
	response = await axios.get(
	  "http://localhost:2600/donation/listdonationbylocation/Gafsa"
	);
	break;
  case 13:
	console.log("SidiBouzid");
	break;
  case 14:
	console.log("Sfax");
	break;
  case 15:
	console.log("Siliana");
	break;
  case 16:
	console.log("Mahdia");
	break;
  case 17:
	console.log("Monastir");
	break;
  case 18:
	console.log("Kairawen");
	break;
  case 19:
	console.log("Sousse");
	break;
  case 20:
	console.log("Zaghwen");
	break;
  case 21:
	console.log("Mednine");
	break;
  case 22:
	console.log("Kbeli");
	break;
  case 23:
	console.log("Tatouin");
	break;
}
};
//add a listener
map.listen("click", func_listen);
map.listen("mouseOver", func_listen1);
}
  useEffect( () => {
   	anychart.onDocumentReady(function () {
		props.name.map((region) => {
		  console.log(region);
		  switch (region._id) {
			case "Gafsa":
				nbrGafsa = region.nbr_donation;
			  break;
			case "Nabeul":
			  nbrNabeul = region.nbr_donation;
			  break;
			case "Sfax":
			  nbrSfax = region.nbr_donation;
			  break;
			case "Mednine":
			  nbrMednine = region.nbr_donation;
			  break;
			case "Tunis":
			  nbrTunis = region.nbr_donation;
			  break;
			case "Mahdia":
			  nbrMahdia = region.nbr_donation;
			  break;
			case "Sousse":
			  nbrSousse = region.nbr_donation;
			  break;
			case "Kasserine":
			  nbrKasserine = region.nbr_donation;
			  break;
			case "Tozeur":
			  nbrTozeur = region.nbr_donation;
			  break;
			case "Kairawen":
			  nbrKairawen = region.nbr_donation;
			  break;
			case "Zaghwen":
			  nbrZaghwen = region.nbr_donation;
			  break;
			case "SidiBouzid":
			  nbrSidiBouzid = region.nbr_donation;
			  break;
			case "Gendouba":
			  nbrGendouba = region.nbr_donation;
			  break;
			case "Monastir":
			  nbrMonastir = region.nbr_donation;
			  break;
			case "Gabes":
			  nbrGabes = region.nbr_donation;
			  break;
			case "Siliana":
			  nbrSiliana = region.nbr_donation;
			  break;
			case "Kef":
			  nbrKef = region.nbr_donation;
			  break;
			case "Manouba":
			  nbrManouba = region.nbr_donation;
			  break;
			case "BenArous":
			  nbrBenArous = region.nbr_donation;
			  break;
			case "Beja":
			  nbrBeja = region.nbr_donation;
			  break;
			case "Bizerte":
			  nbrBizerte = region.nbr_donation;
			  break;
			case "Kbeli":
			  nbrKbeli = region.nbr_donation;
			  break;
			case "Tatouin":
			  nbrTatouin = region.nbr_donation;
			  break;
		  }
		});
		charge();
	  });
	
    
  }, []);
  return (	
	    <div>
	
	  {bool=="false" &&(

      <div className="f">
        <div id="container2" />	
      </div>
  
	  )

	  }
	    <Card className="posu"> <img className="calendar"src="images/calendar2.png" onClick={handleClickOpen} ></img></Card>  
		  <Dialog
	  open={open}
	  keepMounted
	  onClose={handleClose}
	  aria-describedby="alert-dialog-slide-description"
	>
	  <DialogTitle style={{color:"grey"}} >{"Here is your Calendar compaigns"}</DialogTitle>
	  <DialogContent>
		<DialogContentText id="alert-dialog-slide-description">
		<Calendar></Calendar>
		</DialogContentText>
	  </DialogContent>
	  <DialogActions>
		<Button onClick={handleClose}>Ok</Button>
	  </DialogActions>
	</Dialog>

  </div>
  );
}
export default TunisiaMap;
