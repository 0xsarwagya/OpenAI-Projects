const express = require("express");
const axios = require("axios");
const path = require('path');

const app = express();

const apiKey = "";
const imageGenerationUrl = "https://api.openai.com/v1/images/generations";

app.use(express.static(path.join(__dirname, "public")));

app.get("/image-generation", (req, res) => {
  res.sendFile(path.join(__dirname, "public/image-generation.html"));
});

app.get("/image", async (req, res) => {
  const prompt = req.query.prompt;

  if (!prompt) {
    return res
      .status(400)
      .send({ error: "Prompt is required in the query parameters" });
  }

  try {
    const response = await axios.post(
      imageGenerationUrl,
      {
        prompt: prompt,
        n: 1,
        size: "1024x1024",
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const image = response.data.data[0].url;
    res.send(image);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to generate image" });
  }
});

app.listen(5500, () => {
  console.log("Server started on http://localhost:5500");
});
