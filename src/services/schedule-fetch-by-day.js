import dayjs from "dayjs";
import { apiConfig } from "./api-config";

export async function scheduleFetchByDay({ date }) {
  try {
    //fazendo a requisição para a API
    const response = await fetch(`${apiConfig.baseURL}/schedules`);

    //convertendo a requisição em JSON
    const data = await response.json();

    //filtra os agendamentos pelo dia selecionado
    const dailySchedules = data.filter((schedule) =>
      dayjs(date).isSame(schedule.when, "day")
    );

    return dailySchedules;
  } catch (error) {
    console.log(error);
    alert("Não foi possível buscar os agendamentos do dia selecionado.");
  }
}
