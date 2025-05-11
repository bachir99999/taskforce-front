import { Task } from "../../types/task";
import { format, subWeeks, startOfWeek, endOfWeek, getISOWeek } from "date-fns";

export function countStatuses(tasks: Task[]): Record<string, number> {
  const statusCounts: Record<string, number> = {};

  tasks.forEach((task) => {
    statusCounts[task.status] = (statusCounts[task.status] || 0) + 1;
  });

  return statusCounts;
}

function convertDateToMonth(date: Date): string {
  return date.toLocaleString("default", { month: "long" });
}


export function getLast12Months(): string[] {
const months = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre"
];
  const result: string[] = [];
  const currentMonth = new Date().getMonth(); 

  for (let i = 0; i < 12; i++) {
    const monthIndex = (currentMonth - i + 12) % 12; // Calcul pour revenir en arrière
    result.unshift(months[monthIndex]); // Ajoute le mois au début du tableau
  }

  return result;
}


export function getLast12MonthsData(tasks: Task[]): { month: string; count: number }[] {
  const monthCounts: Record<string, number> = {};
  const months = getLast12Months();

  tasks.filter((task) => {
    const taskDate = new Date(task.dueDate); 
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1); 
    return taskDate >= oneYearAgo;
    }).forEach((task) => {
        monthCounts[convertDateToMonth(task.dueDate)] = (monthCounts[convertDateToMonth(task.dueDate)] || 0) + 1;
    });

  return months.map((month) => ({
    month,
    count: monthCounts[month] || 0, 
  }));
}


export function getLast8Weeks(): { start: string; end: string; weekNumber: number }[] {
  const weeks: { start: string; end: string; weekNumber: number }[] = [];
  const today = new Date();

  for (let i = 0; i < 8; i++) {
    const start = startOfWeek(subWeeks(today, i), { weekStartsOn: 1 }); // Lundi
    const end = endOfWeek(subWeeks(today, i), { weekStartsOn: 1 }); // Dimanche
    const weekNumber = getISOWeek(start); // Numéro de la semaine ISO

    weeks.unshift({
      start: format(start, "yyyy-MM-dd"),
      end: format(end, "yyyy-MM-dd"),
      weekNumber, 
    });
  }

  return weeks;
}

export function getLast8WeeksDataByStatus(tasks: Task[]): { week: string; todo: number; in_progress: number; done: number }[] {
  const weeks = getLast8Weeks(); 


  const weekData = weeks.map((week) => ({
    week: `${week.start} - ${week.end}`,
    todo: 0,
    in_progress: 0,
    done: 0,
  }));

  tasks.forEach((task) => {
    const taskDate = new Date(task.dueDate);

    const matchingWeek = weekData.find(
      (week) => taskDate >= new Date(week.week.split(" - ")[0]) && taskDate <= new Date(week.week.split(" - ")[1])
    );

    if (matchingWeek) {
      if (task.status === "TODO") {
        matchingWeek.todo += 1;
      } else if (task.status === "IN_PROGRESS") {
        matchingWeek.in_progress += 1;
      } else if (task.status === "DONE") {
        matchingWeek.done += 1;
      }
    }
  });

  return weekData;
}