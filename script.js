const form = document.querySelector('form'); // pega todo o formulario
const feedback = document.querySelector('span'); //para mensagens de erro ou sucesso

//array para pegar cada campo
const campos = [
  document.querySelector('#nome'),
  document.querySelector('#email'),
  document.querySelector('#telefone'),
  document.querySelector('#servico'),
  document.querySelector('#mensagem'),
];

//loop que define o que fazer em cada campo
campos.forEach((campo) => {
  //ao digitar no campo, remove a borda vermelha
  campo.addEventListener('input', () => {
    campo.classList.remove('error');

    //remove a mensagem de "erro", quando preenche todos os campos
    if (document.querySelectorAll('.error').length === 0) {
      feedback.style.display = 'none';
    }
  });
});

//evento de envio de formulario
form.addEventListener('submit', (e) => {
  e.preventDefault(); // evitar que a página valide automaticamente e envie campos vazios

  let temErro = false; // valida que os campos nao tem erro, antes do loop verificar
  campos.forEach((campo) => {
    campo.classList.remove('error'); //limpa as bordas vermelhas antes de revalidar

    const valor = campo.value.trim(); //pega o valor de cada campo e limpa espaços desnecessariios

    //condição para cada campo vazio, de acordo com os regex de validacao correspondente
    if (!valor) {
      temErro = true;
      campo.classList.add('error');
    }
    // se tiver preenchido o email e telefone mas nao com as regras do regex, mostra o erro
    else if (campo.id === 'email' && !/\S+@\S+\.\S+/.test(valor)) {
      temErro = true;
      campo.classList.add('error');
    } else if (
      campo.id === 'telefone' &&
      valor.replace(/\D/g, '').length < 11
    ) {
      temErro = true;
      campo.classList.add('error');
    }
    console.log(valor); //ver os dados enviados no console
  });

  //validação total pra ver se ira mensagem de erro ou de sucesso
  if (temErro) {
    feedback.style.display = 'block';
    feedback.textContent = 'Preencha os campos corretamente!';
    feedback.style.color = 'red';
  } else {
    feedback.style.display = 'block';
    feedback.textContent = 'Formulário enviado com sucesso!';
    feedback.style.color = 'green';

    //reseta todo o formulario apos envia-lo
    form.reset();
  }
});
