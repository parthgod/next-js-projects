'use client'

import { useState, useEffect } from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick }) => {

    return (
        <div className='mt-16 prompt_layout'>
            {data?.map((post) => (
                <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
            ))}
        </div>
    )

}

const Feed = () => {

    const [searchText, setSearchText] = useState('')
    const [posts, setPosts] = useState([])
    const [searchedPosts, setSearchPosts] = useState([])

    const handleSearchChange = (e) => {
        setSearchText(e.target.value)
    }

    useEffect(() => {
        console.log(posts);
        if (searchText) {
            const filteredPosts = posts.filter((post) => post.prompt.toLowerCase().includes(searchText.toLowerCase()) || post.tag.toLowerCase().includes(searchText.toLowerCase()) || post.creator.username.toLowerCase().includes(searchText.toLowerCase()) || post.creator.email.toLowerCase().includes(searchText.toLowerCase()))
            setSearchPosts(filteredPosts)
        }
        else {
            setSearchPosts(posts)
        }
    }, [searchText])

    const handleTagClick = (tag) => {
        setSearchText(tag)
    }

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/api/prompt')
            const data = await response.json()
            setPosts(data)
            setSearchPosts(data)
        }
        fetchPosts()
    }, [])

    return (
        <section className='feed'>
            <form className='relative w-full flex-center'>
                <input type='text' placeholder='Search for a tag or username' value={searchText} onChange={handleSearchChange} required className='search_input peer' />
            </form>
            <PromptCardList data={searchedPosts} handleTagClick={handleTagClick} />
        </section>
    )
}

export default Feed