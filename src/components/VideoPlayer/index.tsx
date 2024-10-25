import { useRef, useState } from "react"
import ReactPlayer from "react-player"
import { SVideoPlayer } from "./VideoPlayer.styled"
import { IEventList, useEventsListApi } from "../../hooks/useEventsListApi"
import { DataTable as Table} from "../Table"
import { Rectangle } from "../Rectangle"

export const VideoPlayer = () => {
  const [rectList, setRectList] = useState<IEventList[]>([])
  const playerRef = useRef<ReactPlayer | null>(null)

  const { list, isLoading, isError } = useEventsListApi()

  return (
    <>
      <SVideoPlayer>
        <ReactPlayer
          url="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          ref={playerRef}

          width='100%'
          height='auto'
          
          playing={false}
          controls={true}
          progressInterval={200}
          onProgress={(progress) => {
            const filteredList = list.filter(item => {
              if (progress.playedSeconds + 0.001 >= item.timestamp &&
                  progress.playedSeconds <= item.timestamp + item.duration) {
                    return item
                  }
            })
            setRectList(filteredList)
          }}
        />
        <Rectangle rectList={rectList}/>
      </SVideoPlayer>
      
      {isLoading && <h3>Загрузка...</h3>}
      {isError.error && <h3>Произошла ошибка. Код: {isError?.code}</h3>}

      {(!isError.error && !isLoading) && <Table list={list} playerRef={playerRef} />}

    </>
  )
}