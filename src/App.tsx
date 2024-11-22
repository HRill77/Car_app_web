import { AppBar, Container, CssBaseline, Toolbar, Typography } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Carlist from './components/Carlist';
import Login from './components/Login';
import NotFound from './components/NotFound';
import {  Router, Route, Routes } from 'react-router-dom'; // Correct import

const queryClient = new QueryClient();

function App() {
  return (
    <Container maxWidth="xl">
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5">Car Shop</Typography>
        </Toolbar>
      </AppBar>

      <QueryClientProvider client={queryClient}>
        
          <Routes>
            {/* Define your routes */}
            <Route path="/" element={<Login />} />
            <Route path="/carlist" element={<Carlist />} />

            {/* Catch all unmatched routes */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        
      </QueryClientProvider>
    </Container>
  );

  
}

export default App;
