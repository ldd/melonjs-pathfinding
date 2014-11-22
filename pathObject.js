var pathObject = function(finder,length){
	this.finder = finder;
	this.length = length;
	this.grid = [];
};

pathObject.prototype.findPath = function(initialPosition, finalPosition, zLevel, offset){
	var path;
	offset = offset || 0;
	zLevel = zLevel || 0;

	//deal with being at the exact position
	if (initialPosition.x == finalPosition.x && initialPosition.y == finalPosition.y ){
		path = [[initialPosition.x - offset, initialPosition.y - offset]];
	}

	else{
	    path = this.finder.findPath(initialPosition.x-offset, initialPosition.y-offset, 
	    							finalPosition.x-offset, finalPosition.y-offset,
	    							this.grid[zLevel].clone());
	}
	return path;
};

//change this as you feel like doing
pathObject.prototype.handleAction = function(object){
	return {name:"empty"};
};
