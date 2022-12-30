import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './style.scss'

export function Stars({
  value = 5,
  className,
}: {
  value: number
  className?: string
}) {
  return (
    <div className={'stars ' + (className ?? '')}>
      <div className="rel">
        <div className="st-ghost" style={{ width: (value / 5) * 100 + '%' }}>
          <div className="star">
            <FontAwesomeIcon icon={faStar} />
          </div>
          <div className="star">
            <FontAwesomeIcon icon={faStar} />
          </div>
          <div className="star">
            <FontAwesomeIcon icon={faStar} />
          </div>
          <div className="star">
            <FontAwesomeIcon icon={faStar} />
          </div>
          <div className="star">
            <FontAwesomeIcon icon={faStar} />
          </div>
        </div>
        <div className="star">
          <FontAwesomeIcon icon={farStar} />
        </div>
        <div className="star">
          <FontAwesomeIcon icon={farStar} />
        </div>
        <div className="star">
          <FontAwesomeIcon icon={farStar} />
        </div>
        <div className="star">
          <FontAwesomeIcon icon={farStar} />
        </div>
        <div className="star">
          <FontAwesomeIcon icon={farStar} />
        </div>
      </div>
    </div>
  )
}
