import React from 'react'
import type { GetServerSideProps } from 'next';//import * type * GetServerSideProps
import BlogList from '../components/BlogList';
import Header from '../components/Header'
//Interface for blog post data structure
interface Blog {
    id: number;
    title: string;
    body: string;
    userId: number;
  }
  //Props
  interface Props {
    blogs: Blog[];
  }
  //Functional component with blogs
const AllPosts: React.FC<Props> = ({blogs}) => {
  console.log(blogs)
    return(
        <>
        <Header />
         <BlogList blogs={blogs} />
        </>
    )
}
//SSR for the blog post list page
export const getServerSideProps = (async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/');
    const blogs: Blog[] = await res.json();
    return {
      props: { blogs },
    };
  }) satisfies GetServerSideProps<{ blogs: Blog[] }>

  export default AllPosts;
