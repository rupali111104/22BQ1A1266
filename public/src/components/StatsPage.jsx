// src/components/StatsPage.jsx
import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, Divider } from '@mui/material';

const StatsPage = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('clickLogs') || '[]');
    setLogs(stored);
  }, []);

  return (
    <Box p={4}>
      <Typography variant="h5" gutterBottom>
        URL Click Statistics
      </Typography>
      {logs.length === 0 ? (
        <Typography>No clicks recorded yet.</Typography>
      ) : (
        <List>
          {logs.map((log, index) => (
            <Box key={index}>
              <ListItem>
                <div>
                  <Typography><strong>Short Code:</strong> {log.shortCode}</Typography>
                  <Typography><strong>Time:</strong> {log.timestamp}</Typography>
                  <Typography><strong>Source:</strong> {log.source}</Typography>
                  <Typography><strong>Location:</strong> {log.location}</Typography>
                </div>
              </ListItem>
              <Divider />
            </Box>
          ))}
        </List>
      )}
    </Box>
  );
};

export default StatsPage;
