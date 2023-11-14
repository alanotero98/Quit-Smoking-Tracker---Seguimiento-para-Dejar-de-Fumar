import React, { useState, useEffect } from 'react';
import './ToDoLisst.css';
import { LuCigaretteOff } from "react-icons/lu";

const ToDoList = () => {
    const [days, setDays] = useState(() => {
        try {
          const storedDays = JSON.parse(localStorage.getItem('quittingSmokingDays'));
          return storedDays || [];
        } catch (error) {
          console.error('Error al cargar datos desde localStorage:', error);
          return [];
        }
      });
    
      const [inputDay, setInputDay] = useState('');
      const [inputCigarettes, setInputCigarettes] = useState('');
    
      useEffect(() => {
        try {
          localStorage.setItem('quittingSmokingDays', JSON.stringify(days));
          console.log('Los datos en el localStorage son: ', days);
        } catch (error) {
          console.error('Error al guardar datos en localStorage:', error);
        }
      }, [days]);
    
      const addEntry = () => {
        if (inputDay.trim() !== '' && inputCigarettes.trim() !== '' && !isNaN(inputCigarettes)) {
          const newEntry = { day: inputDay, cigarettes: parseInt(inputCigarettes, 10) };
          const updatedDays = [...days, newEntry];
          setDays(updatedDays);
          setInputDay('');
          setInputCigarettes('');
        }
      };
    
      const updateCigarettes = (index, newCigarettes) => {
        const updatedDays = [...days];
        updatedDays[index].cigarettes = newCigarettes;
        setDays(updatedDays);
      };

      const deleteCard = (index) => {
        const updatedDays = [...days];
        updatedDays.splice(index, 1);
        setDays(updatedDays);
      };


      // Función para obtener el día de la semana a partir de una fecha en formato yyyy-MM-dd
function obtenerDiaSemana(fechaString) {
    const diasSemana = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
    // Parsear la fecha
    const fecha = new Date(fechaString);
  
    // Obtener el día de la semana (0 = Domingo, 1 = Lunes, ..., 6 = Sábado)
    const indiceDia = fecha.getDay();
  
    // Obtener el nombre del día de la semana
    const diaSemana = diasSemana[indiceDia];
  
    return diaSemana;
  }
    
    return (
      <div className='componente'>
        <h1>Quitting smoking <LuCigaretteOff className='icono'/></h1>
        <div className='form'>
          <label>Day of the week: </label>
          <input
            type="date"
            value={inputDay}
            onChange={(e) => setInputDay(e.target.value)}
            placeholder="Enter day..."
          />
          <label>Cigarettes: </label>
          <input
            type="text"
            value={inputCigarettes}
            onChange={(e) => setInputCigarettes(e.target.value)}
            placeholder="Enter cigarettes..."
          />
        </div>
          <button className='add' onClick={addEntry}>Add</button>
        <div className='containerOfCards'>
          {days.map((entry, index) => (
            <div key={index} className="card">
                <h3>{obtenerDiaSemana(entry.day)}</h3>
              <h5>{entry.day}</h5>
              <p>Cigarettes: {entry.cigarettes}</p>
              <div>
              
                <input
                  className='modifyCigarettes'
                  type="number"
                  value={entry.cigarettes}
                  onChange={(e) => updateCigarettes(index, parseInt(e.target.value, 10))}
                />
              </div>
              <button className="delete" onClick={() => deleteCard(index)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    );
  };

export default ToDoList;
