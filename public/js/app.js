(function() {
  //globals: sseConnect, axios, marked
  //helpers
  const compose = (f, g) => x => f(g(x))
  const getValue = (e) => e && e.target && e.target.value || '';
  const listenTo = (emitter, event, handler) => {
    emitter.addEventListener(event, handler);
    return () => emitter.removeEventListener(event, handler);
  };

  //Initial setup
  var messageBus = sseConnect('/stream');
  var model = {
    nickname: '',
    chatText: '',
    chatbot: {
      welcome: ['WELCOME TO OUR CHATROOM.  SHAME IF SOMEBODY ... HACKED IT.'],
      todo: [
        'PERSIST CHAT ACROSS SESSIONS (CLIENT OR SERVER)',
        'ADD SUPPORT FOR MULTI-LINE COMMENTS',
        'WHITELIST THE MARQUEE TAG'
      ],
      bugs: [
        'SOME MARKDOWN ELEMENTS ARE BROKEN'
      ]
    }
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
    var chatText = marked(`__${nickname}: __ ${chatText}`, {sanitize: true});

    var div = document.createElement('div');
    div.innerHTML = chatText;

    convoNode.appendChild(div);
    convoNode.scrollTop = convoNode.scrollHeight;
  }
  model.chatbot.welcome.forEach(chatText => {
    renderChatItem({nickname: 'CHATBOT 3000', chatText});
  });
  messageBus.on('chat', renderChatItem);
})()
