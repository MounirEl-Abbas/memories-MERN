import React from "react";
//Utils
import { useAppContext } from "../global/AppContext";
import { timeSince } from "../assets/utils/timeSince";
//Icons
import { AiFillLike } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";

const Memory = ({ memory }) => {
  let uniqueTagKey = 0;
  const { likeMemory, deleteMemory } = useAppContext();
  const { title, creator, message, likeCount, createdAt, tags, file } = memory;

  return (
    <article className="memory">
      <img src={file} alt="This for now" />
      <div className="memory-header">
        <h4>{creator}</h4>
        <p>{timeSince(createdAt)} ago</p>
      </div>
      <div className="memory-info">
        <div className="tags-container">
          {tags.map((tag) => {
            uniqueTagKey++;
            return <span key={uniqueTagKey}>{`#${tag.trim()} `}</span>;
          })}
        </div>
        <h3>{title}</h3>
        <p>{message}</p>
      </div>
      <div className="memory-btn-container">
        <button onClick={() => likeMemory(memory)}>
          <AiFillLike />
          <p>Like</p>
          <p>{likeCount}</p>
        </button>
        <button onClick={() => deleteMemory(memory)}>
          <FaTrashAlt />
          <p>Delete</p>
        </button>
      </div>
    </article>
  );
};

export default Memory;
