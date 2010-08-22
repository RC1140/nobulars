// nobular.js
// "because I'm so lazy when it comes to downloads and file management"
// - tinkered by kenny shen, for pure pleasure and fun. 
// - @kenny_shen, kenny@northpole.sg

// nobular says hi.
console.log("     ___           ___           ___           ___           ___       ___           ___     ");
console.log("           /         /          ");
console.log(" ___  ___ (___      (  ___  ___ ");
console.log("|   )|   )|   )|   )| |   )|   )");
console.log("|  / |__/ |__/ |__/ | |__/||    ");
console.log("     ___           ___           ___           ___           ___       ___           ___     \n\n");

// reqs
var fs = require('fs');

// confiks
var spawn = require('./confik');
var confik = spawn();

var dir_info = confik.warps();

// command line vars
var nobus = process.argv;
var sub_dir = process.argv[2];
var target = process.argv[3];

console.log('-__´ª•: requested to save ' +  target + ' in ' + sub_dir + '...\n');
console.log('-__´ª•: please wait...\n')

// check sub_dir
var sub_pos = dir_info[1].indexOf(sub_dir);
if(!(sub_pos == -1)) {
	console.log('-__´ª•: dir ok. processing request...');
} else {
	console.log('\n_________wtf? that is not a valid sub directory.\n\n\n');
}

// connect to target
var http = require('http');

// super ugly code
var target_file = target.split("/").slice((target.split("/").length -1))[0]
var target_host = target.split("/")[2]
var target_path = target.split("/");
target_path = target_path.slice(3);
target_path = target_path.slice(0, target_path.length-1);
target_path = "/" + target_path.join("/");

var final_file_path = dir_info[0] + sub_dir + '/';


var target_svr = http.createClient(80, target_host);
var request = target_svr.request('GET', (target_path+target_file), {'host': target_host});

request.end();

var final_fdd = final_file_path + target_file;
var final_fd;

fs.open(final_fdd, 'w', mode=0666, function(err, fd) {
	final_fd = fd;
});


request.on('response', function(response) {
	response.on('data', function(chunk) {
		console.log(chunk.length);
		// write data to directory
		fs.write(final_fd, chunk, encoding='utf8');
	});
});

process.on('SIGINT', function() {
	console.log('bye');
	process.exit(0);
});


