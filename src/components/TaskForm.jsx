import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { CreateTaskDb, updateTaskDb } from '../redux/taskThunks';

export const TaskForm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const { id } = useParams();
  const tasks = useSelector(state => state.tasks.list);
  const [task, setTask] = useState({
    title: '',
    description: ''
  });

  useEffect(() => {
    if (id) {
      const data = tasks.find(t => t.id == id)
      console.log(data);
      setTask(data);
    }
  }, [id, tasks]);


  const handleChange = e => {
    setTask({ ...task, [e.target.name]: e.target.value })
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      dispatch(updateTaskDb(task))
    } else {
      dispatch(CreateTaskDb(task));
    }
    navigation('/');
  }

  return (
    <form className='bg-zinc-800 max-w-sm p-4 mb-1 rounded-md'>
      <label htmlFor="title" className='block text-sm font-bold'>Task:</label>
      <input name='title' value={task.title} onChange={handleChange} type="text" placeholder="title" className='w-full p-2 rounded-md bg-zinc-600 mb-2' />
      <label htmlFor="descrption" className='block text-sm font-bold'>Description:</label>
      <textarea name='description' value={task.description} onChange={handleChange} placeholder='description' className='w-full p-2 rounded-md bg-zinc-600 mb-2' ></textarea>
      <button type='submit' className='bg-indigo-600 px-2 py-1 rounded-sm text-sm' onClick={handleSubmit}>Save</button>
    </form>
  )
}
