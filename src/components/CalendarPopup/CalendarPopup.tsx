import { Calendar } from "primereact/calendar";
import { addLocale } from "primereact/api";
import { Task } from "../../types/task";
import "./CalendarPopup.css";

interface CalendarPopupProps {
  date: Date;
  handleChange: (field: keyof Task, value: any) => void;
}

addLocale("fr", {
  firstDayOfWeek: 1, // Lundi
  dayNames: [
    "dimanche",
    "lundi",
    "mardi",
    "mercredi",
    "jeudi",
    "vendredi",
    "samedi",
  ],
  dayNamesShort: ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."],
  dayNamesMin: ["D", "L", "M", "M", "J", "V", "S"],
  monthNames: [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ],
  monthNamesShort: [
    "janv.",
    "févr.",
    "mars",
    "avr.",
    "mai",
    "juin",
    "juil.",
    "août",
    "sept.",
    "oct.",
    "nov.",
    "déc.",
  ],
  today: "Aujourd’hui",
  clear: "Effacer",
  dateFormat: "dd/mm/yy",
  weekHeader: "Sem.",
});

function CalendarPopup({ date, handleChange }: CalendarPopupProps) {
  return (
    <Calendar
      value={date}
      locale="fr"
      onChange={(e) => handleChange("date", e.target.value)}
      showButtonBar
    />
  );
}

export default CalendarPopup;
