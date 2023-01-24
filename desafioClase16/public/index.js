const socket = io()

const addProd = document.getElementById('addProduct')
const forName = document.getElementById('nombre')
const price = document.getElementById('precio')
const image = document.getElementById('imagen')
const prods = document.getElementById('productos')

addProd.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = forName.value
    const precio = price.value
    const imagen = image.value
    const nProd = {
        title, precio, imagen
    }

    socket.emit('nProd', nProd)
    forName.value = '';
    price.value = '';
    image.value = '';
})

socket.on('productos', (productos) => {
    console.log(productos);

    fetch('productos.hbs')
        .then((data) => data.text())
        .then((serverTemplate) => {
            const template = Handlebars.compile(serverTemplate);
            const html = template({productos})
            return html
        })
})

const chatF = document.getElementById('publicarMensaje')
const emailI = document.getElementById('inpEmail')
const textI = document.getElementById('inpMensaje')

chatF.addEventListener('submit', (e) => {
    e.preventDefault();
    const userEmail = emailI.value;
    const mensaje = textI.value;
    socket.emit('new-message', {mensaje, userEmail});

    emailI.value = userEmail;
    textI.value = '';
})

    socket.on('chat-message', (data) => {
        const userEmail = data.email
        const mensaje = data.text
        document.getElementById('mensajes').innerHTML = `<p style='color: grey><span style="color: blue">${userEmail}</span>
        <span style="color: black">[${data.time}]:</span>
        <span style="color: yellow"><i>${mensaje}</i></span></p>;
        `
    });

    socket.on("mensajes") , (data) => {
        const html = data.map((userEmail) => {
            let render = `
            <p><b><span style="color: blue">${userEmail.email}</span></b>
            <span style="color: gray">[${userEmail.date}]:</span>
            <span style="color: yellow"><i>${userEmail.mensaje}</i></span>
            </p>
            `;
            return render
        })
        .join('\n')
        document.getElementById("mensajes").innerHTML = html;
        console.log(data)

    }