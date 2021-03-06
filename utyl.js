//*****************************************************************************
//****                      Utils Api for JavaScript                       ****
//*****************************************************************************
//****                               @muitxer                              ****
//****                Miguel Fernandez  -  github.com/muit                 ****
//*****************************************************************************

Utyl = {
    author: "muitxer",
    repo: "http://github.com/muit/utyl",
    version: "0.1.03"
}

//*******************************
// String helpers
//*******************************
String.prototype.startsWith = function(str){
    return this.slice(0, str.length) == str;
};

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

String.prototype.contains = function(str){
    return this.indexOf(str) != -1;
};

//*******************************
// Hash helpers
//*******************************
Object.prototype.keys = function(){
    var ret=[],p;
    for(p in this) if(Object.prototype.hasOwnProperty.call(this,p)) ret.push(p);
    return ret;
}

Object.prototype.key = function(o){
    var ret=[],p;
    for(p in this) if(this[p] == o) ret.push(p);
    return ret;
}

//*******************************
// Array Helpers
//*******************************
Array.prototype.first = function(){ return this[0]; }
Array.prototype.last = function(){ return this[this.length-1]; }
Array.prototype.remove = function(o){ 
    var i = this.indexOf(o);
    return (i >= 0)? this.splice(i, 1)[0] : undefined;
}
Array.prototype.removeByIndex = function(i){
    return (i >= 0)? this.splice(i, 1)[0] : undefined;
}

//*******************************
// Player Array Helpers
//*******************************
Array.prototype.getByName = function(n){ 
    return this.filter(function(p){ return p.name == n; }).first;
}


//*******************************
// Trigger Class
//*******************************
Trigger = function(){}
Trigger.prototype.get = function(){
    return (!this.s)?this.s = true:false;
}
Trigger.prototype.reset = function(){
    this.s = undefined;
}

//*******************************
// Vector2 Class
//*******************************
Vector2 = function(x, y){
    if(x instanceof Vector2){
        this.x = x.x; 
        this.y = x.y;
    }
    else{
        this.x = x; 
        this.y = y;
    }
}
Vector2.prototype.x = null;
Vector2.prototype.y = null;
Vector2.prototype.distance = function(v2){ return Vector2.distance(this, v2); };

Vector2.distance = function(v1, v2){ 
    return Math.sqrt(Math.pow(v1.x + v2.x, 2) + Math.pow(v1.y + v2.y, 2)); 
}
Vector2.dot = function(v1, v2){ return v1.x * v2.x + v1.y * v2.y; }

//*******************************
// Vector3 Class
//*******************************
Vector3 = function(x, y, z){
    if(x instanceof Vector3){
        this.x = x.x; 
        this.y = x.y; 
        this.z = x.z;
    }
    else{
        this.x = x; 
        this.y = y; 
        this.z = z;
    }
}
Vector3.prototype.x = null;
Vector3.prototype.y = null;
Vector3.prototype.z = null;
Vector3.prototype.distance = function(v2){ return Vector3.distance(this, v2); };

Vector3.distance = function(v1, v2){ 
    return Math.sqrt(Math.pow(v1.x + v2.x, 2) + Math.pow(v1.y + v2.y, 2) + Math.pow(v1.z + v2.z, 2)); 
}
Vector3.dot = function(v1, v2){ return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z; }


//*******************************
// EventMap Class
//*******************************
EventMap = function(){}
EventMap.prototype.events = [];
EventMap.prototype.callbacks = [];

EventMap.prototype.createEvent = function(callback, delay){
    var self = this;
    var guid = setTimeout(function(){
        self.removeEvent(guid);
        callback();
    }, delay);

    this.events.push(guid);
    this.callbacks.push(callback);
    return this.events.length-1;
}

EventMap.prototype.restartEvent = function(event, delay){
    var index = this.events.indexOf(event);
    if (index >= 0){
        clearTimeout(this.events[index]);
        var self = this;

        this.events[index] = setTimeout(function(){
            self.removeEvent(guid);
            self.callbacks[index]();
        }, delay);
    }
}

EventMap.prototype.removeEvent = function(event){
    var index = this.events.indexOf(event);
    if (index >= 0) clearTimeout(this.events[index]);
    this.events.removeByIndex(index);
    this.callbacks.removeByIndex(index);
}

EventMap.prototype.removeAllEvents = function(){
    this.events.forEach(function(guid, index, array) {
        clearTimeout(guid);
    });
    this.events = [];
    this.callbacks = [];
}

//*******************************
// Reference Class
//*******************************
_ = function(variable){
    if(variable instanceof Reference)
        return variable.value;
    return new Reference(variable);
}

Reference = function(variable){
    this._ = this.value = variable;
}


//*******************************
// Is not defined method
//
// Comprovates if a class(or a subclass) is undefined and defines it.
//*******************************
ifNotDefined = function(classPath){
    if(!classPath || classPath.length<=0) return undefined;

    classPath = classPath.split(".");

    var parent = this;
    for(var i=0, len=classPath.length; i<len; i++){
        if(parent[classPath[i]] == undefined)
            parent[classPath[i]] = function(){};
        parent = parent[classPath[i]];
    }
    return parent;
}

//*******************************
// Timer Class
//*******************************
Timer = function(oninstance, fps, times){
    var speed = 1000/fps,
        count = 0,
        start = new Date().getTime();

    function instance()
    {
        if(times == undefined || count++ <= times)
            oninstance();

        var diff = (new Date().getTime() - start) - (count * speed);
        setTimeout(instance, (speed - diff));
    }
    setTimeout(instance, speed);
}


//*******************************
// Inherits method
//*******************************
Function.prototype.inherits = function(superClass){
    if(typeof superClass == "function")
        this.prototype = new superClass();
    else
        this.prototype = superClass;
    this.prototype.constructor = this;
}