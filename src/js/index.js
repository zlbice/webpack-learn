import msg from './a';

function testFn() {
    const el = document.createElement('div');
    el.innerText = msg;
    document.body.appendChild(el);
}

testFn();
