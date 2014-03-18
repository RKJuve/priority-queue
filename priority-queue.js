var Queue =  function(){
	this.priorityArray = [];
	this.hash = {
	};
};

Queue.prototype.enqueue = function(value, priority) {
	// if new priority, set up array. else push value onto array
	if (!this.hash[priority]) {
		this.hash[priority] = [value];
	} else {
		this.hash[priority].push(value);
	}
	// if new priority is >= than old max,
	// add new priority to front of priorityArray,
	// else add new priority to end of priorityArray and then sort descending
	if (priority >= this.priorityArray[0]) {
		this.priorityArray.unshift(priority);
	} else {
		this.priorityArray.push(priority);
		this.priorityArray.sort(function(a,b){
			return b - a;
		});
	}
};

Queue.prototype.dequeue = function() {
	// shift value to return from bucket
	var toReturn = this.hash[this.priorityArray[0]].shift();
	// shift value off priorityArray
	this.priorityArray.shift();
	
	return toReturn;
};


// test case
var queue = new Queue();

//enqueue various data
queue.enqueue('dog', 45);
queue.enqueue('cat', 77);
queue.enqueue(true, 199);
queue.enqueue(777, 99);
queue.enqueue({'test1':'test1'}, 1);
queue.enqueue({'test2':'test2'}, 99);

//dequeue it
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());

//enqueue 10000 random numbers
console.log('enqueuing 10000 random values/priorities between 0 and 2^16');
var startTime = performance.now();

for (i=0; i<10000; i++) {
	var value = Math.floor(Math.random()*65536);
	var priority = Math.floor(Math.random()*65536);
	queue.enqueue(value,priority);
}

var endTime = performance.now();
console.log("done!! took %s seconds", ((endTime-startTime)/1000));

//now dequeue
setTimeout(console.log('now dequeuing...'),5000);
startTime = performance.now();

for (i=0; i<10000; i++) {
	queue.dequeue();
}

endTime = performance.now();
console.log("done!! took %s seconds", ((endTime-startTime)/1000));