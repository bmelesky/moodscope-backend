// Import our tools
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');

// Create the Express app
const app = express();
app.use(cors());
app.use(express.json()); // <-- ADD THIS: Allows server to read JSON
const port = 3000;

// Supabase Connection Info (Your credentials should still be here)
const supabaseUrl = 'https://yrruztycksvefqtjsgeu.supabase.co/';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlycnV6dHlja3N2ZWZxdGpzZ2V1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5MDQ2OTYsImV4cCI6MjA2OTQ4MDY5Nn0.bHNoYl-7lygXSqoagi2eqcu0ewUBz0RniaEDYiZRDCI';
const supabase = createClient(supabaseUrl, supabaseKey);


// === THIS ROUTE IS FOR GETTING ALL MOODS ===
app.get('/', async (req, res) => {
    const { data, error } = await supabase
        .from('moods')
        .select('*');

    if (error) {
        console.error('Error fetching moods:', error);
        return res.status(500).json({ error: error.message });
    }
    res.json(data);
});


// === THIS NEW ROUTE IS FOR SAVING A MOOD ===
app.post('/moods', async (req, res) => {
    const { mood_score, activities, notes } = req.body; // Get data from the request

    const { data, error } = await supabase
        .from('moods')
        .insert([
            { mood_score, activities, notes }
        ]);

    if (error) {
        console.error('Error saving mood:', error);
        return res.status(500).json({ error: error.message });
    }

    res.json({ success: true, data: data });
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});