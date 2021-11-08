import React, { useState } from "react";
import { useAppContext } from "../global/AppContext";
import FileBase from "react-file-base64";
import { FaChevronRight } from "react-icons/fa";

const initialState = {
  creator: "",
  title: "",
  message: "",
  tags: "",
  file: null,
};

const Form = () => {
  const { addMemory } = useAppContext();
  const [formData, setFormData] = useState(initialState);
  const [showPanel, setShowPanel] = useState(false);

  const togglePanel = (e) => {
    e.preventDefault();
    setShowPanel(!showPanel);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.tags
      ? (formData.tags = formData.tags.split(","))
      : (formData.tags = ["noTags"]);
    setShowPanel(false);
    addMemory(formData);
    setFormData(initialState);
  };
  return (
    <form>
      <div className="dropdown">
        <button
          className={`${showPanel ? "open-form-btn isOpen" : "open-form-btn"}`}
          onClick={(e) => togglePanel(e)}
        >
          <h3>Add a Memory</h3> <FaChevronRight />
        </button>
        <div className={`${showPanel ? "panel panel-show" : "panel"}`}>
          <input
            type="text"
            value={formData.creator}
            onChange={(e) =>
              setFormData({ ...formData, creator: e.target.value })
            }
            placeholder="Creator"
          />
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="Title"
          />
          <textarea
            type="text"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            placeholder="Description - 150 character limit"
            rows="5"
          />
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            placeholder="Tags (comma separated)"
          />
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setFormData({ ...formData, file: base64 })}
          />
          <div className="btn-container">
            <button type="submit" onClick={(e) => handleSubmit(e)}>
              Submit
            </button>
            <button>Clear</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Form;
