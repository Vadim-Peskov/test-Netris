import { styled, Box } from "@mui/material"

export const SRectangleContainer = styled(Box)({
  position: 'absolute',
  top: '0',
  left: '0',
  zIndex: '100',
  width: '100%',
  height: '100%',
  content: '""',
  pointerEvents: 'none',
})

export const SRectangle = styled(Box)<{ top: string, left: string, width: string, height: string }>(({ top, left, width, height }) => ({
  position: 'absolute',
  top: top,
  left: left,
  zIndex: '150',
  width: width,
  height: height,
  content: '""',
  pointerEvents: 'none',
  background: 'rgba(9, 79, 27, 0.5);',
  border: '4px solid green',
}));