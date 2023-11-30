import type { CSSProperties, FC, ReactNode } from 'react'
import { memo, useCallback, useMemo, useState } from 'react'
import type { DragSourceMonitor } from 'react-dnd'
import { DropTargetMonitor, useDrag, useDrop } from 'react-dnd'
import { ItemTypes } from './ItemTypes';

import { Colors } from './Colors'

const style: CSSProperties = {
  border: '1px dashed gray',
  padding: '0.5rem',
  margin: '0.5rem',
}

export interface SourceBoxProps {
  color: string
  onToggleForbidDrag?: () => void
  children?: ReactNode
}

export const SourceBox: FC<SourceBoxProps> = memo(function SourceBox({
  color,
  children,
  onDrop = (color) => console.log(color),
  greedy = false,
}) {
  const [forbidDrag, setForbidDrag] = useState(false)
  const [{ isDragging }, drag] = useDrag(
    () => ({
      options: {
        dropEffect: 'copy',
      },
      type: color,
      canDrag: !forbidDrag,
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: () => {

      },
    }),
    [forbidDrag, color],
  )

  const [hasDropped, setHasDropped] = useState(false)
  const [hasDroppedOnChild, setHasDroppedOnChild] = useState(false)

  const [{ isOver, isOverCurrent }, drop] = useDrop(
    () => ({
      accept: [Colors.YELLOW, Colors.BLUE],
      drop(_item: unknown, monitor) {
        onDrop(monitor.getItemType());
        const didDrop = monitor.didDrop()
        if (didDrop && !greedy) {
          return
        }
        setHasDropped(true)
        setHasDroppedOnChild(didDrop)
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
      }),
    }),
    [greedy, setHasDropped, setHasDroppedOnChild],
  )

  // const [{ isOver, draggingColor, canDrop }, drop] = useDrop(
  //   () => ({
  //     accept: [Colors.YELLOW, Colors.BLUE],
  //     drop(_item: DragItem, monitor) {
  //       onDrop(monitor.getItemType())
  //       return undefined
  //     },
  //     collect: (monitor: DropTargetMonitor) => ({
  //       isOver: monitor.isOver(),
  //       canDrop: monitor.canDrop(),
  //       draggingColor: monitor.getItemType() as string,
  //     }),
  //   }),
  //   [onDrop],
  // )

  const onToggleForbidDrag = useCallback(() => {
    setForbidDrag(!forbidDrag)
  }, [forbidDrag, setForbidDrag])

  const backgroundColor = useMemo(() => {
    switch (color) {
      case Colors.YELLOW:
        return 'lightgoldenrodyellow'
      case Colors.BLUE:
        return 'lightblue'
      default:
        return 'lightgoldenrodyellow'
    }
  }, [color])

  const containerStyle = useMemo(
    () => ({
      ...style,
      backgroundColor,
      opacity: isDragging ? 0.4 : 1,
      cursor: forbidDrag ? 'default' : 'move',
    }),
    [isDragging, forbidDrag, backgroundColor],
  )

  return (
    <div
      ref={(ref) => {
        drop(ref);
        drag(ref);
      }}
      style={containerStyle}
      role="SourceBox"
      data-color={color}
    >
      <input
        type="checkbox"
        checked={forbidDrag}
        onChange={onToggleForbidDrag}
      />
      <small>Forbid drag</small>
      {children}
    </div>
  )
})
