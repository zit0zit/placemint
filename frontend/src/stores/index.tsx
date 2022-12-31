import { createContext, useContext } from 'react'
import AppStore from './AppStore'
import JobStore from './JobStore'
import UserStore from './UserStore'

const storeContext = createContext({
  appStore: new AppStore(),
  userStore: new UserStore(),
  jobStore: new JobStore(),
})

const useStores = () => useContext(storeContext)

export default useStores
