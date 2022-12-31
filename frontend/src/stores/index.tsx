import { createContext, useContext } from 'react'
import AppStore from './AppStore'
import UserStore from './UserStore'

const storeContext = createContext({
  appStore: new AppStore(),
  userStore: new UserStore(),
})

const useStores = () => useContext(storeContext)

export default useStores
