'use client'

import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Profile from '@components/Profile';

const OtherProfile = () => {

    const [posts, setPosts] = useState([])
    const searchParams=useSearchParams()
    const name=searchParams.get('name')
    const params=useParams()

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${params.id}/posts`)
            const data = await response.json()
            setPosts(data)
        }
        fetchPosts()
    }, [])

    return (
        <Profile name={name} desc={`Welcome to ${name}'s personalized profile page`} data={posts} />
    )
}

export default OtherProfile