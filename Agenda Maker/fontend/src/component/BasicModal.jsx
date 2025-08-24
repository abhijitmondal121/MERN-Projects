import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ open, handleClose }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    allTopic: [],
  });
  const [currentTopic, setCurrentTopic] = useState("");
  const [message, setMessage] = useState("");

  // Add topic to array
  const handleAddTopic = () => {
    if (currentTopic.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        allTopic: [...prev.allTopic, currentTopic],
      }));
      setCurrentTopic("");
    }
  };

  // Delete topic from array
  const handleDeleteTopic = (topicToDelete) => {
    setFormData((prev) => ({
      ...prev,
      allTopic: prev.allTopic.filter((topic) => topic !== topicToDelete),
    }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/api/items", formData, {
        headers: { "Content-Type": "application/json" },
      });
      setMessage("Item added successfully!");
      console.log("Submitted data:", res.data);

      // Reset form
      setFormData({ title: "", description: "", allTopic: [] });
      setCurrentTopic("");
      handleClose();
    } catch (err) {
      setMessage("Error adding item!");
      console.error(err);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style} component="form" onSubmit={handleSubmit}>
        <Typography variant="h6" mb={2} sx={{ fontWeight: "bold" }}>
          Agenda Details
        </Typography>

        {/* Title */}
        <TextField
          fullWidth
          label="Title"
          placeholder="Enter the title"
          variant="outlined"
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
          sx={{ mb: 2 }}
          required
        />

        {/* Description */}
        <TextField
          fullWidth
          label="Description"
          placeholder="Enter the description"
          variant="outlined"
          multiline
          rows={3}
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          sx={{ mb: 3 }}
          required
        />

        {/* Topics */}
        <Typography variant="subtitle1" mb={1} sx={{ fontWeight: "bold" }}>
          Agenda Topics
        </Typography>
        <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
          <TextField
            fullWidth
            placeholder="Enter topic"
            value={currentTopic}
            onChange={(e) => setCurrentTopic(e.target.value)}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "green",
              whiteSpace: "nowrap",
              "&:hover": { backgroundColor: "darkgreen" },
            }}
            onClick={handleAddTopic}
            type="button"
          >
            + Add Topic
          </Button>
        </Box>

        {/* Display chips */}
        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", mb: 3 }}>
          {formData.allTopic.map((topic, index) => (
            <Chip
              key={index}
              label={topic}
              onDelete={() => handleDeleteTopic(topic)}
              sx={{ mb: 1 }}
            />
          ))}
        </Stack>

        {/* Action buttons */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#1976d2",
              "&:hover": { backgroundColor: "#125aa0" },
            }}
          >
            Submit Agenda
          </Button>
          <Button variant="outlined">View All Agendas</Button>
        </Box>
      </Box>
    </Modal>
  );
}
