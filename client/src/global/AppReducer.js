export default (state, action) => {
  switch (action.type) {
    /* Initial Render */
    case "GET_MEMORIES_DB":
      return action.payload;
    /*****************/
    case "ADD_MEMORY":
      console.log(`state`, state);
      return [...state, action.payload];
    case "LIKE_MEMORY":
      const newMemories = state.map((memory) => {
        if (memory._id === action.payload._id) {
          return action.payload;
        }
        return memory;
      });
      return newMemories;
    case "DELETE_MEMORY":
      return state.filter((memory) => memory._id !== action.payload._id);
    default:
      return state;
  }
};
