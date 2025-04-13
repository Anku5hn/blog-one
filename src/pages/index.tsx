import * as React from 'react';
import Header from './components/Header'
import { useFetchApiQuery } from '../redux/services/fetchService'
import Link from 'next/link';
export default function Home() {
  const { data, error, isLoading } = useFetchApiQuery();
  return (
    <>
      <Header />
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">something went wrong</p>}
      {/*Desktop*/}
      <div className="mt-[12vh] w-[100vw] h-[12vh] z-1 hidden md:flex lg:flex justify-center font-serif">
        <div className="w-[90vw]">
          <div className="flex items-end">
            <h2 className="text-4xl font-semibold italic">Best Of The Week</h2>
            <Link href="/all-posts" className="mx-2 italic"><p>See All Posts →</p></Link>
          </div>
          <div className=" w-full flex">
            <div className="w-[calc(75%-10px)] mr-[10px] h-[calc(80vh-30px)] mt-[30px] bg-linear-to-r from-blue-400 to-blue-200 rounded-lg flex flex-col items-center">
              <div className="w-5/6 flex flex-col">
                <div className="self-start mt-10  h-10">
                  <p className="text-white px-1 py-1  border-white rounded-r-full rounded-l-full border">Author: {data && data[0].id}</p>
                </div>
                <div className="flex bg-white rounded-md h-20">
                  <h2 className=" font-semibold text-3xl">{data && data[0].title}</h2>
                  
                </div>
                <p className="mt-2 bg-white rounded-md">{data && data[0].body}</p>
                <Link href="/post/1" className="self-end bg-white rounded-r-full rounded-l-full px-1 py-1 mt-[35vh]">Read more →</Link>
              </div>
            </div>
            <div className="w-[25%]">
              <div className="h-[39vh] bg-[#B7D4D8] rounded-lg w-[100%] mb-3 flex justify-center">
                <div className="w-5/6 mt-5 ">
                    <p className="text-2xl">Become a writer</p>
                    <p className="font-bold mt-5 text-2xl">Write for us</p>
                    <p className="mt-5 text-2xl">See How It Works →</p>
                    <p className="self-end text-right underline mt-[30%] text-lg"><Link href="/upload">Post Now</Link></p>
                </div>
              </div>
              <div className="h-[39vh] bg-[#8C9F7B] rounded-lg w-[100%] flex justify-center flex-col items-center">
                <p className="text-white font-bold text-3xl">Read More Blogs</p>
                <Link href="all-posts" className="px-2 py-2 bg-white rounded-l-full rounded-r-full mt-10">See All Posts →</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*Mobile*/}
      <div className="md:hidden lg:hidden flex mt-[15vh] flex-col justify-center items-center">
        <div className="w-5/6 bg-linear-to-r from-blue-400 to-blue-200 rounded-lg h-[40vh]">
        <p className="text-white px-1 py-1 mx-1 my-2">Author: {data && data[0].id}</p>
        <h2 className="bg-white rounded-md mx-1 font-semibold text-md">{data && data[0].title}</h2>
        <p className="mt-2 bg-white rounded-md mx-1 mb-2">{data && data[0].body}</p>
        <Link href="/post/1" className="bg-white mx-1 rounded-r-full rounded-l-full px-1 py-1">Read more →</Link>
        </div>
        <div className="w-5/6 bg-[#B7D4D8] mt-5 rounded-lg h-[40vh]">
        <p className="text-md mx-1">Become a writer</p>
                    <p className="font-bold mt-5 text-md mx-1">Write for us</p>
                    <p className="mt-5 text-md mx-1">See How It Works →</p>
                    <p className="underline mx-2 my-10"><Link href="/upload">Post Now  →</Link></p>
        </div>
        <div className="w-5/6 bg-[#8C9F7B] mt-5 rounded-lg h-[40vh] flex justify-center flex-col items-center">
        <p className="text-white font-bold text-3xl">Read More Blogs</p>
        <Link href="all-posts" className="px-2 py-2 bg-white rounded-l-full rounded-r-full mt-10">See All Posts →</Link>
        </div>
      </div>
    </>
  );
}
