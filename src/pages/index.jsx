import { useEffect } from 'react'
import Router from 'next/router'

const index = () => {
    const router = Router

    useEffect(() => {
        router.push('/notes')
    }, [])

    return <div></div>
}

export default index
