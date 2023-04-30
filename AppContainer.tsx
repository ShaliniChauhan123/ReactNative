import {QueryClient, QueryClientProvider} from 'react-query';
import App from './App';

export default function AppContainer() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}
