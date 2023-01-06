import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeTask } from '../redux/taskSlice';
import { DeleteTaskDb, fetchTasks } from '../redux/taskThunks';

export const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.list);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(DeleteTaskDb(id));
  }
  return (
    <div className='w-4/6 '>
      <header className='flex justify-between items-center py-4'>
        <h1> Pending tasks: {tasks.length}</h1>
        <Link className='bg-indigo-600 px-2 py-1 rounded-sm text-sm' to='/create-task'>Create Task</Link>
      </header>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {tasks && tasks.map(t => (
          <div key={t.id} className="bg-neutral-800 p-4 rounded-md">
            <header className='flex justify-between'>
              <h3>{t.title}</h3>
              <div className='flex gap-x-2'>
                <Link className='bg-zinc-600 px-2 py-1 text-xs rounded-md' to={`/edit-task/${t.id}`}>Edit</Link>
                <button className='bg-red-500 px-2 py-1 rounded-md text-xs' onClick={() => handleRemove(t.id)}>Remove</button>
              </div>

            </header>

            <p>{t.description}</p>

          </div>
        ))}
      </div>

    </div>
  )
}
