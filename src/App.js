import { ProviderAuthContext } from './context/context';
import AppRouter from './components/appRouter';
import { useEffect, useState } from 'react';
import axios from 'axios';


function App() {
  
  return(
    <ProviderAuthContext>
      <AppRouter/>
    </ProviderAuthContext>
        
   
  );
}

export default App;
