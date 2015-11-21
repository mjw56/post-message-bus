function PostMessageBus() { }

PostMessageBus.prototype.add = function(destination) {
  var _this = this;
  return new Promise(function(resolve, reject) {
    var initiated = false;

    if (!destination) {
      reject('No destination window provided.')
    }
    function listen(e) {
      if (e.data === 'NEW_WINDOW_CONNECTED') {
        initiated = true;
      }
    }
    window.addEventListener('message', listen, false);

    var id = setInterval(function() {
      if (!initiated) {
        destination.postMessage('NEW_WINDOW_INITIATED', '*');
      } else {
        window.removeEventListener('message', listen, false);
        clearInterval(id);
        resolve('connected');
      }
    }, 500);
  });
}

PostMessageBus.prototype.listen = function(cb) {
  window.addEventListener('message', this.handleMessage.bind(this, cb))
}

PostMessageBus.prototype.destroy = function(cb) {
  window.removeEventListener('message', this.handleMessage.bind(this, cb))
}

PostMessageBus.prototype.handleMessage = function(cb, e) {
  if (e.data === 'NEW_WINDOW_INITIATED') {
      this.reply(e.source, 'NEW_WINDOW_CONNECTED');
  }
}

PostMessageBus.prototype.reply = function(source, msg) {
  source.postMessage(msg, '*');
}
