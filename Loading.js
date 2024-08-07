/* Estilo para Barra de Loading  */
$loading-duration: 2s;

.loading {
width: 100%;
height: 4px;
background-color: #eee;
position: relative;

&::after {
content: '';
display: block;
position: absolute;
top: 0;
left: 0;
width: 0;
height: 100%;
background-color: #007bff; // Cor da barra de progresso
animation: loadingAnimation $loading-duration linear infinite;
}

@keyframes loadingAnimation {
0% {
width: 0;
}

100% {
width: 100%;
}
}
}
