import { Skeleton } from "@/components/Skeleton"

export default function VMLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Skeleton className="h-6 w-32" />
      </div>

      <div className="mb-8">
        <Skeleton className="h-10 w-64 mb-2" />
        <Skeleton className="h-6 w-80" />
      </div>

      <div className="bg-gray-800 rounded-lg p-4 w-full aspect-video">
        <Skeleton className="h-full w-full" />
      </div>
    </div>
  )
}
