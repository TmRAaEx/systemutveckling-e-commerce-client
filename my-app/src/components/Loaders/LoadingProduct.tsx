export default function ProductCardSkeleton() {
    return (
        <div
            className="relative flex w-full p-2 flex-col overflow-hidden rounded-lg border border-gray-100 bg-white dark:bg-black dark:border-gray-700 shadow-md animate-pulse">
            <div className="flex w-full h-56 justify-around flex-col">
                <div
                    className="relative w-full flex h-60 overflow-hidden rounded-xl justify-center items-center bg-gray-200 dark:bg-gray-800">
                    <div className="w-24 h-24 bg-gray-300 dark:bg-gray-700 rounded-full"/>
                </div>

                <div className="flex flex-col h-full justify-around mt-4 px-1 pb-2 space-y-2">
                    <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4"/>
                    <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-2/4"/>
                    <div className="h-5 bg-gray-400 dark:bg-gray-500 rounded w-1/3"/>
                </div>
            </div>

            <div className="mt-2 px-1">
                <div className="h-10 w-full bg-gray-300 dark:bg-gray-700 rounded-md"/>
            </div>
        </div>
    );
}
