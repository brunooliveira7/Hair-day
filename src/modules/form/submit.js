import dayjs from "dayjs";
import { scheduleNew } from "../../services/schedule-new.js";
import { scheduleDay } from "../schedules/load.js";

const form = document.querySelector("form");
const selectedDate = document.getElementById("date");
const clientName = document.getElementById("client");

//data atual para formatar o input
const inputToday = dayjs(new Date()).format("YYYY-MM-DD");

//carrega a data atual
selectedDate.value = inputToday;
//defini a data mínima como a data atual
selectedDate.min = inputToday;

//ao clicar no botão de agendar
form.onsubmit = async (event) => {
  event.preventDefault();

  try {
    //recupera o nome do cliente
    const name = clientName.value.trim();

    //verifica se o nome foi informado
    if (!name) {
      return alert("Informe o nome do cliente");
    }

    //recupera o horário selecionado - li
    const hourSelected = document.querySelector(".hour-selected");

    //verifica se o horário foi selecionado
    if (!hourSelected) {
      return alert("Selecione um horário");
    }

    //recupera somente a hora
    const [hour] = hourSelected.innerText.split(":");

    //insere a hora na data
    const when = dayjs(selectedDate.value).add(hour, "hour");

    //gera um id
    const id = new Date().getTime();

    //faz o agendamento
    await scheduleNew({
      id,
      name,
      when,
    });

    //recarrega os agendamentos
    await scheduleDay();
    
    //limpa o input de nome do cliente
    clientName.value = "";

  } catch (error) {
    alert("Não foi possível realizar o agendamento");
    console.log(error);
  }
};
