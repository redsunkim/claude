'use client';

import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const priorityStyles: Record<Todo['priority'], string> = {
  high: 'border-l-4 border-red-500',
  medium: 'border-l-4 border-yellow-400',
  low: 'border-l-4 border-green-500',
};

const priorityLabel: Record<Todo['priority'], string> = {
  high: '높음',
  medium: '보통',
  low: '낮음',
};

const priorityBadge: Record<Todo['priority'], string> = {
  high: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
  medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
  low: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
};

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li
      className={`flex items-center gap-3 px-4 py-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm ${priorityStyles[todo.priority]} transition-opacity ${todo.completed ? 'opacity-60' : 'opacity-100'}`}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="w-5 h-5 accent-blue-600 cursor-pointer flex-shrink-0"
      />
      <span
        className={`flex-1 text-gray-800 dark:text-gray-200 text-sm ${todo.completed ? 'line-through text-gray-400 dark:text-gray-500' : ''}`}
      >
        {todo.text}
      </span>
      <span
        className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${priorityBadge[todo.priority]}`}
      >
        {priorityLabel[todo.priority]}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        aria-label="삭제"
        className="flex-shrink-0 text-gray-400 hover:text-red-500 transition-colors text-lg leading-none"
      >
        ×
      </button>
    </li>
  );
}
