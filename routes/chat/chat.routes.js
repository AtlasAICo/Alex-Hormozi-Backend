const express = require("express");
const authenticateUser = require("../../middleware/auth");
const Chat = require("./../../model/Chat");
const User = require("./../../model/User");

const router = express.Router();

// Initialize a new chat
router.post("/", authenticateUser, async (req, res) => {
  try {
    const { chatId } = req.body;
    const participants = [req.user._id]; // The logged-in user will be a participant
    const newChat = new Chat({ chatId, participants });
    await newChat.save();
    res.status(201).json(newChat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a message to a chat
router.post("/:chatId/messages", authenticateUser, async (req, res) => {
  try {
    const { chatId } = req.params;
    const { content } = req.body;
    const chat = await Chat.findOne({ chatId });
    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }
    if (!chat.participants.includes(req.user._id)) {
      return res
        .status(403)
        .json({ error: "Unauthorized to send message to this chat" });
    }
    chat.messages.push({ sender: req.user._id, content });
    await chat.save();
    res.status(201).json(chat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all messages of a chat
router.get("/:chatId/messages", authenticateUser, async (req, res) => {
  try {
    const { chatId } = req.params;
    const chat = await Chat.findOne({ chatId }).populate("messages.sender");
    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }
    if (!chat.participants.includes(req.user._id)) {
      return res
        .status(403)
        .json({ error: "Unauthorized to access messages of this chat" });
    }
    res.json(chat.messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a chat
router.delete("/:chatId", authenticateUser, async (req, res) => {
  try {
    const { chatId } = req.params;
    const chat = await Chat.findOne({ chatId });
    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }
    if (!chat.participants.includes(req.user._id)) {
      return res
        .status(403)
        .json({ error: "Unauthorized to delete this chat" });
    }
    const deletedChat = await chat.delete();
    res.json(deletedChat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
