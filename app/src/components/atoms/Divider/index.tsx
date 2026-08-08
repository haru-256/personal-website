import { FC } from 'react'
const Divider: FC<Record<string, never>> = () => {
  return (
    <div className="relative">
      <div
        className="absolute inset-0 mx-8 my-5 flex items-center"
        aria-hidden="true"
      >
        <div className="w-full border-t border-b-2 border-gray-100" />
      </div>
    </div>
  )
}

export default Divider
