<template>
  <div class="trip-wrapper">
    <ScheduleHeaderComponent />

    <div class="main-content">
      <p class="question">
        📧 <strong>초대할 사람의 이메일을 입력해주세요</strong>
      </p>

      <div class="email-input-wrapper">
        <input
          v-model="emailInput"
          type="email"
          class="email-input"
          placeholder="example@email.com"
        />
        <button class="add-button" @click="handleAddEmail">추가</button>
      </div>

      <!-- 이메일 중복, 미존재 메시지 -->
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

      <!-- 이메일을 추가 안한 상태에서 다음 누르면 표시되는 에러 -->
      <p v-if="showNextError" class="error">
        최소 한 명 이상의 이메일을 추가해주세요.
      </p>

      <div class="email-list" v-if="store.tripData.invitedEmails.length">
        <ul>
          <li
            v-for="(email, index) in store.tripData.invitedEmails"
            :key="index"
          >
            {{ index + 1 }}. {{ email }}
            <span class="remove" @click="handleRemoveEmail(email)">❌</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="footer">
      <button class="next-button" @click="handleNext">다음</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useTripAddStore } from '@/stores/tripAddStore';
import ScheduleHeaderComponent from '@/components/TripAddHeaderComponent.vue';
import axios from 'axios';

const store = useTripAddStore();
const emailInput = ref('');
const errorMessage = ref('');
const showNextError = ref(false);

function isValidEmail(email) {
  // 간단한 이메일 유효성 정규식
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

async function handleAddEmail() {
  const email = emailInput.value.trim();

  if (!email) {
    errorMessage.value = '이메일을 입력해주세요.';
    return;
  }

  if (!isValidEmail(email)) {
    errorMessage.value = '올바른 이메일 형식이 아닙니다.';
    return;
  }

  if (store.tripData.invitedEmails.includes(email)) {
    errorMessage.value = '이미 초대한 사용자입니다.';
    return;
  }

  try {
    const response = await axios.get(`/api/User?email=${email}`);

    const emailExists = response.data.length > 0;
    if (!emailExists) {
      errorMessage.value = '존재하지 않는 사용자입니다.';
      return;
    }

    store.addEmail(email);
    emailInput.value = '';
    errorMessage.value = '';
    showNextError.value = false; //정상 추가 시 에러 해제
  } catch (e) {
    console.error(e);
    errorMessage.value = '네트워크 오류가 발생했습니다.';
  }
}

function handleRemoveEmail(email) {
  store.removeEmail(email);
}

function handleNext() {
  if (!store.tripData.invitedEmails.length) {
    showNextError.value = true;
    return;
  }
  showNextError.value = false;
  store.nextStep();
}

// 로그인한 사용자 이메일 자동 포함
onMounted(async () => {
  const userId = localStorage.getItem('auth');
  if (!userId) return;

  try {
    const res = await axios.get('/api/User', {
      params: { userId },
    });

    if (res.data.length > 0) {
      const currentUserEmail = res.data[0].email;
      if (!store.tripData.invitedEmails.includes(currentUserEmail)) {
        store.addEmail(currentUserEmail);
      }
    }
  } catch (err) {
    console.error('로그인된 유저 이메일 불러오기 실패:', err);
  }
});
</script>

<style scoped>
.trip-wrapper {
  max-width: 393px;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px;
  background-color: var(--color-bg);
  box-sizing: border-box;
}

.main-content {
  flex: 1;
  padding-left: 25px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: calc(100vh / 6);
}

.question {
  font-size: 18px;
  margin-bottom: 10px;
}

.email-input-wrapper {
  display: flex;
  gap: 8px;
}

.email-input {
  flex: 1;
  padding: 12px 16px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 12px;
  outline: none;
  background-color: white;
}

.add-button {
  background-color: var(--color-main);
  border: none;
  border-radius: 12px;
  padding: 12px 16px;
  font-weight: bold;
  cursor: pointer;
}

.error {
  color: red;
  font-size: 13px;
  margin-top: 8px;
}

.email-list {
  margin-top: 12px;
  font-size: 14px;
  list-style: none;
  padding: 0;
}

.email-list li {
  margin-bottom: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.remove {
  cursor: pointer;
  color: red;
  font-size: 16px;
  margin-left: 10px;
}

.footer {
  display: flex;
  justify-content: center;
  margin-bottom: 82px;
}

.next-button {
  background-color: var(--color-main);
  color: black;
  padding: 14px 40px;
  border: none;
  border-radius: 14px;
  font-size: 16px;
  font-weight: bold;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}
</style>
