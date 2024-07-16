<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import axios from 'axios';
import OnceButton from "@/components/once-button.vue";

const query = ref('');
const jokes = ref<any[]>([]);
const selectedJoke = ref('');

const fetchJokes = async () => {
  console.log('попытка');
  if (query.value.toLowerCase() === 'money') {
    console.log('запуск');
    for (let i = 0; i < 20; i++) {
      console.log('шутим');
      const response = await axios.get('https://api.chucknorris.io/jokes/random', {
        params: {
          category: 'money',
        }
      });
      jokes.value.push(response.data);
    }
  }
};

const selectJoke = (joke: string) => {
  selectedJoke.value = joke;

  newMessage.value = joke
  sendMessage()
};

const onScroll = (event: Event) => {
  const target = event.target as HTMLElement;
  if (target.scrollTop + target.clientHeight >= target.scrollHeight) {
    fetchJokes();
  }
};

const messages = ref<string[]>([]);
const newMessage = ref<string>('');
const socket = ref<WebSocket | null>(null);

const sendMessage = () => {
  if (socket.value && newMessage.value.trim() !== '') {
    socket.value.send(newMessage.value);
    newMessage.value = '';
  }
};

const receiveMessage = (event: MessageEvent) => {
  messages.value.push(event.data);
};

onMounted(() => {
  socket.value = new WebSocket('wss://free.blr2.piesocket.com/v3/1?api_key=oeJRuOmHB1AkiRer56E4Ec3hfpfndP9wAGeCvitp&notify_self=1');
  socket.value.addEventListener('message', receiveMessage);
});

onUnmounted(() => {
  if (socket.value) {
    socket.value.removeEventListener('message', receiveMessage);
    socket.value.close();
  }
});
</script>

<template>
  <div class="app">
    <div class="jokes">
      <input class="app-input" v-model="query" @input="fetchJokes" placeholder="Введите 'money' для поиска шуток"/>
      <div v-if="jokes.length > 0" class="jokes-list" @scroll="onScroll">
        <div v-for="joke in jokes" :key="joke.id" @click="selectJoke(joke.value)">
          {{ joke.value }}
        </div>
      </div>
    </div>
    <div class="chat">
      <div class="messages">
        <div v-for="(message, index) in messages" :key="index" class="message">
          {{ message }}
        </div>
      </div>
      <input class="app-input" v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type a message" />
      <once-button style="margin-bottom: 10px" @click="sendMessage">Send</once-button>
    </div>
  </div>
</template>

<style scoped>

.chat {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: auto;
}

.messages {
  flex-grow: 1;
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  overflow-y: auto;
  max-height: 300px;
}

.message {
  margin-bottom: 5px;
}

input {
  padding: 5px;
  margin-bottom: 10px;
}

button {
  padding: 5px 10px;
}

.jokes {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.jokes-list {
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #ccc;
  padding: 10px;
  margin-top: 10px;
}

.jokes-list div {
  padding: 5px;
  cursor: pointer;
}

.jokes-list div:hover {
  background-color: #f0f0f0;
}

.app-input {
  color: #000;
  background-color: #d3d3d3;
  border-radius: 25px;
  border: 0;
  font-size: 22px;
  outline: none;
  height: 60px;
  text-indent: 25px;
  box-sizing: border-box;
}
</style>


