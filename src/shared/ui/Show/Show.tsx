import { type FC } from 'react'

interface IShowProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  when: boolean | undefined | null | false
}

const Show: FC<IShowProps> = ({ when, fallback = null, children }) => {
  return when ? children : fallback
}

export default Show
