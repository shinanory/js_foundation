var pr = new Promise(function (resolve, reject) {
    console.log(1);
    resolve('text');
});
pr.then(function (res) {
    console.log(res);
}).then(function (res) {
    console.log(res);
}).catch(function (err) {
    console.log(err);
}).finally(function () {
    console.log('finally');
});
