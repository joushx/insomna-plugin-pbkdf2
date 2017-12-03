const crypto = require('crypto');
var bytes = require('utf8-bytes');

module.exports.templateTags = [
  {
    name: 'pbkdf2',
    displayName: 'PBKDF 2 Hash',
    description: 'Creates a PBKDF 2 hash',
    args: [
      {
	type: 'enum',
        displayName: 'Algorithm',
	options: [
	]
      },
      {
        type: 'string',
        displayName: 'Value to hash'
      },
      {
        type: 'string',
        displayName: 'Salt'
      },
      {
        type: 'number',
        displayName: 'Interations'
      },
      {
        type: 'enum',
        displayName: 'Input Format',
	options: [
		{displayName: "Plain", value:"plain"},
		{displayName: "Hex", value:"hex"}
	]
      }
    ],
    async run (context, algorithm, value, salt, iterations, inputFormat) {

	// insert supported encryption algorithms
	crypto.getHashes().forEach(function(algorithm, index){
		module.exports.templateTags[0].args[0].options.push({value:algorithm, displayName:algorithm})
	});

	if(inputFormat == "hex"){
		value = new Buffer(value, "hex")
	}
	else{
		value = new Uint8Array(bytes(value));
	}

        return crypto.pbkdf2Sync(value, salt, iterations, 32, algorithm).toString('hex');
    }
  }
];
