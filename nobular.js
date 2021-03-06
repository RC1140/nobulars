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
target_path = "/" + target_path.join("/") + "/";

var final_file_path = dir_info[0] + sub_dir + '/';


var target_svr = http.createClient(80, target_host);
var request = target_svr.request('GET', (target_path+target_file), {'host': target_host});

request.end();

var final_fdd = final_file_path + target_file;

request.on('response', function(response) {
	var mystream = fs.createWriteStream(final_fdd);
	// no encoding set (aka defaults to buffer)
	response.on('data', function(chunk) {
		// write data to directory
		console.log('-__´ª•: writing chunk - ' + chunk.length);
		mystream.write(chunk);
	});
	response.on('end', function() {
		// close the stream on response end event
		mystream.end();
		exec = require('child_process').exec;
		exec('clear', function(err, output) {
			if(err) throw err;
			console.log(output);
		});
		setTimeout(function() {
			console.log('-__´ª•: your download has completed in the ' + sub_dir + ' folder.');	
		}, 5000);
	});
});

process.on('SIGINT', function() {
	console.log('bye');
	process.exit(0);
});


