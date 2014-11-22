(function () {
    // ensure that me.pathFinding is defined
    me.pathFinding = me.pathFinding || {};
    me.pathFinding = me.plugin.Base.extend(
    {

        init : function (width, height, type, length, location) {
            type = type || "JumpPointFinder";
            length = length || 1;
            location = location || "lib/plugins/pathFinding/";
            this._super(me.plugin.Base, "init");

            this.name = "me.pathFinding";

            this.worker = new Worker(location + "jobWorker.js");
            this.worker.addEventListener('message', this.workerListener, false);
            this.postMessage({  name: "init", 
                                data:{
                                    type: type, width: width, height: height, length: length
                                }
                            });
        },

        workerListener : function (e) {
            var object = e.data;
            console.log(object);
        },
        postMessage : function(object){
            this.worker.postMessage(object);
        }
    });
})();