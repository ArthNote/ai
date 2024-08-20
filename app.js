const express = require("express");
const app = express();
const { spawn } = require("child_process");
const api_key = "YOUR_API_KEY";

app.use(express.json());

app.post("/api/chatgpt", (req, res) => {
    const userMessage = req.body.message;

    const pythonProcess = spawn("python", ["chat.py", userMessage]);

    pythonProcess.stdout.on("data", (data) => {
        const messageFromChatGPT = data.toString().trim();
        res.json({ message: messageFromChatGPT });
    });

    pythonProcess.stderr.on("data", (data) => {
        console.error("Error from Python script:", data.toString());
        res.status(500).json({ error: "Something went wrong" });
    });
});

const PORT = 5500; // Set the port number you want to use
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
