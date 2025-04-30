import MetaTags from "@components/MetaTags.tsx";

export default function ProductPageSkeleton() {
    return (<>
            <MetaTags title="Loading..." description="Loading product details..."/>
            <div className="flex flex-col w-full items-center">
                <section className="flex flex-col text-left items-center gap-8 w-full md:w-[80%] max-w-[850px]">
                    {/* Title Skeleton */}
                    <div className="w-full h-8 bg-gray-300 animate-pulse rounded-lg mb-4"></div>

                    {/* Image Skeleton */}
                    <div className="w-full h-64 bg-gray-300 animate-pulse rounded-lg mb-4"></div>

                    {/* Price, Button, Category Skeleton */}
                    <div className="flex flex-col gap-3 w-full">
                        <div className="w-1/4 h-8 bg-gray-300 animate-pulse rounded-lg mb-4"></div>
                        <div className="w-1/4 h-8 bg-gray-300 animate-pulse rounded-lg mb-4"></div>

                        {/* Category Skeleton */}
                        <div className="w-1/3 h-6 bg-gray-300 animate-pulse rounded-lg mb-4"></div>

                        {/* Description Title Skeleton */}
                        <div className="w-1/3 h-6 bg-gray-300 animate-pulse rounded-lg mb-4"></div>

                        {/* Description Skeleton */}
                        <div className="w-full h-20 bg-gray-300 animate-pulse rounded-lg mb-4"></div>
                    </div>
                </section>
            </div>
        </>
    );
}
