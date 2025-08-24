import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Box,
  IconButton,
  TextField,
  Stack,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";

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

const AgendaList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // For editing

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    allTopic: [],
  });
  const [currentTopic, setCurrentTopic] = useState("");

  // Fetch items from backend
  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/items/");
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  if (loading) return <p>Loading...</p>;

  // Open modal with selected item data
  const handleOpen = (item) => {
    setSelectedItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      allTopic: item.allTopic || [],
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null);
    setFormData({ title: "", description: "", allTopic: [] });
    setCurrentTopic("");
  };

  // Add topic to formData
  const handleAddTopic = () => {
    if (currentTopic.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        allTopic: [...prev.allTopic, currentTopic],
      }));
      setCurrentTopic("");
    }
  };

  // Delete topic from formData
  const handleDeleteTopic = (topicToDelete) => {
    setFormData((prev) => ({
      ...prev,
      allTopic: prev.allTopic.filter((topic) => topic !== topicToDelete),
    }));
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!selectedItem) return;

      const res = await axios.put(
        `http://localhost:4000/api/items/${selectedItem._id}`,
        formData
      );

      // Update the list locally
      setItems((prev) =>
        prev.map((item) =>
          item._id === selectedItem._id ? res.data : item
        )
      );

      handleClose();
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  // Delete item
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this agenda?")) {
      try {
        await axios.delete(`http://localhost:4000/api/items/${id}`);
        setItems((prev) => prev.filter((item) => item._id !== id));
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  return (
    <>
      {items.length === 0 ? (
        <p>No items found</p>
      ) : (
        <Box sx={{ flexGrow: 1, p: 4, backgroundColor: "#f0f2f5" }}>
          <Grid container spacing={4} justifyContent="center">
            {items.map((goal) => (
              <Grid item xs={12} sm={6} md={4} key={goal._id}>
                <Card
                  sx={{
                    borderRadius: "20px",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
                    width: "470px",
                    margin: "0 auto",
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
                    },
                  }}
                >
                  {/* Delete button */}
                  <IconButton
                    onClick={() => handleDelete(goal._id)}
                    sx={{ position: "absolute", top: 3, right: 3, zIndex: 1 }}
                  >
                    <CloseIcon />
                  </IconButton>

                  <CardContent sx={{ p: 3 }}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ fontWeight: 600, color: "#1976d2" }}
                    >
                      {goal.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2, lineHeight: 1.6 }}
                    >
                      {goal.description}
                    </Typography>
                    <Box
                      sx={{ mt: 1, display: "flex", gap: 1, flexWrap: "wrap" }}
                    >
                      {goal.allTopic.map((topic, i) => (
                        <Chip
                          key={i}
                          label={topic}
                          variant="outlined"
                          color="primary"
                          size="small"
                          sx={{
                            fontWeight: 500,
                            borderRadius: "8px",
                            textTransform: "capitalize",
                          }}
                        />
                      ))}
                    </Box>
                  </CardContent>

                  <Box sx={{ p: 3, pt: 0 }}>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        backgroundColor: "#1976d2",
                        borderRadius: "12px",
                        paddingY: 1.5,
                        fontWeight: 600,
                        fontSize: "0.95rem",
                        "&:hover": { backgroundColor: "#125aa0" },
                      }}
                      onClick={() => handleOpen(goal)}
                    >
                      Edit Agenda
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Edit Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style} component="form" onSubmit={handleSubmit}>
          <Typography variant="h6" mb={2} sx={{ fontWeight: "bold" }}>
            Edit Agenda
          </Typography>

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

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#1976d2",
                "&:hover": { backgroundColor: "#125aa0" },
              }}
            >
              Update Agenda
            </Button>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AgendaList;
