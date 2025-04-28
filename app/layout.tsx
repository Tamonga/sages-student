import { Inter } from "next/font/google"
import Provider from "./provider"
import { Box, ClientOnly, Skeleton } from "@chakra-ui/react"
import { ColorModeToggle } from "@/components/ui/color-mode-toggle"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={inter.className} suppressHydrationWarning>
      <head />
      <body>
        <Provider>
          
          {children}
          <Box pos="absolute" top="4" right="4">
                  <ClientOnly fallback={<Skeleton w="10" h="10" rounded="md" />}>
                    <ColorModeToggle />
                  </ClientOnly>
          </Box>
        </Provider>
        
      </body>
    </html>
  )
}