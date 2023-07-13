import { useState, useEffect } from 'react'
import AvatarUpload from '../../Components/AvatarUpload'
import { useAuth } from '../../hooks/Auth'
import { supabaseClient as supabase } from '../../config/supabase-client'
import { Button, Form } from 'rsuite'

function Profile() {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)
  const [ethercoin, setEthercoin] = useState(null)

  const { user } = useAuth()

  useEffect(() => {
    async function getProfile() {
      setLoading(true)

      let { data, error } = await supabase
        .from('profiles')
        .select(`username, avatar_url, ethercoin`)
        .eq('id', user.id)
        .single()

      if (error) {
        console.warn(error)
      } else if (data) {
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
        setEthercoin(data.ethercoin)
      }

      setLoading(false)
    }

    getProfile()
  }, [user])

  async function updateProfile(event) {
    event.preventDefault()
    setLoading(true)

    const updates = {
      id: user.id,
      username,
      website,
      avatar_url,
      updated_at: new Date(),
    }

    let { error } = await supabase.from('profiles').upsert(updates)

    if (error) {
      alert(error.message)
    }
    setLoading(false)
  }

  return (
<>
<h1>Ec {ethercoin}</h1>
    <Form onSubmit={updateProfile} className="form-widget">
      <AvatarUpload
      url={avatar_url}
      size={150}
      onUpload={(event, url) => {
        setAvatarUrl(url)
        updateProfile(event)
      }}
    />
      <Form.Group>
        <Form.ControlLabel htmlFor="email">Email</Form.ControlLabel>
        <Form.Control id="email" type="text" value={user.email} disabled />
      </Form.Group>
      <Form.Group>
        <Form.ControlLabel htmlFor="username">Name</Form.ControlLabel>
        <Form.Control
          id="username"
          type="text"
          required
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.ControlLabel htmlFor="website">Website</Form.ControlLabel>
        <Form.Control
          id="website"
          type="url"
          value={website || ''}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </Form.Group>

      <div>
        <Button className="button block primary" type="submit" disabled={loading}>
          {loading ? 'Loading ...' : 'Update'}
        </Button>
      </div>
    </Form>
      <div>
        <Button className="button block" type="button" onClick={() => supabase.auth.signOut()}>
          Sign Out
        </Button>
      </div>
    </>
  )
}

export default Profile