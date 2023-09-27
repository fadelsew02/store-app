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
        <Typography variant="h3" gutterBottom>
          Oops! Page non trouvée
        </Typography>
        <Typography variant="body1" gutterBottom>
          La page que vous recherchez semble introuvable.
        </Typography>
        <Link to="/">
          <Button variant="contained" color="primary">
            Retour à l'accueil
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
