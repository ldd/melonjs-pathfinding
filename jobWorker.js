importScripts('pathfindingLib.min.js');
importScripts('pathObject.js');

self.addEventListener('message', function (e) {
	var obj = e.data;
	var i;

	var pos;

	if (obj.name == "init"){
		self.pathObject = new pathObject(new self.PF[obj.data.type](), obj.data.length);
		for (i = 0; i < obj.data.length; i++) {
			self.pathObject.grid.push(new PF.Grid(obj.data.width,obj.data.height));
		}
	}

	//	data: [{nodes: {}}] 
	else if(obj.name == "setWalkableNodes"){
		for (i = 0; i < obj.data.length; i++) {
			self.pathObject.grid[i].nodes = obj.data[i].nodes;
		}
	}

	//	data: [{x: 1, y: 2, z: 3}] 
	else if(obj.name == "setWalkablePosition"){
		for (i = 0; i < obj.data.length; i++) {
			pos = obj.data[i];
			self.pathObject.grid[pos.z].setWalkableAt(pos.x,pos.y, pos.value);
		}
	}

	//	data: [{x:4, y: 4, z: 0}]
	else if(obj.name == "isWalkableAt"){
		for (i = 0; i < obj.data.length; i++) {
			pos = obj.data[i];
			obj.data[i].response = self.pathObject.grid[pos.z].isWalkableAt(pos.x,pos.y);
		}
		self.postMessage(obj);
	}

	//	data: not required
	else if(obj.name == "getAllGrids"){
		self.postMessage({name: obj.name, grid:self.pathObject.grid});
	}

	//	data: {initialPosition:4, endPosition: 4, zLevel: 0, offset: 0}
	else if(obj.name == "findPath"){
		var response = self.pathObject.findPath(obj.data.initialPosition, obj.data.endPosition, 
												obj.data.zLevel, obj.data.offset);
		self.postMessage({name: obj.name, data: response});
	}

	//other types of messages
	else{
		if(obj.data)
			self.postMessage(self.pathObject.handleAction(obj.data));
	}
}, false);
