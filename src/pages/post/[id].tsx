//DYNAMIC ROUTING FOR INDIVIDUAL POSTS
import type { GetServerSideProps } from 'next'
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import CommentSection from '../components/CommentSection';
//interface for blog
interface Blog {
  id: number
  title: string
  body: string
  userId: number
}
//interface for comments
interface Comment {
  id: number
  postId: number
  name: string
  email: string
  body: string
}
//interface for props, initially 3 types of props used, blogs, comments, and id. now, id is found with useRouter hook with access to current route
interface Props {
  blogs: Blog[];
  comments: Comment[];
}
//SSR for post page
export const getServerSideProps = (async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts/");
  const blogs: Blog[] = await res.json();
  return { props: { blogs } }
}) satisfies GetServerSideProps<{ blogs: Blog[] }>
//main Post component
const Post: React.FC<Props> = ({ blogs }) => {
  const router = useRouter();
  const { id } = router.query;
  const [number, setNumber] = useState<number | undefined>(undefined);
  const [gotComments, setGotComments] = useState<Comment[] | undefined>(undefined);
  const foundBlog: Blog | undefined = blogs.find(item => item.id === number);
  //hook for getting the comments of current post. ${number} represents the path
  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${number}/comments`);
        const allComments: Comment[] = await res.json();
        setGotComments(allComments);
      } catch (err) {
        console.log(err);
      }
    }
    getComments();
  }, [gotComments]);
  //hook for current route and setting the current number, the {number} state is used to control the comments and find the current blog.
  useEffect(() => {
    if (id) {
      const parsedNumber = parseInt(id as string, 10);
      if (!isNaN(parsedNumber)) {
        setNumber(parsedNumber);
      } else {
        setNumber(NaN);
      }
    }
  }, [id]);
//Error Handling return for non number /post URL
  if (isNaN(Number(number))) {
    return <p>Page Not Found</p>;
  }
//default return
  return (
    <>
    <Header />
      <div className="mt-[15vh] font-serif">
        {foundBlog ? (
          <>
            <h2 className="text-center text-2xl md:text-4xl lg:text-4xl font-semibold">{foundBlog.title}</h2>
            <p className="text-center text-lg md:text-xl lg:text-xl">{foundBlog.body}</p>
          </>
        ) : (
          <p>Not Found</p>
        )}
      </div>
      <hr />
      <div className="w-full flex justify-center">
        <div className="w-[90vw]">
          <p className="font-semibold mx-2 md:text-lg lg:text-lg text-xs bg-black text-white rounded-md mt-2 px-2">Comments</p>
        </div>
      </div>
      {
        gotComments ? (
          <>
          {
            gotComments.map((items, index) => (
              <div key={index}>
              <CommentSection id={index} name={items.name} body={items.body}/>
              </div>
            ))
          }
          </>
        ) : (
          <>
          <p>Loading</p>
          </>
        )
      }
    </>
  )
}

export default Post;