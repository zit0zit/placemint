import { observer } from 'mobx-react-lite'
import { useSearchParams } from 'react-router-dom'
import { Detail } from './Detail'
import { List } from './List'
import './style.scss'

function ReviewsFC() {
  const [params, _setParams] = useSearchParams()

  return (
    <div className="reviews">
      {params.get('comp') ? <Detail id={params.get('comp') ?? ''} /> : <List />}
    </div>
  )
}

export const Reviews = observer(ReviewsFC)
