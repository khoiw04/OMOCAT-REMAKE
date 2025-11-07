import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { QueryClient } from '@tanstack/react-query'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'

export async function getRouter() {
  const queryClient = new QueryClient()

  const router = createRouter({
    routeTree,
    context: {
      authentication: undefined!,
      item: undefined!,
      queryClient,
    },
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 400_000,
    scrollRestoration: true,
    defaultStructuralSharing: true,
    defaultViewTransition: true,
    defaultNotFoundComponent: () => <></>,
  })

  setupRouterSsrQueryIntegration({
    router,
    queryClient,
  })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}