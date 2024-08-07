import * as React from 'react'

import Home from './Home'
// 1. import `ChakraProvider` component
import Table from './TableTest'
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  // 2. Wrap ChakraProvider at the root of your app
  return (
    <ChakraProvider>
      <span>
        <Home />
        <Table />
      </span>
      
    </ChakraProvider>
  )
}

export default App