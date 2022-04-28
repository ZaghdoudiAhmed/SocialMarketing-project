import React, { useEffect, useState } from "react";
import Mentions from "rc-mentions";

import axios from "axios";

function Test(props) {
  const [users, setUsers] = useState([]);
  const { Option } = Mentions;

  const getNotFollowers = async () => {
    try {
      await axios
        .get(
          "http://localhost:2600/api/users/all/" + "625c799563dc67df0d7b6fc1"
        )
        .then((res) => {
          setUsers(res.data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getNotFollowers();
  }, []);

  let Options = users.map((u) => (
    <Option key={u._id} value={u.name} className="dynamic-option">
      <img src={"/uploads/users/" + u.profilepic} alt={u.profilepic} />
      <span>{u.name}</span>
    </Option>
  ));

  return (
    <div style={{ paddingTop: 200 }}>
      <Mentions prefix="@" autoSize transitionName="motion-zoom">
        {Options}
      </Mentions>
    </div>
  );
}

export default Test;
