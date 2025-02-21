<template>
  <div>
    <h1>🌍 Capital Quiz</h1>

    <!-- Visa frågan -->
    <p>{{ question }}</p>

    <!-- Visa svarsalternativ -->
    <div v-for="option in options" :key="option">
      <button
        :class="{
          correct: option === correctAnswer && feedback !== '',
          incorrect:
            option !== correctAnswer &&
            option === userAnswer &&
            feedback !== '',
          answered: feedback !== '',
        }"
        @click="checkAnswer(option)"
      >
        {{ option }}
      </button>
    </div>

    <!-- Feedback på användarens svar -->
    <p v-if="feedback">{{ feedback }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const countries = ref([]); // Håller alla länder
const question = ref(""); // Håller den aktuella frågan
const correctAnswer = ref(""); // Håller rätt svar
const options = ref([]); // Håller alla svarsalternativ
const feedback = ref(""); // Feedback på rätt/fel svar
const userAnswer = ref(""); // Användarens val

// När komponenten monteras, hämta alla länder och skapa en fråga
onMounted(async () => {
  const response = await axios.get("https://restcountries.com/v3.1/all");
  countries.value = response.data;
  generateQuestion(); // Generera en fråga
});

// Generera en slumpad fråga om huvudstad
const generateQuestion = () => {
  const country =
    countries.value[Math.floor(Math.random() * countries.value.length)];
  question.value = `What is the capital of ${country.name.common}?`;
  correctAnswer.value = country.capital ? country.capital[0] : "Unknown";

  // Tre felaktiga svarsalternativ från andra länder
  const wrongAnswers = countries.value
    .filter((c) => c.capital && c.name.common !== country.name.common)
    .map((c) => c.capital[0])
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  // Slumpar och skapar en lista av svarsalternativ
  options.value = [correctAnswer.value, ...wrongAnswers].sort(
    () => 0.5 - Math.random()
  );
};

// Kontrollerar om användaren har rätt/fel
const checkAnswer = (answer) => {
  userAnswer.value = answer;
  if (answer === correctAnswer.value) {
    feedback.value = "✅ Correct!";
  } else {
    feedback.value = `❌ Wrong! The correct answer is ${correctAnswer.value}.`;
  }

  // Efter 2.5 sekunder, skapa en ny fråga
  setTimeout(() => {
    feedback.value = "";
    generateQuestion();
    userAnswer.value = "";
  }, 2500);
};
</script>

<style scoped>
button {
  padding: 10px 15px;
  margin: 5px;
  cursor: pointer;
  font-size: 18px;
  border-radius: 5px;
  transition: background-color 0.3s;
  width: 100%;
  max-width: 300px;
}

button:hover {
  background-color: rgba(179, 179, 179, 0.2);
}

button.correct {
  background-color: rgb(3, 127, 3);
  color: white;
}

button.incorrect {
  background-color: rgb(192, 0, 0);
  color: white;
}

button.answered {
  cursor: not-allowed;
}

p {
  margin-top: 15px;
  font-size: 18px;
}
</style>
