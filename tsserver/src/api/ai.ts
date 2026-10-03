import { Router, Request, Response } from 'express';

const router = Router();

// Test endpoint to interact with local Ollama model
router.post('/generate', async (req: Request, res: Response) => {
  try {
    const { prompt, model } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Call Ollama's local REST API
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: model || 'llama3.1', // Default model fallback
        prompt: prompt,
        stream: false // Set to false for a single complete JSON response (ideal for testing with Postman)
      })
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Return Ollama's generated response back to the client
    res.json({
      model: data.model,
      response: data.response,
      totalDurationMs: Math.round(data.total_duration / 1e6)
    });

  } catch (error: any) {
    console.error('Error connecting to Ollama:', error.message);
    res.status(500).json({ error: 'Failed to communicate with local Ollama server' });
  }
});

export default router;