import React, { useEffect ,useState} from "react";
import axios from "axios";
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import PhoneIcon from '@mui/icons-material/Phone';
import ContactsIcon from '@mui/icons-material/Contacts';
const Member = (props) => {

  useEffect(() => {

    console.log(props.state)
  },[]);
  return (
    <div className="toi" style={{ display: "flex"}}>
        <Stack direction="row" spacing={1}>
      <Chip
        avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
        label={props.state.name}
        variant="outlined"
      />
    </Stack>
<div className="bo"><PhoneIcon className="ico to " ></PhoneIcon><p className="ico" >{props.state.phone}</p> </div>
<div className="bo "><ContactsIcon className="ico to " ></ContactsIcon><p className="ico" >{props.state.address}</p></div>

</div>
  );
};

export default Member;
