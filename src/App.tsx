import TaskCalendar from "./components/TaskCalendar/TaskCalendar";
import "primeicons/primeicons.css";
import { Task } from "./types/task";
import "./App.css";

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
      "Livraison finale  sdqsd dqsd qsdqsdqsdqsdqs  qsdqs dqsdqs dqsd qd qs dqsd qsdqs  dqsdqsd qs dqsd ",
    date: new Date("2025-04-04"),
  },
];

const getMonday = (date: Date) => {
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  const monday = new Date(date);
  monday.setDate(date.getDate() + diff);
  return monday;
};

function App() {
  return (
    <div className="app-container">
      <TaskCalendar tasks={tasks} startDate={getMonday(new Date())} />
    </div>
  );
}

export default App;
