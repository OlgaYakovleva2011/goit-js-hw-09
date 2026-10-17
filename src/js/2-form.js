const formState = {
    email: '',
    message: '',
};
const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';
function populateForm() {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (!savedData) return;
    try {
        const parsedData = JSON.parse(savedData);
        formState.email = parsedData.email || '';
        formState.message = parsedData.message || '';
        form.elements.email.value = formState.email;
        form.elements.message.value = formState.message;
    } catch (error) {
        console.error('Помилка парсингу даних з localStorage:', error);
    }
}
populateForm();
form.addEventListener('input', event => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value.trim();
    formState[fieldName] = fieldValue;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formState));
});
form.addEventListener('submit', event => {
    event.preventDefault();
    const emailValue = form.elements.email.value.trim();
    const messageValue = form.elements.message.value.trim();
    if (!emailValue || !messageValue) {
        alert('Будь ласка, заповніть всі поля форми.');
        return;
    }
    console.log(formState);
    localStorage.removeItem(STORAGE_KEY);
    formState.email = '';
    formState.message = '';
    form.reset();
});