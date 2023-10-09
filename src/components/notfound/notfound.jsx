import React from 'react';
import { Button, Container, Typography, Box, CssBaseline } from '@mui/material';
import { Link } from 'react-router-dom';
import { ErrorOutlineTwoTone } from '@mui/icons-material';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 1 }}
        >
          <ErrorOutlineTwoTone color="error" sx={{ fontSize: 100 }} />
        </motion.div>
        <Typography variant="h3" gutterBottom> Oops! Page not found </Typography>
        <Typography variant="body1" gutterBottom> The page you are looking for cannot be found. </Typography>
        <Link to="/">
          <Button variant="contained" color="primary">
            Go back home
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
