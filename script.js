document.addEventListener("DOMContentLoaded", () => {
    const custom = document.querySelector('.custom');
    const buttons = document.querySelectorAll('.option');
    const inputs = document.querySelectorAll('.input');
    const reset = document.querySelector('#reset');
    
    let tipResult = document.querySelector('.tip-result');
    let totalResult = document.querySelector('.total-result');

    let tip = null;
    let ready = [false, false, false];
    let bills = [null, null];

    tipResult.innerHTML = '0.00';
    totalResult.innerHTML = '0.00';

    reset.classList.add('disable');
    reset.style['pointer-events'] = 'none';

    buttons.forEach(button => {
        button.onclick = () => {
            custom.value = '';
            custom.removeAttribute('id');

            button.classList.toggle('active');

            ready[2] = true;
            tip = button.dataset.tip;

            if (button.classList.contains('active')) {
                button.classList.remove('hover');
            }
            else {
                button.classList.add('hover');
                tip = null;
                ready[2] = false;
            }

            buttons.forEach(element => {
                if (element === button) return;
                element.classList.remove('active');
                element.classList.add('hover');
            });
        }
    });

    custom.onkeyup = () => {

        if ((custom.value <= 100 && custom.value >= 0) && custom.value) {
            tip = custom.value;
            custom.removeAttribute('id');
            ready[2] = true;
        }
        else if (!custom.value) {
            tip = null;
            ready[2] = false;
            custom.removeAttribute('id');
        }
        
        else {
            tip = null;
            custom.setAttribute('id', 'warning');
            ready[2] = false;
        }
        buttons.forEach(element => {
            element.classList.remove('active');
            element.classList.add('hover');
        });
    }

    inputs.forEach(input => {
        input.onkeyup = () => {
            input.parentElement.classList.remove('msg');
            // check validity
            if (input.value > 0) {
                bills[input.dataset.index] = input.value;
                input.removeAttribute('id');
                ready[input.dataset.index] = true;
            }
            else if (!input.value) {
                bills[input.dataset.index] = null;
                ready[input.dataset.index] = false;
                input.removeAttribute('id');
            }
            // if not valid add warning id
            else {
                bills[input.dataset.index] = null;
                input.setAttribute('id', 'warning');
                input.parentElement.classList.add('msg');
                ready[input.dataset.index] = false;
            }
        }
    });
    
    function checkReset() {
        if (tip != null && bills[0] != null && bills[1] != null) {
            tipResult.innerHTML = `${(bills[0] * tip / 100 / bills[1]).toFixed(2)}`;
            totalResult.innerHTML = `${((bills[0] * tip / 100 / bills[1]) + (bills[0] / bills[1])).toFixed(2)}`;
        }
        else {
            tipResult.innerHTML = '0.00';
            totalResult.innerHTML = '0.00';
        }

        if ((ready[0] || ready[1] || ready[2]) && custom.getAttribute('id') !== 'warning') {
            reset.style['pointer-events'] = 'all';
            reset.classList.remove('disable');
        }
        else {
            reset.style['pointer-events'] = 'none';
            reset.classList.add('disable');
        }

        console.log(tip);
        console.log(bills);
        console.log(ready);
    }

    document.body.onkeyup = checkReset;
    document.body.onclick = checkReset;

    reset.onclick = () => {
        custom.value = '';
        inputs.forEach(input => {
            input.value = '';
        });
        buttons.forEach(button => {
            button.classList.remove('active');
        })
        tip = null;
        ready = [false, false, false];
        bills = [null, null];
    }
});
