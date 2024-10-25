import { FC } from "react"
import { IEventList } from "../../hooks/useEventsListApi"
import { SRectangle, SRectangleContainer } from "./Rectangle.styled"

type RactangleProps = {
  rectList: IEventList[]
}

export const Rectangle: FC<RactangleProps> = ({ rectList }) => {

  return (
    <SRectangleContainer>
      {!!rectList.length &&
        rectList.map(item =>
          <SRectangle
            key={item.timestamp}
            top={(item.zone.top).toString() + 'px'}
            left={(item.zone.left).toString() + 'px'}
            width={(item.zone.width).toString() + 'px'}
            height={(item.zone.height).toString() + 'px'}
          />
        )
      }
    </SRectangleContainer>
  )
}