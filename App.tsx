import React from 'react'
import Navigation from '@navigation/Navigation'
import '@unistyles/unistyles'
import { Provider } from 'react-redux'
import { persistor, store } from '@states/store'
import { PersistGate } from 'redux-persist/integration/react'

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation />
      </PersistGate>
    </Provider>
  )
}

export default App