[
    'home,room=Living\\ Room temp=21.1,hum=35.9,co=0i',
    'home,room=Kitchen temp=21.0,hum=35.9,co=0i',
    'home,room=Living\\ Room temp=21.4,hum=35.9,co=0i',
    'home,room=Kitchen temp=23.0,hum=36.2,co=0i',
    'home,room=Living\\ Room temp=21.8,hum=36.0,co=0i',
    'home,room=Kitchen temp=22.7,hum=36.1,co=0i',
    'home,room=Living\\ Room temp=22.2,hum=36.0,co=0i',
    'home,room=Kitchen temp=22.4,hum=36.0,co=0i',
    'home,room=Living\\ Room temp=22.2,hum=35.9,co=0i',
    'home,room=Kitchen temp=22.5,hum=36.0,co=0i',
    'home,room=Living\\ Room temp=22.4,hum=36.0,co=0i',
    'home,room=Kitchen temp=22.8,hum=36.5,co=1i',
    'home,room=Living\\ Room temp=22.3,hum=36.1,co=0i',
    'home,room=Kitchen temp=22.8,hum=36.3,co=1i',
    'home,room=Living\\ Room temp=22.3,hum=36.1,co=1i',
    'home,room=Kitchen temp=22.7,hum=36.2,co=3i',
    'home,room=Living\\ Room temp=22.4,hum=36.0,co=4i',
    'home,room=Kitchen temp=22.4,hum=36.0,co=7i',
    'home,room=Living\\ Room temp=22.6,hum=35.9,co=5i',
    'home,room=Kitchen temp=22.7,hum=36.0,co=9i',
    'home,room=Living\\ Room temp=22.8,hum=36.2,co=9i',
    'home,room=Kitchen temp=23.3,hum=36.9,co=18i',
    'home,room=Living\\ Room temp=22.5,hum=36.3,co=14i',
    'home,room=Kitchen temp=23.1,hum=36.6,co=22i',
    'home,room=Living\\ Room temp=22.2,hum=36.4,co=17i',
    'home,room=Kitchen temp=22.7,hum=36.5,co=26i'
].reduce((previous, value) => previous.then(() =>
    new Promise(resolve => {
        setTimeout(() => {
            console.log(value)
            resolve()
        }, 1000)
    })
), Promise.resolve()).then(()=>{
    console.log('end')
})
