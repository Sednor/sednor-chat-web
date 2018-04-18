export const chatSource = {
  beginDrag(props) {
    return {
      id: props.data.id,
      originalIndex: props.findCard(props.data.id).index,
    }
  },

  endDrag(props, monitor) {
    const { id: droppedId, originalIndex } = monitor.getItem()
    const didDrop = monitor.didDrop()

    if (!didDrop) {
      props.moveCard(droppedId, originalIndex)
    }
  },
};

export function chatSourceCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

