import { React, useState, useEffect } from "react";
import Stories from "react-insta-stories";
import axios from "axios";

function Story({ currentUserId }) {
  const [yourstory, setYourStory] = useState([]);
  const [story, setStory] = useState([]);

  const getYourStories = async () => {
    axios.get("http://localhost:2600/stories/" + currentUserId).then((res) => {
      const result = res.data.map((s) => {
        const container = {};
        container["url"] = "/uploads/stories/" + s.url;
        return container;
      });
      setYourStory(result);
    });
  };

  const getStories = async () => {
    axios
      .get("http://localhost:2600/stories/activestory/" + currentUserId)
      .then((res) => {
        const result = res.data.map((s) => {
          const container = {};
          container["url"] = "/uploads/stories/" + s.url;
          return container;
        });
        setStory(result);
      });
  };

  useEffect(() => {
    getStories();
    getYourStories();
  }, []);

  return (
    <div className="row d-flex justify-content-around">
      {yourstory.length > 0 && yourstory !== undefined ? (
        <Stories
          loop
          stories={yourstory}
          keyboardNavigation={true}
          width={200}
          height={300}
        />
      ) : null}
      {story.length > 0 && story !== undefined ? (
        <Stories
          loop
          stories={story}
          keyboardNavigation={true}
          width={200}
          height={300}
        />
      ) : null}
    </div>
  );
}

export default Story;
