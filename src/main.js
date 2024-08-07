import plugin from '../plugin.json';
import style from './style.scss';

const sidebarApps = acode.require('sidebarApps');

class SourceControl {

constructor() {
this.editor = editorManager.editor;
this.active();

}

async active() {
const activeFile = editorManager.activeFile;
const file = activeFile.uri;
console.log('Active file: ', file);

const fileList = acode.require('fileList');
const list = await fileList();

list.forEach(item => {
console.log('File name:', item.name, 'File path:', item.path);
// Verifique aqui se o diretório .git existe
// Tome a decisão adequada com base nessa verificação
if (item.name === '.git') {
// Executar alguma ação se o diretório .git existir
console.log('.git directory exists');
}
});
}

async init() {


try {
acode.addIcon('detect-icon',
this.baseUrl + 'assets/icon.png');
this.globalStyles();

this.sidebarContainerControl();
} catch (error) {
console.error('Erro ao inicializar o plugin de controle de origem:',
error);
}
}

globalStyles() {
this.$style = tag('style',
{
textContent: style,
id: 'source-control'
});
document.head.append(this.$style);
}

sidebarContainerControl() {
// Create container for sidebar control
this.$containerControl = tag('div',
{
className: 'sidebar-control'
});

// Create header element
const $header = tag('div',
{
className: 'header-sc'
});

// Criar o elemento do ícone de detecção com a classe detect-icon
const $detectIcon = tag('div',
{
className: 'detect-icon detect-sidebar-app '
});

// Criar o elemento de notificações dentro do ícone de detecção
const $notifications = tag('div',
{
className: 'notifications',
textContent: '1' // Altere isso conforme necessário

/*
   criar lógica pra identificar alterações no control-area
  */

});

// Adicionar o elemento de notificações ao ícone de detecção
$detectIcon.appendChild($notifications);

// Obter as coordenadas do ícone de detecção
const detectIconRect = $detectIcon.getBoundingClientRect();

// Posicionar o ícone de notificações dentro do ícone de detecção
$notifications.style.left = detectIconRect.left + 8 + 'px';

$notifications.style.top = (detectIconRect.top + detectIconRect.height + 13) + 'px'; // Posicione o ícone de notificações 12,50 pixels abaixo do ícone de detecção

// Adicionar o ícone de detecção ao documento ou a outro elemento pai
document.body.appendChild($detectIcon);

  // Append title, input, and button to the header
  $header.append($detectIcon);

// Define the tag function to create elements with attributes
function tag(name, attributes) {
const element = document.createElement(name);
for (const key in attributes) {
element[key] = attributes[key];
}
return element;
}

// Create container for control area
const $container = tag('div', {
className: 'container-control'
});

// Create row 1
const $row1 = tag('div', {
className: 'row'
});

// Create menu top for row 1
const $menuTop1 = tag('div', {
className: 'menu-top'
});

$menuTop1.innerHTML = `
<span>SOURCE CONTROL</span>
<span>1</span>
<button>All</button>
<button>View</button>
`;

$row1.appendChild($menuTop1);
$container.appendChild($row1);

// Create row 2
const $row2 = tag('div', {
className: 'row'
});

// Create menu control for row 2
const $menuControl1 = tag('div', {
className: 'menu-control'
});

$menuControl1.innerHTML = `
<span>icon</span>
<span>CHANGES</span>
<span>1</span>
<button>All</button>
<button>View</button>
`;

$row2.appendChild($menuControl1);
$container.appendChild($row2);

// Create area files 1
const $areaFiles1 = tag('div', {
className: 'area-files'
});

$areaFiles1.innerHTML = `
<ul>
<li>icon</li>
<li>anarquia.js</li>
<li>path/file.js</li>
<li>U</li>
</ul>
<button>add</button>
<button>add</button>
`;

$container.appendChild($areaFiles1);

// Create row 3
const $row3 = tag('div', {
className: 'row'
});
// Create menu control for row 3
const $menuControl2 = tag('div', {
className: 'menu-control'
});
$menuControl2.innerHTML = `
<span>icon</span>
<span>STAGES</span>
<span>1</span>
<button>All</button>
<button>View</button>
`;
$row3.appendChild($menuControl2);
$container.appendChild($row3);

// Create area files 2
const $areaFiles2 = tag('div', {
className: 'area-files'
});
$areaFiles2.innerHTML = `
<ul>
<li>icon</li>
<li>anarquia.js</li>
<li>path/file.js</li>
<li>U</li>
</ul>
<button>add</button>
<button>add</button>
`;
$container.appendChild($areaFiles2);

// Create row 4
const $row4 = tag('div', {
className: 'row'
});
// Create menu control for row 4
const $menuControl3 = tag('div', {
className: 'menu-control'
});
$menuControl3.innerHTML = `
<span>icon</span>
<span>STAGED CHANGES</span>
<span>1</span>
<button>All</button>
<button>View</button>
`;
$row4.appendChild($menuControl3);
$container.appendChild($row4);

// Create area files 3
const $areaFiles3 = tag('div', {
className: 'area-files'
});
$areaFiles3.innerHTML = `
<ul>
<li>icon</li>
<li>anarquia.js</li>
<li>path/file.js</li>
<li>U</li>
</ul>
<button>add</button>
<button>add</button>
`;
$container.appendChild($areaFiles3);

// Assign the container to $sourceControlArea
this.$sourceControlArea = $container;

// Fim menuChanges
this.$containerControl.append($header,
this.$sourceControlArea);

sidebarApps.add('detect-icon',
'detect-sidebar-app',
'Detect',
(app) => {
app.append(this.$containerControl);
});
}

async destroy() {
this.$containerControl.remove();
}
}

if (window.acode) {
const acodePlugin = new SourceControl();
acode.setPluginInit(plugin.id, async (baseUrl, $page, {
cacheFileUrl, cacheFile
}) => {
if (!baseUrl.endsWith('/')) {
baseUrl += '/';
}
acodePlugin.baseUrl = baseUrl;
await acodePlugin.init($page, cacheFile, cacheFileUrl);
});
acode.setPluginUnmount(plugin.id,
() => {
acodePlugin.destroy();
});
}