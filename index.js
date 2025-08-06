// Import our tools
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');

// Create the Express app
const app = express();
app.use(cors());
app.use(express.json()); // <-- THIS IS THE MISSING TRANSLATOR LINE
const port = 3000;

// Supabase Connection Info
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
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


// === THIS ROUTE IS FOR SAVING A MOOD ===
app.post('/moods', async (req, res) => {
    const { mood_score, activities, notes } = req.body;

    const { data, error } = await supabase
        .from('moods')
        .insert([
            { mood_score, activities, notes }
        ])
        .select();

    if (error) {
        console.error('Error saving mood:', error);
        return res.status(500).json({ error: error.message });
    }

    res.json({ success: true, savedEntry: data[0] });
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});