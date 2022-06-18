import { useRouter } from 'next/router'
import { FC, ReactNode } from 'react'
import { Arrow } from './Arrow'

type LayoutProps = {
  title: string
  children: ReactNode
}

export const Layout: FC<LayoutProps> = ({ title, children }) => {
  const router = useRouter()

  return (
    <main>
      <div className="relative h-full min-h-screen">
        <div className="flex h-72 w-full items-center justify-center rounded-b-[6.25rem] bg-black px-32 pt-4 text-center">
          {router.asPath !== '/' && (
            <Arrow
              className="top-0 h-8 w-8 cursor-pointer text-white hover:text-white/50"
              onClick={() => router.push('/')}
            />
          )}

          <h1 className="w-8/12 text-4xl text-white">{title}</h1>
        </div>

        {children}

        <div className="pb-40" />

        <footer className="absolute bottom-0 flex h-28 w-full items-center justify-center bg-black">
          <div className="flex h-4/5 w-4/5 flex-wrap items-center">
            <hr className="w-full border-t border-[#ff2147]" />
            <h3 className="text-white">
              Copyright Renan Pereira © 2022 Todos os direitos reservados.
            </h3>
          </div>
        </footer>
      </div>
    </main>
  )
}
