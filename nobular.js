// nobular.js
// "because I'm so lazy when it comes to downloads and file management"
// - tinkered by kenny shen, for pure pleasure and fun. 
// - @kenny_shen, kenny@northpole.sg

// welcome msg
console.log('\n\n\n\n\n<<<   n_o_b_u_l_a_r   >>>\n\n\n\n\n');

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
var target_svr = http.createClient(80, target_host);
var request = target_svr.request('GET', target_path, {'host': target_host});
request.on('response', function(response) {
	console.log();
	response.on('data', function(chunk) {
		// write data to directory
	});
});


