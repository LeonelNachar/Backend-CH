const socket = io.connect();

const addProduct = document.getElementById('addProduct');
addProduct.addEventListener('submit', e => {
    e.preventDefault()
    const producto = {
        title: addProduct[0].value,
        price: addProduct[1].value,
        thumbnail: addProduct[2].value
    }
    socket.emit('update', producto);
    addProduct.reset()
});

socket.on('productos', productos => {
    htmlList(productos).then(html => {
        document.getElementById('productos').innerHTML = html
    })
});

async function htmlList(productos) {
    const respuesta = await fetch("plantillas/tProductos.hbs");
    const plantilla = await respuesta.text();
    const template = Handlebars.compile(plantilla);
    const html = template({ productos });
    return html;
}

const inpUsername = document.getElementById('inpUsername');
const inpMensaje = document.getElementById('inpMensaje');
const btnEnviar = document.getElementById('btnEnviar');

const publicarMensaje = document.getElementById('publicarMensaje');
publicarMensaje.addEventListener('submit', e => {
    e.preventDefault()
    const mensaje = { autor: inpUsername.value, texto: inpMensaje.value }
    socket.emit('nuevoMensaje', mensaje);
    publicarMensaje.reset()
    inpMensaje.focus()
})

socket.on('mensajes', mensajes => {
    console.log(mensajes)
    const html = htmlMsg(mensajes)
    document.getElementById('mensajes').innerHTML = html;
})

function htmlMsg(mensajes) {
    return mensajes.map(mensaje => {
        return (`
        <div>
            <b>${mensaje.autor}</b>
            <span>${mensaje.fyh}</span>:
            <p>${mensaje.texto}</p>
        </div>
        `)
    }).join(" ");
}

inpUsername.addEventListener('input', () => {
    const email = inpUsername.value.length
    const rText = inpMensaje.value.length
    inpMensaje.disabled = !email
    btnEnviar.disabled = !email || !rText
})

inpMensaje.addEventListener('input', () => {
    const rText = inpMensaje.value.length
    btnEnviar.disabled = !rText
})

