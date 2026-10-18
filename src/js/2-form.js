const STORAGE_KEY = 'feedback-form-state';
const formData = {
    email: '',
    message: '',
};
const form = document.querySelector('.feedback-form');
populateForm();
form.addEventListener("input", onFormInput);
form.addEventListener("submit", onFormSubmit);
function onFormInput(event) {
    formData[event.target.name] = event.target.value.trim();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}
function populateForm() {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
        try {
            const parsedData = JSON.parse(savedData);
            formData.email = parsedData.email || '';
            formData.message = parsedData.message || '';
            form.elements.email.value = formData.email;
            form.elements.message.value = formData.message;
        } catch (error) {
            console.error('Помилка парсингу даних з localStorage:', error);
        }
    }
};
function onFormSubmit(event) {
    event.preventDefault();
    if(formData.email === '' || formData.message === '') {
        alert('Будь ласка, заповніть всі поля.');
        return;
    }
    console.log(formData);
    localStorage.removeItem(STORAGE_KEY);
    form.reset();
    formData.email = '';
    formData.message = '';
}