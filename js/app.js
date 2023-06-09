
let articulosCarrito = [];

const listaProductos = document.querySelector("#lista-productos"); 
const contenedorCarrito = document.querySelector('#lista-carrito tbody'); 
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); 
const carrito = document.querySelector('#carrito'); 

function leerDatosProducto(producto){ 
    const infoProducto = {
        imagen: producto.querySelector('img').src, 
        titulo: producto.querySelector('h4').textContent, 
        precio: producto.querySelector('.precio').textContent, 
        id: producto.querySelector('a').getAttribute('data-id'), 
        cantidad: 1 
    }

    if(articulosCarrito.some( producto => producto.id === infoProducto.id)){
        const productos = articulosCarrito.map( producto => { 
            if(producto.id === infoProducto.id){ 
                let cantidad = parseInt(producto.cantidad); 
                cantidad +=1; 
                producto.cantidad = cantidad; 
                return producto 
            }else {
                return producto 
            }
        })
        
        articulosCarrito = [...productos]
    } else {
        articulosCarrito = [...articulosCarrito, infoProducto] 
    }
    
    carritoHTML()
}

function carritoHTML(){
    vaciarCarrito(); 
    articulosCarrito.forEach( producto => { 
        const row = document.createElement('tr'); 
        
        row.innerHTML = `
            <td>
                <img src="${producto.imagen}" width="100"/>
            </td>
            <td>${producto.titulo}</td>
            <td>${producto.precio}</td>
            <td>${producto.cantidad}</td>
            <td>
                <a href="#" class="borrar-producto" data-id="${producto.id}">X</a>
            </td>
        `;
        contenedorCarrito.appendChild(row); 
    })
    
    sincronizarStorage();
}

function sincronizarStorage(){
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito))
}

function vaciarCarrito(){ 
    while(contenedorCarrito.firstChild) { 
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}

function agregarProducto(evt){ 
    evt.preventDefault() 

    if(evt.target.classList.contains('agregar-carrito')) { 
        const producto = evt.target.parentElement.parentElement; 
        leerDatosProducto(producto) 
    }
}

function eliminarProducto(evt){ 
    evt.preventDefault(); 
    if(evt.target.classList.contains('borrar-producto')){ 
        const producto = evt.target.parentElement.parentElement; 
        const productoId = producto.querySelector('a').getAttribute('data-id'); 

        articulosCarrito = articulosCarrito.filter(producto => producto.id !== productoId) 
        carritoHTML();
    }
}

function cargarLocalStorage(){
    articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carritoHTML()
}

document.addEventListener('DOMContentLoaded', cargarLocalStorage);
listaProductos.addEventListener('click', agregarProducto);
carrito.addEventListener('click', eliminarProducto);
vaciarCarritoBtn.addEventListener('click', vaciarCarrito);





//toastfy

vaciarCarritoBtn.addEventListener("click", ()=>{
    Toastify({
        text: "Carrito eliminado",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #630000, #630000)",
        },
        onClick: function(){} // Callback after click
      }).showToast();
    
    
})

listaProductos.addEventListener("click", ()=>{
    Toastify({
        text: "Se agregó al carrito",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, green, green)",
        },
        onClick: function(){} // Callback after click
      }).showToast();
    
    
})

//api usuarios
const urlUsuarios = "https://jsonplaceholder.typicode.com/users";
const user = document.querySelector("#users");

fetch(urlUsuarios)
    .then( (response) => response.json() )
    .then( (data) => {
        data.forEach(usuario => {
            const li = document.createElement("li");
            li.textContent = usuario.name + " - Telefóno:" + usuario.phone;
            users.append(li);
        })
    } )


