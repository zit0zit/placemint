import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import useStores from '../../stores'
import './companies.scss'

function CompaniesFC() {
  const { appStore } = useStores()

  return (
    <>
      <br />
      <br />
      <div className="companies">
        <div>
          <h1>Jobs by Skill</h1>
          <ul>
            {appStore.companies
              .slice()
              .sort((a, b) => (a.name as string).localeCompare(b.name))
              .map((comp, i) => (
                <li key={i}>
                  <Link to={'/jobs?company=' + comp.id}>{comp.name}</Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <br />
      <br />
    </>
  )
}

export const Companies = observer(CompaniesFC)
