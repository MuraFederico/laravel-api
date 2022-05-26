/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');


const confirmationOverlay = document.querySelector('#confirmation-overlay');
if (confirmationOverlay) {
    const confirmationForm = confirmationOverlay.querySelector('form');
    document.querySelectorAll('.btn-delete').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.closest('tr').dataset.id;
            console.log(id)
            const strAction = confirmationForm.dataset.base.replace(/(\b0\b)(?!.*\1)/, id);
            console.log(strAction)
            confirmationForm.action = strAction;
            confirmationOverlay.classList.remove('d-none');
        })
    });

    const btnNo = document.querySelector('#btn-no');
    btnNo.addEventListener('click', function() {
        confirmationForm.action = '';
        confirmationOverlay.classList.add('d-none');
    });

}
