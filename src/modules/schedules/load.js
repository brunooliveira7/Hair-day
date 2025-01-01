import { scheduleFetchByDay } from "../../services/schedule-fetch-by-day.js";
import { scheduleShow } from "../schedules/show.js";
import { hoursLoad } from "../form/hours-load.js";

//seleciona o input de data
const selectedDate = document.getElementById("date");

//carrega o agendamento do dia
export async function scheduleDay() {
  //obtém a data do input
  const date = selectedDate.value;

  //buscar na API os agendamentos do dia
  const dailySchedules = await scheduleFetchByDay({ date });

  //exibe os agendamentos do dia
  scheduleShow({ dailySchedules });

  //renderiza as horas disponíveis
  hoursLoad({ date, dailySchedules });
}
