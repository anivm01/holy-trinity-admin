import './DragAndDropCategories.scss'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function DragAndDropCategories({ draggableList, setDraggableList }) {

    const handleDragAndDrop = (results) => {
        const { source, destination, type } = results;
        if (!destination) return
        if (source.droppableId === destination.droppableId && source.index === destination.index) return

        if (type === "group") {
            const reorderedCategories = [...draggableList]
            const sourceIndex = source.index
            const destinationIndex = destination.index

            const [removedCat] = reorderedCategories.splice(sourceIndex, 1)
            reorderedCategories.splice(destinationIndex, 0, removedCat)

            return (setDraggableList(reorderedCategories))
        }
    }

    return (
        <DragDropContext onDragEnd={handleDragAndDrop}>
            <Droppable droppableId="droppable-root" type="group">
                {(provided) =>
                    <div className="dnd-cat" {...provided.droppableProps} ref={provided.innerRef}>
                        {draggableList.map((category, index) => (
                            <Draggable draggableId={JSON.stringify(category.id)} key={category.id} index={index}>
                                {(provided) =>
                                    <div {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                                        <h3 className="dnd-cat__category">{category.name}</h3>
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

export default DragAndDropCategories;
