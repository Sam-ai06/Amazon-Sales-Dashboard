import { useState } from 'react';
import { Box } from '@mui/material';
import NavbarUI from './components/navbarUI';
import './App.css';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  
  const sampleCategories = [
    'electronicos',
    'casa',
    'cocina',
    'computadoras',
  ];

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#0f172a',
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
        overflowX: 'hidden'
      }}
    >
      {/* adaptacion de la pantalla */}
      <NavbarUI
        categories={sampleCategories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
    </Box>
  );
}