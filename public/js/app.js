(function() {
  //globals: sseConnect, axios
  //helpers
  const compose = (f, g) => x => f(g(x))
  const getValue = (e) => e && e.target && e.target.value || '';
  const listenTo = (emitter, event, handler) => {
    emitter.addEventListener(event, handler);
    return () => emitter.removeEventListener(event, handler);
  };
  const addText = (node, txt) => {
    var text = document.createTextNode(txt);
    node.appendChild(text);
    return node;
  }

  //Initial setup
  var messageBus = sseConnect('/stream');
  var model = {
    nickname: '',
    chatText: ''
  }
  //Our input and output elements
  const nickNode = document.getElementById('nickname');
  const chatNode = document.getElementById('chat-text');
  const convoNode = document.getElementById('chat');

  //Event handlers
  const updateName = (name) => model.nickname = name;
  listenTo(nickNode, 'keyup', compose(updateName, getValue));

  const updateText = (text) => model.chatText = text;
  const submit = (data) => {
    if (!data.nickname || !data.chatText) return false;
    chatNode.value = '';
    return axios
      .post('/chat', data)
      .then(() => updateText(''))
      .catch(console.log);
  };

  listenTo(chatNode, 'keyup', (e) =>
    e.which === 13  ?
      submit(model) :
      compose(updateText, getValue)(e)
  );

  const renderChatItem = ({nickname, chatText}) => {
    var user = addText(document.createElement('strong'), `${nickname}: `);
    var p = document.createElement('p');
    p.appendChild(user);
    p = addText(p, chatText);
    convoNode.appendChild(p);
  }
  messageBus.on('chat', renderChatItem);
})()
