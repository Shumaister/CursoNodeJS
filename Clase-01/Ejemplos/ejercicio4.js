var os=require('os');

console.log('Memoria libre:'+os.freemem());
var vec=[];
for(var f=0;f<1000000;f++) {
    vec.push(f);
}	
console.log('Memoria libre después de crear el vector:'+os.freemem());
