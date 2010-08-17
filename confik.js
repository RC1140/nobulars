// configs

module.exports = spawn;

var Nobularsity = {
	master_dir: '/Users/renhuishen/Desktop/Kreybits/nobulars/downloads/',
	sub_dirs: ['apps','anime','images','videos','pdfs'],
	
	warps: function() {
		return [this.master_dir, this.sub_dirs];
	}
}

function spawn() {
	var o = Object.create(Nobularsity);
	return o;
}