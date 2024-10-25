import { FC, ReactNode } from "react"
import { SContainer } from "./Container.styled"

type ContainerProps = {
  children: ReactNode
}

export const Container: FC<ContainerProps> = ({children}) => {

  return (
    <SContainer>
      {children}
    </SContainer>
  )
}