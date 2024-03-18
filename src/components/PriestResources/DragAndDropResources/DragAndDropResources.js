import './DragAndDropResources.scss'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function DragAndDropResources({ draggableList, setDraggableList }) {

    const handleDragAndDrop = (results) => {
        const { source, destination, type } = results;
        if (!destination) return
        if (source.droppableId === destination.droppableId && source.index === destination.index) return

        if (type === "group") {
            const reorderedResources = [...draggableList]
            const sourceIndex = source.index
            const destinationIndex = destination.index

            const [removedCat] = reorderedResources.splice(sourceIndex, 1)
            reorderedResources.splice(destinationIndex, 0, removedCat)

            return (setDraggableList(reorderedResources))
        }
    }

    return (
        <DragDropContext onDragEnd={handleDragAndDrop}>
            <Droppable droppableId="droppable-root" type="group">
                {(provided) =>
                    <div className="dnd-res" {...provided.droppableProps} ref={provided.innerRef}>
                        {draggableList.map((resource, index) => (
                            <Draggable draggableId={JSON.stringify(resource.id)} key={resource.id} index={index}>
                                {(provided) =>
                                    <div {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                                        <h4 className="dnd-res__resource">{resource.title}</h4>
                                    </div>
                                }
                            </Draggable>
                        ))}
                    </div>
                }
            </Droppable>
        </DragDropContext>
    );
}

export default DragAndDropResources;
