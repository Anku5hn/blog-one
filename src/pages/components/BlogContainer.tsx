import Button from '@mui/material/Button'
import Link from 'next/link';//link for linking the blog to the /post/[id].tsx page
//singular prop will be used in this component
//interface for the blog post data structure
interface Props {
    id: number
    title: string
    body: string
    userId: number
}

const BlogContainer: React.FC<Props> = ({ id, title, body, userId }) => {
    return (
        <>

            <div className="flex w-full font-serif justify-center" key={userId}>
                <div className="block w-[90vw] md:flex lg:flex flex-col" key={userId}>
                    <button className="bg-black text-white text-left px-1 py-1 mt-2">Author: {id}</button>
                    <h2 className="text-lg md:text-3xl lg:text-3xl font-semibold">{title}</h2>
                    <p className="md:text-lg lg:text-lg">{body}</p>
                    <Link href={`/post/${id}`} className="self-end">
                        <Button variant="contained" color="black">Read More</Button>
                    </Link>
                </div>
            </div>
            <hr className="border-gray-500 border text-gray-500 mt-1 md:mx-16 mx-2" />
        </>)
}
export default BlogContainer;