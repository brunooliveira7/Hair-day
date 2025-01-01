import dayjs from "dayjs";
import { openingHours } from "../../utils/opening-hours.js";
import { hoursClick } from "./hours-click.js";

//ul
const hours = document.getElementById("hours");

export function hoursLoad({ date, dailySchedules }) {
  //limpa a lista de horários
  hours.innerHTML = "";

  //Obtém a lista de horários ocupados, e verifica se existem agendamentos no horário
  const unavailableHours = dailySchedules.map((schedule) =>
    dayjs(schedule.when).format("HH:mm")
  );

  //percorre as horas disponíveis no array
  const opening = openingHours.map((hour) => {
    //recupera somente a hora desestruturando o array(pega  o primeiro elemento)
    const [schedulesHour] = hour.split(":");

    //adiciona a hora na data e verifica se está no passado
    const isHourPast = dayjs(date).add(schedulesHour, "hour").isBefore(dayjs());

    const available = !unavailableHours.includes(hour) && !isHourPast;

    //define se o horário está disponível
    return {
      hour,
      available,
    };
  });
  //renderiza os horários
  opening.forEach(({ hour, available }) => {
    const li = document.createElement("li");

    li.classList.add("hour");
    li.classList.add(available ? "hour-available" : "hour-unavailable");

    li.textContent = hour;

    if (hour === "9:00") {
      hourHeaderAdd("Manhã");
    } else if (hour === "13:00") {
      hourHeaderAdd("Tarde");
    } else if (hour === "18:00") {
      hourHeaderAdd("Noite");
    }

    hours.append(li);
  });
  //adiciona o evento de click nos horários disponíveis - marcado
  hoursClick();
}

function hourHeaderAdd(title) {
  const header = document.createElement("li");

  header.classList.add("hour-period");

  header.textContent = title;

  hours.append(header);
}