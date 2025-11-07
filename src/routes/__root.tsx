import { HeadContent, Outlet, Scripts, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useAuth, type AuthContext } from '@/utils/useAuth'
import { QueryClient } from '@tanstack/react-query'
import appCss from '@/styles/styles.css?url'
import { seo } from '@/utils/seo'

type RouterContext = {
  authentication: AuthContext
  queryClient: QueryClient
  item: Array<any>
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <Navbar />
        <Outlet />
        <Footer />
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>    
  ),  
  context: async () => {
    const authentication = useAuth()

    return { authentication }
  },
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...seo({
        title:
          'OMOCAT Remake Store',
        description: `“OMOCAT Shop” is an independent fashion brand based in Los Angeles, known for its bold fusion of anime aesthetics, pixel art, and streetwear culture. Founded by the artist OMOCAT, the brand has built a passionate global following through its expressive designs and collaborations with iconic names in pop culture.`,
      }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
    ]
  }),
})