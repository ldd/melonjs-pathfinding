melonjs-pathfinding
=============

MelonJS plugin implementing pathfindings using webworkers

Official repository : https://github.com/ldd/melonjs-pathfinding

Credit: https://github.com/qiao/PathFinding.js/

License: MIT

Usage
=====

- Add melonjs-pathfinding folder to your plugins directory and include it on your game page.
- Register it in your game.js:
`me.plugin.register(me.pathFinding, "pathFinding", [arguments]);`
- Call me.pathFinding.postMessage(message) from your entity code.

Argument options
================
width: the width of the grid
height: the height of the grid
type: type of pathfinding algorithm 		(default is jumpPointFinder)
length: how many grids to hold, 1 per layer (default is 1)
location: the path of your plugins 			(default is lib/plugins/pathFinding)

message format
===============
to find a path:									 		{name: "findPath",
														 data: {initialPosition:{x:0,y:0}, endPosition: {x:4, y:3},
														 		zLevel: 0, offset: 0}}

to set some position in the grid as walkable or not: 	{name: "setWalkablePosition",
														 data: [{x: 1, y: 2, z: 3, value: true}]} 

to set all nodes in a grid:								{name: "setWalkableNodes",
														 data: [{nodes: {}}]} 

to find out if a position in the grid is walkable:		{name: "isWalkableAt", 
														 data: [{x:4, y: 4, z: 0}]}

to get all grids:										{name: "getAllGrids"}




extending functionality
==================
Basically, there are two places that you want to change
me.pathFinding.workerListener 		(to handle the response differently. The current behavior simply prints the response)
pathObject.prototype.handleAction 	(to handle the message that is being passed to the worker)