import { authOptions } from "@/app/utils/auth";
import prisma from "@/app/utils/db"
import { getServerSession } from "next-auth";
import Image from "next/image";
import MovieCard from "@/app/components/MovieCard";

async function getData(userId:string) {
    const data = prisma.watchList.findMany({
        where: {
            userId: userId,
        },
        select: {
            Movie: {
                select: {
                    title: true,
                    age: true,
                    duration: true,
                    youtubeString: true,
                    imageString: true,
                    overview: true,
                    release: true,
                    WatchLists: true,
                    id: true,
                },
            },
        },
    });
    return data;
}

export default async function WatchList() {
    const session = await getServerSession(authOptions);
    const data = await getData(session?.user?.email as string);
    return(
        <>
            <h1 className="text-white text-4xl font-bold mt-10 px-5 sm:px-0">Your WatchList</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-5 sm:px-0 mt-10 gap-6">
                {data.map(movie => (
                    <div className="relative h-60" key={movie.Movie?.id}>
                        <Image 
                            src={movie.Movie?.imageString as string}
                            alt="Movie"
                            width={500}
                            height={400}
                            className="rounded-sm w-full h-full absolute object-cover"
                        />

                        <div className="h-60 relative z-10 w-full transform transition
                            duration-500  hover:scale-125 opacity-0 hover:opacity-100">
                            <div className="bg-gradient-to-b from-transparent via-black/50
                                to-black z-10 w-full h-full flex items-center justify-center">
                                <Image 
                                    src={movie.Movie?.imageString as string}
                                    alt="Movie"
                                    width={800}
                                    height={800}
                                    className="absolute w-full h-full -z-10 rounded-lg object-cover"
                                />

                                <MovieCard 
                                    age={movie.Movie?.age as number} 
                                    movieId={movie.Movie?.id as number}
                                    overview={movie.Movie?.overview as string}
                                    time={movie.Movie?.duration as number}
                                    title={movie.Movie?.title as string}
                                    watchList={movie.Movie?.WatchLists.length as number > 0 ? true : false}
                                    watchListId={movie.Movie?.WatchLists[0]?.id as string}
                                    year={movie.Movie?.release as number}
                                    youtubeUrl={movie.Movie?.youtubeString as string}
                                    key={movie.Movie?.id}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}