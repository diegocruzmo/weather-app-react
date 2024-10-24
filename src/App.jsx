import { useState } from 'react'

function App() {
  const key = '93ab70d9f8a3c5d282881327e00c2ac9'
  const url = `https://api.openweathermap.org/data/2.5/weather`

  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)

  const handleChange = (e) => {
    setCity(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    getFetch()
  }

  const getFetch = async () => {
    try {
      const response = await fetch(`${url}?q=${city}&appid=${key}`)
      const data = await response.json()
      setWeather(data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className='vh-100 bg-light bg-gradient'>
        <header className='text-white'>
          <h1 className='display-2 p-2 mb-3 bg-primary bg-gradient text-center'>
            Weather App
          </h1>
        </header>

        <section className='container d-flex justify-content-center align-items-center'>
          <form
            onSubmit={handleSubmit}
            className='d-flex align-items-center justify-content-center'
          >
            <div className='me-2 my-auto'>
              <input
                type='text'
                className='form-control'
                id='city'
                name='city'
                placeholder='Miami, Berlin, Bogota...'
                value={city}
                onChange={handleChange}
              />
            </div>
            <button type='submit' className='btn btn-primary bg-gradient'>
              Search
            </button>
          </form>
        </section>
        <hr />
        {weather && (
          <article className='container text-center'>
            <h5>{weather.name}</h5>
            <img
              src={`https://openweathermap.org/img/wn/${weather?.weather?.[0]?.icon}@2x.png`}
              alt='icon weather'
            />
            <p>Temperature: {parseInt(weather?.main?.temp) - 273} °C</p>
            <p>Description: {weather?.weather?.[0]?.description}</p>
          </article>
        )}
      </div>
    </>
  )
}

export default App
