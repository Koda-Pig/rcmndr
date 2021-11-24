import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateSong } from '../../apis/media'

function UpdateSong (props) {
  const { id } = useParams()

  const song = props.userSongs.find(song => song.id === Number(id))

  const { mediaName, artist, genre, comment, link } = song || {} // comment related functionality to be removed //

  const [editForm, setEditForm] = useState({
    id: Number(id),
    mediaName,
    artist,
    genre,
    comment, // comment related functionality to be removed //
    link
  })

  function handleChange (e) {
    const { name, value } = e.target
    const newEditForm = {
      ...editForm,
      [name]: value
    }
    setEditForm(newEditForm)
  }

  function handleSubmit (e) {
    e.preventDefault()
    updateSong(editForm)
  }

  return (
    <>
      <h1>Edit song</h1>
      <p>Fill in the details below to add a new song to your list</p>
      {!song &&
        <p>Song does not exist.</p>
      }
      {song &&
        <form onSubmit={handleSubmit} className='newSongForm'>
          <label htmlFor="mediaName">Song title*</label>
          <input type="text"
            id='mediaName'
            name='mediaName'
            value={editForm.mediaName}
            onChange={handleChange}/>
          <label htmlFor="artist">Artist*</label>
          <input type="text"
            id='artist'
            name='artist'
            value={editForm.artist}
            onChange={handleChange}/>
          <label htmlFor="genre">Genre</label>
          <input type="text"
            id='genre'
            name='genre'
            value={editForm.genre}
            onChange={handleChange}/>
          {/* comment related functionality to be removed */}
          <label htmlFor="comment">Comment</label>
          <input type="text"
            id='comment'
            name='comment'
            value={editForm.comment}
            onChange={handleChange}/>
          {/* comment related functionality to be removed */}
          <label htmlFor="link">Link</label>
          <input type="text"
            id='link'
            name='link'
            value={editForm.link}
            onChange={handleChange}/>
          <button onClick={handleSubmit}>SAVE</button>
        </form>
      }
    </>
  )
}

const mapStateToProps = (globalState) => {
  return {
    userSongs: globalState.userSongs
  }
}

export default connect(mapStateToProps)(UpdateSong)
