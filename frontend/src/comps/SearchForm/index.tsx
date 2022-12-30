import { faLocationDot, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { Button } from '../Button'
import { Input } from '../Input'
import { Select } from '../Select'
import './style.scss'

interface Props {
  onSubmit: (keyword?: string, city?: string) => void
  showSearchIcon?: boolean
  defaultCity?: string
}

export function SearchForm({
  onSubmit,
  showSearchIcon = true,
  defaultCity = 'HCM',
}: Props) {
  const [value, setValue] = useState('')
  const [city, setCity] = useState(defaultCity)

  const onSearch = (e: any) => {
    e.preventDefault?.()
    onSubmit(value, city != 'All' ? city : '')
    setValue('')
  }

  return (
    <form className="search-form" onSubmit={onSearch}>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Keyword skill (Java, iOS...), Job Title, Company..."
        icon={showSearchIcon ? <FontAwesomeIcon icon={faSearch} /> : undefined}
      />
      <Select
        value={city}
        onChange={(e) => setCity(e.target.value)}
        icon={<FontAwesomeIcon icon={faLocationDot} />}
      >
        <option value="All">All Cities</option>
        <option value="HCM">Ho Chi Minh</option>
        <option value="HN">Ha Noi</option>
        <option value="DN">Da Nang</option>
        <option value="Others">Others</option>
      </Select>
      <Button onClick={onSearch}>
        {showSearchIcon ? 'Search' : <FontAwesomeIcon icon={faSearch} />}
      </Button>
    </form>
  )
}
