import { React, useState, useEffect } from "react";
import Stories, { WithSeeMore } from "react-insta-stories";
import { format } from "timeago.js";
import Swal from "sweetalert2";

import axios from "axios";

function Story({ currentUserId, currentUser }) {
  const [yourstory, setYourStory] = useState([]);
  const [story, setStory] = useState([]);
  const [file, setFile] = useState(null);
  const [friendStory, setFriendStory] = useState([]);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const getYourStories = async () => {
    axios
      .get("http://localhost:2600/stories/activestory/" + currentUserId)
      .then((res) => {
        const result = res.data.map((s) => {
          const time = format(s.Date_creation);
          const container = {};
          container["url"] = "/uploads/stories/" + s.url;
          container["header"] = {
            heading: s.Creator.name,
            subheading: time,
            profileImage: "/uploads/users/" + s?.Creator?.profilepic,
          };

          return container;
        });
        setYourStory(result);
      });
  };

  const handleStory = async (e) => {
    const story = new FormData();

    story.append("url", file);
    story.append("Creator", currentUserId);

    try {
      axios.post("http://localhost:2600/stories", story).then((res) => {
        Toast.fire({
          icon: "success",
          title: "Your story is added succesfuly",
        });
        window.location.reload(true);
        const time = format(res.data.Date_creation);
        const container = {};
        container["url"] = "/uploads/stories/" + res.data.url;
        container["header"] = {
          heading: res.data.Creator.name,
          subheading: time,
          profileImage: "/uploads/users/" + res.data?.Creator?.profilepic,
        };

        return container;
      });
    } catch (err) {
      console.log(err);
    }
  };

  const FriendsStory = async () => {
    axios.get("http://localhost:2600/stories/" + currentUserId).then((res) => {
      // const result = res.data.map((one) => {
      //   const time = format(one.Date_creation);
      //   const container = {};
      //   container["url"] = "/uploads/stories/" + one.url;
      //   container["header"] = {
      //     heading: one.Creator.name,
      //     subheading: time,
      //     profileImage: "/uploads/users/" + one?.Creator?.profilepic,
      //   };
      //   return container;
      // });
      // setFriendStory(result);
      const result = [];
      // console.log(res.data);
      res.data.map((first) => {
        // console.log(first);
        first.map((second) => {
          result.push(second);
        });
      });
      const stories = result.map((s) => {
        const time = format(s.Date_creation);
        const container = {};
        container["url"] = "/uploads/stories/" + s.url;
        container["header"] = {
          heading: s.Creator.name,
          subheading: time,
          profileImage: "/uploads/users/" + s?.Creator?.profilepic,
        };
        return container;
      });
      setFriendStory(stories);
    });
  };

  useEffect(() => {
    getYourStories();
    FriendsStory();
  }, []);

  const customSeeMore = {
    textAlign: "center",
    fontSize: 14,
    bottom: 20,
    position: "relative",
  };
  const image = {
    display: "block",
    maxWidth: "20%",
    borderRadius: 4,
  };

  const stories = [
    {
      content: ({ action, story }) => {
        return (
          <>
            {file === null ? (
              <WithSeeMore story={story} action={action}>
                <div
                  style={{ background: "snow", padding: 40, height: "100%" }}
                >
                  <img
                    src={"/uploads/users/" + currentUser.profilepic}
                    style={image}
                  />
                  <p style={{ marginTop: "20%", marginBottom: "20%" }}>
                    👋🏼 Hello <strong>{currentUser.name} </strong>!
                    <hr />
                  </p>
                </div>
              </WithSeeMore>
            ) : (
              <>
                <img src={URL.createObjectURL(file)} />
              </>
            )}
          </>
        );
      },
      seeMoreCollapsed: ({ toggleMore, action }) => (
        <p style={customSeeMore} onClick={() => toggleMore(true)}>
          Share Story +
        </p>
      ),
      seeMore: ({ close }) => (
        <div
          style={{
            maxWidth: "100%",
            height: "100%",
            padding: 40,
            background: "white",
          }}
        >
          <p>choose your file .</p>
          <input
            type="file"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
        </div>
      ),
      // duration: 5000,
    },
  ];

  return (
    <>
      <div className="d-flex justify-content-between">
        {stories.length > 0 && stories !== undefined ? (
          <Stories
            loop
            stories={stories}
            keyboardNavigation={true}
            width={200}
            height={300}
          />
        ) : null}
        {yourstory.length > 0 && yourstory !== undefined ? (
          <Stories
            loop
            isPaused={true}
            stories={yourstory}
            keyboardNavigation={true}
            width={200}
            height={300}
          />
        ) : null}
        {friendStory.length > 0 && story !== undefined ? (
          <Stories
            loop
            stories={friendStory}
            keyboardNavigation={true}
            width={200}
            height={300}
          />
        ) : null}

        <div>
          {file && (
            <button className="btn btn-primary" onClick={handleStory}>
              share
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Story;
