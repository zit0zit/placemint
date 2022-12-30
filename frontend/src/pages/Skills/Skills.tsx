import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import useStores from '../../stores'
import './skills.scss'

function SkillsFC() {
  const { appStore } = useStores()

  return (
    <>
      <br />
      <br />
      <div className="skills">
        <div>
          <h1>Jobs by Skill</h1>
          <ul>
            {appStore.skills.map((s, i) => (
              <li key={i}>
                <Link to={'/jobs?skill=' + s.id}>{s.name}</Link>
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

export const Skills = observer(SkillsFC)
