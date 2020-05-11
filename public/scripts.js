const ul = document.querySelector('ul');
const input = document.querySelector('input');
const form = document.querySelector('form');

loadDataUrls();

async function loadDataUrls() {
    const response = await fetch('http://localhost:3001')
        .then((data) => data.json());
    
    response.urls.forEach(element => addElement(element));
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

    saveUrl({ name, url });
});

async function saveUrl({ name, url }) {
    const requestData = {
        method: 'POST',
        body: JSON.stringify({name: name, url: url})
    };

    await fetch('http://localhost:3001', requestData)
    .then((response) => {
        if (response.ok) {
            input.value = "";
            addElement({ name, url });
        } else {
            alert('Error on save this URL');
        }
    });
}

function addElement({name, url}) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    const trash = document.createElement('span');

    a.href = url;
    a.innerHTML = name;
    a.target = '_blank';

    trash.innerHTML = 'x';
    trash.setAttribute('data-url', url);
    trash.onclick = () => deleteUrl(trash);

    li.append(a);
    li.append(trash);
    ul.append(li);
}

async function deleteUrl(element) {
    const url = element.dataset.url;
    const requestUrl = `http://localhost:3001?url=${url}`;

    await fetch(`http://localhost:3001?url=${url}`, { method: 'DELETE' })
    .then((response) => {
        if (response.ok) {
            removeElement(element);
        } else {
            alert('Error on delete this URL');
        }
    });
} 

function removeElement(element) {
    if (confirm('Do you really wanna delete this URL?')) {
        element.parentNode.remove();
    }
}
