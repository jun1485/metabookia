import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// 드래그 가능한 아이템 컴포넌트
interface SortableItemProps {
  id: string;
  content: string;
}

function SortableItem({ id, content }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-light-100 dark:bg-dark-200 border border-light-400 dark:border-dark-300 rounded-lg p-4 mb-2 cursor-move shadow-md hover:shadow-lg transition-all"
    >
      {content}
    </div>
  );
}

// 드래그 앤 드롭 퍼즐 컴포넌트
interface Puzzle {
  id: string;
  content: string;
  correctPosition: number;
}

interface DragDropPuzzleProps {
  title: string;
  description: string;
  puzzleItems: Puzzle[];
  onSolve: () => void;
}

export default function DragDropPuzzle({
  title,
  description,
  puzzleItems,
  onSolve,
}: DragDropPuzzleProps) {
  const [items, setItems] = useState(puzzleItems);
  const [isSolved, setIsSolved] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        const newItems = arrayMove(items, oldIndex, newIndex);

        // 퍼즐이 해결되었는지 확인
        const solved = newItems.every(
          (item, index) => item.correctPosition === index
        );
        if (solved && !isSolved) {
          setIsSolved(true);
          onSolve();
        } else {
          setAttempts(attempts + 1);
        }

        return newItems;
      });
    }
  }

  return (
    <div className="bg-light-200 dark:bg-dark-100 rounded-xl p-6 shadow-lg border border-light-400 dark:border-dark-200 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-2 text-gradient">{title}</h2>
      <p className="text-sm mb-6 text-gray-600 dark:text-gray-300">
        {description}
      </p>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          <div>
            {items.map((item) => (
              <SortableItem key={item.id} id={item.id} content={item.content} />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <div className="mt-4 text-sm">
        {isSolved ? (
          <div className="text-primary-600 dark:text-primary-400 font-bold">
            축하합니다! 퍼즐을 해결했습니다!
          </div>
        ) : (
          <div className="text-gray-500">시도 횟수: {attempts}</div>
        )}
      </div>
    </div>
  );
}
