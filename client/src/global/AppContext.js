import React, { useContext, useEffect, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

const AppContext = React.createContext();

const AppContextProvider = ({ children }) => {
  const [memories, dispatch] = useReducer(AppReducer, []);

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
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post("/api/v1/memories", data, config);
    dispatch({
      type: "ADD_MEMORY",
      payload: res.data.data,
    });
    console.log(`memories`, memories);
  };

  /*App-Server communication*/
  const likeMemory = async (memory) => {
    // memory.likeCount++;
    await axios.patch(`/api/v1/memories/${memory._id}`);
    // dispatch({
    //   type: "LIKE_MEMORY",
    //   payload: memoryLiked.data.data,
    // });
    getMemoriesDB();
  };

  const deleteMemory = async (memory) => {
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
