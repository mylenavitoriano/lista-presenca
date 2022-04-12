import React, { useState, useEffect } from 'react';
import './style.css'

import { Card } from '../../componentes/Card';

export function Home() {

  const [studentName, setStudentName] = useState('');
  const [students, setStudents] = useState([]);
  const [user, setUser] = useState({name: '', avatar: ''});

  function handleAddstudent(){
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString('pt-br', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    };

    setStudents(prevState => [...prevState, newStudent]);
    //spredOperator
    //o '...prevstate' mantem o valor que já tinha no array e só adiciona o novo valor, como se fosse o '.push()'
    setStudentName('');
  }

  //é chamado assim que a aplicação é renderizada
  useEffect(() => {
    //corpo do useEffect (ações)
    fetch('https://api.github.com/users/mylenavitoriano')
    .then(response => response.json())
    .then(data => {
      setUser({
        name: data.name, 
        avatar: data.avatar_url
      })
    })
  }, [])
    //[] - estados que o useEffect depende, ou seja, a cada vez que o estado for modificado, ele será chamado

  return (
    <div className='container'>
      <header>
        <h1>Lista de Presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="foto de perfil"/>
        </div>
      </header>

      <input 
        type="text" 
        placeholder="Digite o nome..."
        onChange={event => setStudentName(event.target.value)}
        value={studentName}
      />

      <button type="button" onClick={handleAddstudent}>Adicionar</button>

      {
        students.map(student => (
          <Card 
            key={student.time}
            name={student.name} 
            time={student.time} 
          />
        
        ))
      }
    </div>
  )
}