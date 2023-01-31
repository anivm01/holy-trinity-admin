import logo from './logo.svg';
import './App.scss';
import { useState } from 'react';
import axios from 'axios'

function App() {
  const [file, setFile] = useState()
  const [description, setDescription] = useState("")
  const [descriptionBG, setDescriptionBG] = useState("")

  const submit = async event => {
    event.preventDefault()

    // Send the file and description to the server

    const formData = new FormData()
    formData.append("image", file)
    formData.append("description", description)
    formData.append("descriptionBG", descriptionBG)

    try {
      const result = await axios.post('http://localhost:8080/images/en', formData, { headers: {'Content-Type': 'multipart/form-data'}})
      console.log(result.data)
    }
    catch (error) {
      console.log(error)
    }
  
    
  }

  return (
    <div className="App">
      <form onSubmit={submit}>
        <input
          filename={file} 
          onChange={e => setFile(e.target.files[0])} 
          type="file" 
          accept="image/*"
        ></input>
        <input
          onChange={e => setDescription(e.target.value)} 
          type="text"
        ></input>
        <input
          onChange={e => setDescriptionBG(e.target.value)} 
          type="text"
        ></input>
        <button type="submit">Submit</button>
      </form>
      <img src="http://localhost:8080/images/d045b56d349cdda814a550f33159c218"/>
    </div>
  )
}

export default App;
