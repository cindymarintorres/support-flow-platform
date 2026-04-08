import { QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2, // 2 min antes de refetch
      retry: 1,                  // 1 reintento en error
      refetchOnWindowFocus: false // evita refetch agresivo
    }
  }
})

export default queryClient