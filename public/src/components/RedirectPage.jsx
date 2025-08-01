import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { logEvent } from '../../../loggingmiddleware/logger';
import { TOKEN } from '../config';

const RedirectPage = () => {
  const { code } = useParams();

  useEffect(() => {
    const handleRedirect = async () => {
      try {
        // Dummy redirect URL resolution (replace with your actual API)
        const res = await axios.get(`https://your-api.com/resolve/${code}`);
        const longUrl = res.data.longUrl || 'https://example.com'; // fallback

        // Get location info
        const locationRes = await axios.get('https://ipapi.co/json/');
        const location = `${locationRes.data.city}, ${locationRes.data.region}, ${locationRes.data.country_name}`;

        // Create click log entry
        const clickData = {
          shortCode: code,
          timestamp: new Date().toISOString(),
          source: document.referrer || 'Direct',
          location: location
        };

        // Save to localStorage
        const existingLogs = JSON.parse(localStorage.getItem('clickLogs') || '[]');
        localStorage.setItem('clickLogs', JSON.stringify([...existingLogs, clickData]));

        // Log the event to evaluation server
        await logEvent('frontend', 'info', 'page', `Redirected to ${longUrl}`, TOKEN);

        // Redirect to original URL
        window.location.href = longUrl;
      } catch (err) {
        console.error('Redirection failed:', err.message);
        await logEvent('frontend', 'error', 'page', 'Redirection failed', TOKEN);
      }
    };

    handleRedirect();
  }, [code]);

  return <p>Redirecting...</p>;
};

export default RedirectPage;
