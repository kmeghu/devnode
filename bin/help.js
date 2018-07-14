
	const menus = {
		
	main:` 
		ctrl [command] <options>

	    [command] 	   Description
	    =================================================
	     login    ... login to <CPapiHost>
	     logout   ... end current session login

	     cache    ... capture all uid as json object to etcd keystore
	     rjcache   ... capture all uid as json object to Redis keystore
	     redis    ... Redis keystore hashed key value listing
	     job      ... cache objects in cpapi to redis
	     try      ... example api call for check point objects
	
	     keystore ... etcd class method for key management
	     setkey   ... set key value in etcd keystore

	     version  ... show controller version

		use 'ctrl help [command]' for more info
	    =================================================
							`,
	
	cache:`
		ctrl cache 

		           ..... saves local cache of CP objects
			   backed up to uid/<key> in your keystore as 
			   key=uid, value='json object properties'
		           This becomes the reference for the object
			   properties and information, allowing further
			   REST req to the CP api server to be liited to UID.
			   This will reduce load on the smartcenter, as well
			   as leverage local processing to update objects.

		                          `,
	
	rjcache:`
		ctrl rcache 

		           ..... saves local cache of CP objects
			   backed up to <type>/<uid> in your REDIS keystore as 
			   hash=type, key=uid, value='json object properties'
		           This becomes the reference for the object
			   properties and information, allowing further
			   REST req to the CP api server to be liited to UID.
			   This will reduce load on the smartcenter, as well
			   as leverage local processing to update objects.

		                          `,
	redis:`
		ctrl redis <hash field> [--flush]

		 ctrl redis                              ..... summary of hash fields
		 ctrl redis ls                           ..... list all root hash keys
		 ctrl redis <key>                        ..... display key values in hash
		 ctrl redis <key> --schema               ..... display object schemas
		 ctrl redis <key> --index <value name>   ..... get object values across key stores as an array
		 ctrl redis --flush                      ..... clear all hash keys in Redis db

			example: ctrl redis mykeygroup --index uid
		How cool is that? If you don't know what that means, keep tinkering. Being able to grab
		and array of uid's is an opportunity. And it doesn't stop at uids.

		                          `,

	keystore:`
		ctrl keystore --[option] <setting>

		 --keyhost ..... <hostname for etcd service>
		 --key     ..... <name of key>

		                          `,

	setkey:`
		ctrl setkey --[option] <setting>

		 --keyhost ..... hostname for etcd service
		 --key     ..... name of key
		 --value   ..... key value to set
		 --ttl     ..... time to live of key in seconds

		                          `,

	try:`
		ctrl try

		           ..... fixed config for test

		                           `,

	job:`
		ctrl job [command] --[option] <setting>

		 --unused     ..... (boolean) search and tag unused objects
		 --type       ..... specify type of object to tag
		 --filter     ..... filter expression for your tag search
		 --tags       ..... add tag value (repeat for as many as needed)

		 [command]             ..... (optional) cpapi commands can be passed to the api

		 ex. ctrl job --type host --filter "MyHost" --tags "DMZ Host" --tags "My App"
		 use ctrl redis to see the results, stored as your filter name.

		                          `,

	login:`
		ctrl login <host>

		<host>     .... specify the configured api host

		Ex. ctrl login smc

		
							`,

	logout:`
		ctrl logout

		           .... end current api session

		Ex. ctrl logout

		
		`
	}

module.exports = (args) => {
	const subCmd = args._[0] === 'help'
	 ? args._[1]
	 : args._[0]


	console.log(menus[subCmd] || menus.main)

	}


		
