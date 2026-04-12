const donateForm = document.getElementById('donateForm');
const formMessage = document.getElementById('formMessage');

donateForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const amount = document.getElementById('amount').value;

  if (!name || !email || !amount) {
    formMessage.textContent = 'Please complete all fields before donating.';
    formMessage.style.color = '#e53e3e';
    return;
  }

  formMessage.textContent = `Thank you, ${name}! Your donation of $${amount} helps us save more animals.`;
  formMessage.style.color = '#2f855a';
  donateForm.reset();
});
