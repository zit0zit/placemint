import { faLocationDot, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { Button } from '../Button'
import { Input } from '../Input'
import { Select } from '../Select'
import './style.scss'

interface Props {
  onSubmit: (arg: { keyword?: string; city?: string }) => void
}

export function SearchForm({}: Props) {
  const [value, setValue] = useState('')
  const [city, setCity] = useState('HCM')

  const onSearch = () => {
    console.log(value, city)
  }

  return (
    <div className="search-form">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Keyword skill (Java, iOS...), Job Title, Company..."
        icon={<FontAwesomeIcon icon={faSearch} />}
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
      <Button onClick={onSearch}>Search</Button>
    </div>
  )
}
