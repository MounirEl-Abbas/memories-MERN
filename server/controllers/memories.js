const Memory = require("../models/Memory");

// exports.allowCrossDomain = (req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   next();
// };

/* Get All Memories */
exports.getMemories = async (req, res) => {
  try {
    const memories = await Memory.find();

    return res.status(200).json({
      success: true,
      count: memories.length,
      data: memories,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

/* Add a Memory */
exports.addMemory = async (req, res) => {
  console.log(`req.body`, req.body);
  try {
    const memory = await Memory.create(req.body);

    return res.status(201).json({
      success: true,
      data: memory,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const error_message = Object.values(error.errors).map(
        (val) => val.message
      );
      return res.status(400).json({
        success: false,
        error: error_message,
      });
    }
    return res.status(500).json({ success: false, error: error.message });
  }
};

/* Update Memory (Increments Likes by 1) */
exports.updateMemory = async (req, res) => {
  try {
    const { newLikes } = req.body;

    const memory = await Memory.findOneAndUpdate(
      { _id: req.params.id },
      { likeCount: newLikes },
      { new: true }
    );
    if (!memory) {
      return res
        .status(404)
        .json({ success: false, error: `No memory with id: ${req.params.id}` });
    }

    return res.status(200).json({ success: true, data: memory });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};

//Delete a memory
exports.deleteMemory = async (req, res) => {
  try {
    const memory = await Memory.findByIdAndDelete(req.params.id);

    if (!memory) {
      return res
        .status(404)
        .json({ success: false, error: `No memory with id: ${req.params.id}` });
    }
    return res.status(200).json({ success: true, deleted_memory: memory });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};
