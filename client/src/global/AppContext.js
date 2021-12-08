import React, { useContext, useEffect, useReducer } from "react";
import { reducer } from "./AppReducer";
import axios from "axios";

const AppContext = React.createContext();

const AppContextProvider = ({ children }) => {
  const [memories, dispatch] = useReducer(reducer, []);

  /* 
  On initial Render
      >Get all memories from DB
      >Pass memories array to Memories.js
  */
  const getMemoriesDB = async () => {
    const allMemories = await axios.get("/api/v1/memories");
    dispatch({
      type: "GET_MEMORIES_DB",
      payload: allMemories.data.data,
    });
  };
  useEffect(() => {
    getMemoriesDB();
  }, []);
  /* Initial Render Complete */

  const addMemory = async (data) => {
    //Post needs config
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    // add to db
    const res = await axios.post("/api/v1/memories", data, config);
    //spread state and add memory to ui
    dispatch({
      type: "ADD_MEMORY",
      payload: res.data.data,
    });
  };

  const likeMemory = async (memory) => {
    //Increment the like
    let newLikes = memory.likeCount + 1;
    //Pass it to axios.patch in req.body
    const res = await axios.patch(`/api/v1/memories/${memory._id}`, {
      newLikes,
    });
    dispatch({
      type: "LIKE_MEMORY",
      payload: res.data.data,
    });
  };

  const deleteMemory = async (memory) => {
    //Remove memory from DB and filter state
    await axios.delete(`/api/v1/memories/${memory._id}`);
    dispatch({
      type: "DELETE_MEMORY",
      payload: memory,
    });
  };

  return (
    <AppContext.Provider
      value={{ memories, likeMemory, addMemory, deleteMemory }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

export default AppContextProvider;
