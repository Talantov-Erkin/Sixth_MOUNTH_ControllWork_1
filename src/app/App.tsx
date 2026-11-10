import { RouterProvider } from 'react-router-dom'
import { QueryProvider } from './providers'
import { router } from './router'

const App = () => (
  <QueryProvider>
    <RouterProvider router={router} />
  </QueryProvider>
)

export default App
