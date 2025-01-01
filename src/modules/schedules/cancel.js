import { scheduleDay } from "./load.js";
import { scheduleCancel } from "../../services/schedule-cancel.js";

const periods = document.querySelectorAll(".period");

//gera evento de click para cada lista (manhã, tarde, noite)
periods.forEach((period) => {
  //captura o evento de click na lista
  period.addEventListener("click", async (event) => {
    if (event.target.classList.contains("cancel-icon")) {
      //obtém a li pai do elemento clicado
      const item = event.target.closest("li");

      //captura o id do agendamento para remover
      const { id } = item.dataset;

      //verifica se o id foi selecionado
      if (id) {
        //confirmar se o usuário deseja cancelar o agendamento
        const isConfirm = confirm("Deseja cancelar o agendamento?");

        //se o usuário confirmar, chama a função de cancelamento
        if (isConfirm) {
          //faz a requisição de cancelamento na API
          await scheduleCancel({ id });
          //recarrega a página para atualizar a lista de agendamentos
          scheduleDay();
        }
      }
    }
  });
});
