import { styled, Box } from "@mui/material"

export const SVideoPlayer = styled(Box)({
  position: 'relative',
  width: '100%',
  height: 'auto',
  borderRadius: '5px',
  overflow: 'hidden',

  '> video': {
    borderRadius: '3px'
  }
})