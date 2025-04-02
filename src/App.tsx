import { useState } from "react";
import { Calendar } from "primereact/calendar";
import TaskCalendar from "./components/TaskCalendar/TaskCalendar";
import "primeicons/primeicons.css";
import { Task } from "./types/task";
import "./App.css";
import { Button } from "primereact/button";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";

const tasks: Task[] = [
  {
    id: 1,
    title: "Faire le rapport",
    status: "TODO",
    description: "Rapport trimestriel",
    date: new Date("2025-03-31"),
  },
  {
    id: 2,
    title: "Réunion client",
    status: "En cours",
    description: "Discussion projet",
    date: new Date("2025-04-01"),
  },
  {
    id: 3,
    title: "Livrer le produit",
    status: "Terminé",
    description:
      "Livraison finale sdqsd dqsd qsdqsdqsdqsdqs qsdqs dqsdqs dqsd qd qs dqsd qsdqs dqsdqsd qs dqsd ",
    date: new Date("2025-04-04"),
  },
];

const getMonday = (date: Date) => {
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day; // Ajuster si dimanche
  const monday = new Date(date);
  monday.setDate(date.getDate() + diff);
  return monday;
};

function App() {
  const [startDate, setStartDate] = useState(getMonday(new Date()));
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const prevWeek = () => {
    setStartDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(newDate.getDate() - 7);
      return newDate;
    });
  };

  const nextWeek = () => {
    setStartDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(newDate.getDate() + 7);
      return newDate;
    });
  };

  const onDateChange = (e: any) => {
    if (e.value) {
      setSelectedDate(e.value);
      setStartDate(getMonday(e.value));
    }
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <div className="app-container">
              <TaskCalendar tasks={tasks} startDate={startDate} />
              <div className="calendar-controls">
                <Button icon="pi pi-chevron-left" onClick={prevWeek} />
                <Calendar
                  value={selectedDate}
                  onChange={onDateChange}
                  dateFormat="dd/mm/yy"
                  className="week-selector"
                />
                <Button icon="pi pi-chevron-right" onClick={nextWeek} />
              </div>
            </div>
          }
        />
        <Route path="/stats" element={<h1>Statistiques</h1>} />
        <Route path="/user" element={<h1>Mon profile</h1>} />
      </Routes>
    </>
  );
}

export default App;
