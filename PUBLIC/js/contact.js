document.addEventListener('DOMContentLoaded', () => {
    const phoneInput = document.getElementById('phone');

    phoneInput.addEventListener('input', (event) => {
        let input = event.target.value.replace(/\D/g, '');
        input = input.replace(/^(\d{2})(\d{5})(\d{4}).*/, '+55 $1 $2-$3');
        event.target.value = input;
    });

    const form = document.getElementById('contact-form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            message: formData.get('message'),
        };

        const response = await fetch('/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert('Mensagem enviada com sucesso!');
            form.reset();
        } else {
            alert('Houve um erro ao enviar a mensagem. Tente novamente.');
        }
    });
});
