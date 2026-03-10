'use client';

import { useState, useEffect, useMemo } from 'react';
import { Todo, Filter, Priority } from './types/todo';
import TodoInput from './components/TodoInput';
import TodoItem from './components/TodoItem';
import FilterBar from './components/FilterBar';

function generateId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

const STORAGE_KEY = 'todo-app-items';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setTodos(JSON.parse(saved));
    } catch {
      // ignore
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos, mounted]);

  const addTodo = (text: string, priority: Priority) => {
    setTodos((prev) => [
      { id: generateId(), text, completed: false, priority, createdAt: Date.now() },
      ...prev,
    ]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((t) => !t.completed));
  };

  const filtered = useMemo(() => {
    if (filter === 'active') return todos.filter((t) => !t.completed);
    if (filter === 'completed') return todos.filter((t) => t.completed);
    return todos;
  }, [todos, filter]);

  const counts = useMemo(
    () => ({
      all: todos.length,
      active: todos.filter((t) => !t.completed).length,
      completed: todos.filter((t) => t.completed).length,
    }),
    [todos]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-lg mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
            할 일 관리
          </h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm">
            오늘 해야 할 일을 정리해보세요
          </p>
        </header>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6">
          <TodoInput onAdd={addTodo} />

          <FilterBar current={filter} onChange={setFilter} counts={counts} />

          {mounted && (
            <>
              {filtered.length === 0 ? (
                <p className="text-center text-gray-400 dark:text-gray-500 py-10 text-sm">
                  {filter === 'completed'
                    ? '완료된 항목이 없습니다.'
                    : filter === 'active'
                    ? '진행 중인 항목이 없습니다.'
                    : '할 일을 추가해보세요!'}
                </p>
              ) : (
                <ul className="flex flex-col gap-2">
                  {filtered.map((todo) => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      onToggle={toggleTodo}
                      onDelete={deleteTodo}
                    />
                  ))}
                </ul>
              )}

              {counts.completed > 0 && (
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={clearCompleted}
                    className="text-xs text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                  >
                    완료된 항목 모두 삭제 ({counts.completed})
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
