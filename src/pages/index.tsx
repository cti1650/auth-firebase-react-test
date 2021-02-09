import { useEffect, FC, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { auth } from '../utils/firebase'

const Home: FC = (props: any) => {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<null | object>(null)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user ? setCurrentUser(user) : router.push('/login')
    })
  }, [])

  const logOut = async () => {
    try {
      await auth.signOut()
      router.push('/login')
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div>
      <pre>{currentUser && JSON.stringify(currentUser, null, 4)}</pre>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 opacity-50 cursor-not-allowed" onClick={logOut}>Logout</button>
    </div>
  )
}

export default Home
