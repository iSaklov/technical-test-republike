import React, { useState } from 'react'
import Button from '../UI/Button'

const AddPost: React.FC<{ onPostAdded: () => Promise<void> }> = ({
  onPostAdded,
}) => {
  const [text, setText] = useState('') // State for the post text

  // Handler for the form submit action
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault() // Prevent the default form submit action

    try {
      // Send the post creation request to the server
      const response = await fetch('http://localhost:3001/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Include the JWT token for authentication
        },
        body: JSON.stringify({
          text, // Send the text of the post
          // No need to send userId here, it should be extracted from the token on the server-side
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create post') // Throw an error if the request was not successful
      }

      // Handle successful post creation, for example, refresh the list of posts or redirect
      alert('Post created successfully')
      setText('') // Clear the text field
      onPostAdded() // Refresh the list of posts after adding a new one
    } catch (error) {
      console.error(error) // Log any errors to the console
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)} // Update state when the text changes
        placeholder="What's happening?" // Placeholder text for the textarea
      ></textarea>
      <Button type="submit">Post</Button>
    </form>
  )
}

export default AddPost
