import React, { useState } from "react";

/*
    The context is imported and used by individual components
    that need data
*/
export const MoodContext = React.createContext();

/*
 This component establishes what data can be used.
 */
export const MoodProvider = props => {
  const [moods, setMoods] = useState([]);
  const [tags, setTags] = useState([])

  const getMoods = () => {
    return fetch("http://localhost:8088/moods")
      .then(res => res.json())
      .then(setMoods);
  };
  const getTags = () => {
    return fetch("http://localhost:8088/tags")
    .then(res => res.json())
    .then(setTags)
  }
  return (
    <MoodContext.Provider
      value={{
        moods,
        getMoods, tags, getTags
      }}
    >
      {props.children}
    </MoodContext.Provider>
  );
};
