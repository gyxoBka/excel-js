import './scss/index.scss'
console.log('working');

async function start() {
    return await Promise.resolve()
}

start().then(console.log('async working'))