function PostMessageBus() { }

PostMessageBus.prototype.add = function(destination) {
  var _this = this;
  return new Promise(function(resolve, reject) {
    console.log(destination);
    if (!destination) {
      reject('No destination window provided.')
    }
    _this.listen();
    resolve('connected');
  });
}

PostMessageBus.prototype.listen = function() {
  window.addEventListener('message', this.handleMessage.bind(this))
}

PostMessageBus.prototype.handleMessage = function(e) {
  console.log(e)
}
