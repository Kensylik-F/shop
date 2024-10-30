import { ProviderAuthContext } from './context/context';
import AppRouter from './components/appRouter';


function App() {
  return(
    <ProviderAuthContext>
      <AppRouter/>
    </ProviderAuthContext>
        
   
  );
}

export default App;
