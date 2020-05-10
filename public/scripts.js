const ul = document.querySelector('ul');
const input = document.querySelector('input');
const form = document.querySelector('form');

function addElement({name, url}) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    const trash = document.createElement('span');

    a.href = url;
    a.innerHTML = name;
    a.target = '_blank';

    trash.innerHTML = 'x';
    trash.onclick = () => removeElement(trash)

    li.append(a)
    li.append(trash)
    ul.append(li)
}

function removeElement(element) {
    if (confirm('Do you really wanna delete this URL?')) {
        element.parentNode.remove()
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    let { value } = input;

    if (!value) {
        return alert('Input is empty!');
    }

    const [name, url] = value.split(',');

    if (!url) {
        return alert('URL in wrong format!');
    }
    
    if (!/^http/.test(url)) {
        return alert('Invalid url!');
    }

    addElement({ name, url });
    input.value = "";
});