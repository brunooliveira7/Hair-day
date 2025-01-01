import dayjs from "dayjs";

//seleciona as sessões manhã tarde e noite
const periodMorning = document.getElementById("period-morning");
const periodAfternoon = document.getElementById("period-afternoon");
const periodNight = document.getElementById("period-night");

export function scheduleShow({ dailySchedules }) {
  try {
    //limpa as listas
    periodMorning.innerHTML = "";
    periodAfternoon.innerHTML = "";
    periodNight.innerHTML = "";

    //renderiza os agendamentos por período
    dailySchedules.forEach((schedule) => {
      const item = document.createElement("li");
      const time = document.createElement("strong");
      const name = document.createElement("span");

      //adiciona o id do agendamento
      item.setAttribute("data-id", schedule.id);

      time.textContent = dayjs(schedule.when).format("HH:mm");

      name.textContent = schedule.name;

      //cria o ícone de cancelar o agendamento
      const cancelIcon = document.createElement("img");
      cancelIcon.classList.add("cancel-icon");
      cancelIcon.setAttribute("src", "./src/assets/cancel.svg");
      cancelIcon.setAttribute("alt", "Cancelar");

      //adiciona o tempo, nome e ícone de cancelar no item
      item.append(time, name, cancelIcon);

      //obtém somente a hora do agendamento
      const hour = dayjs(schedule.when).hour();

      //renderiza os agendamentos na sessão (manhã, tarde ou noite)
      if (hour <= 12) {
        periodMorning.appendChild(item);
      } else if (hour > 12 && hour <= 18) {
        periodAfternoon.appendChild(item);
      } else {
        periodNight.appendChild(item);
      }
    });
    
  } catch (error) {
    console.log(error);
    alert("Não foi possível exibir os agendamentos");
  }
}
