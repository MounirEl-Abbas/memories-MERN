import React from "react";
import Memory from "./Memory";
import { useAppContext } from "../global/AppContext";

const Memories = () => {
  const { memories } = useAppContext();

  return (
    <section className="memories-container">
      {memories.length ? (
        memories.map((memory) => {
          return <Memory key={memory._id} memory={memory} />;
        })
      ) : (
        <h1>No Memories Found...</h1>
      )}
    </section>
  );
};

export default Memories;
