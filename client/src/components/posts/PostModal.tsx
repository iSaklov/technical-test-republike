import React, { useState } from 'react'
import Button from '../UI/Button'

interface PostModalProps {
  isOpen: boolean
  onClose: () => void
  onPostSubmit: (postText: string) => Promise<void>
}

const PostModal: React.FC<PostModalProps> = ({
  isOpen,
  onClose,
  onPostSubmit,
}) => {
  const [postText, setPostText] = useState('')

  const handlePostTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostText(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Here you can add your logic to send data to the server
    try {
      await onPostSubmit(postText)
      setPostText('') // Clear the input field after submission
      onClose() // Close the modal window after submission
    } catch (error) {
      console.error(error)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 m-4 max-w-2xl w-full drop-shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="bg-primary-5 h-80 flex flex-col rounded-lg">
            <textarea
              className="p-6 border rounded-lg w-full overflow-y-scroll resize-none focus:outline-none border-none bg-transparent h-full"
              value={postText}
              onChange={handlePostTextChange}
              placeholder="What's on your mind?"
            />
            <div className="flex justify-end space-x-3 p-6">
              <Button
                type="button"
                onClick={onClose}
                className="w-20 bg-transparent !text-primary border border-primary"
              >
                Cancel
              </Button>
              <Button type="submit" className="w-20">
                Post
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PostModal
