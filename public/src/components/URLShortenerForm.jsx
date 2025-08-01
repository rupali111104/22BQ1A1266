import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Stack } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { logEvent } from '../../../loggingmiddleware/logger'; 
import { TOKEN } from '../config';

const URLShortenerForm = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const navigate = useNavigate();

  const handleShorten = async () => {
    try {
      // Dummy API (shrtco.de is a free public API)
      const res = await axios.post('https://api.shrtco.de/v2/shorten?url=' + encodeURIComponent(longUrl));

      // Using sample response structure from shrtco.de
      const shortLink = res.data.result.full_short_link;
      setShortUrl(shortLink);

      // Log success event
      await logEvent('frontend', 'info', 'component', 'URL shortened successfully', TOKEN);
    } catch (err) {
      console.error('Shorten failed:', err.message);

      // Log error event
      await logEvent('frontend', 'error', 'component', 'Shorten failed: ' + err.message, TOKEN);
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h5" gutterBottom>Simple URL Shortener</Typography>

      <TextField
        label="Enter Long URL"
        fullWidth
        margin="normal"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
      />

      <Stack direction="row" spacing={2} mt={2}>
        <Button variant="contained" color="primary" onClick={handleShorten}>
          Shorten
        </Button>
        <Button variant="outlined" color="secondary" onClick={() => navigate('/stats')}>
          View Stats
        </Button>
      </Stack>

      {shortUrl && (
        <Typography mt={3}>
          Short URL:{' '}
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </Typography>
      )}
    </Box>
  );
};

export default URLShortenerForm;
