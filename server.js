import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch"; // Import node-fetch for making HTTP requests

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json());
app.use(cors());

app.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;

        console.log("Received message:", message); // Log the incoming message

        // Hugging Face API endpoint for DialoGPT
        const endpoint = 'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium';

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`, 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ inputs: message })
        });

        const data = await response.json();
        console.log("Response from Hugging Face:", data); // Log the response from Hugging Face

        // Check if the response contains a valid reply
        if (data && data[0] && data[0].generated_text) {
            res.json({ reply: data[0].generated_text });
        } else {
            res.json({ reply: 'Sorry, I didn’t understand.' });
        }

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
});


const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
