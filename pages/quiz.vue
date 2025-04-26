<template>
  <div ref="root" class="min-h-screen relative overflow-hidden bg-black text-white">
    <!-- Canvas для звёздного неонового фона -->
    <canvas ref="canvas" class="absolute inset-0 w-full h-full"></canvas>

    <!-- Контент опроса поверх фона -->
    <div class="relative z-10 flex flex-col items-center justify-start h-full px-4 pt-[100px]">
      <!-- Заголовок -->
      <h1 ref="title" class="text-4xl sm:text-5xl font-extrabold text-center mb-12
          text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400
          drop-shadow-[0_0_20px_rgba(0,255,209,0.8)]">
        🚀 Прокачай свою идею<br/>с KING DESIGNN
      </h1>

      <div v-if="loading" class="italic text-lg">Загрузка…</div>

      <div v-else class="w-full max-w-lg space-y-8">
        <transition name="fade-slide" mode="out-in">
          <!-- Карточка вопроса -->
          <div v-if="currentIndex < sortedQuestions.length"
               :key="currentQuestion.id"
               class="relative p-8 rounded-2xl border-4 border-transparent backdrop-blur-lg bg-black/50
                      before:absolute before:inset-0 before:rounded-2xl before:border before:border-[rgba(0,255,209,0.6)]
                      before:animate-border-shift before:pointer-events-none">
            <p class="text-xl sm:text-2xl font-semibold mb-6 text-cyan-300">{{ currentQuestion.text }}</p>
            <div class="space-y-4">
              <label v-for="opt in optionsFor(currentQuestion.id)" :key="opt.id"
                     class="flex items-center space-x-3 cursor-pointer hover:text-cyan-200 transition">
                <input :type="currentQuestion.type"
                       :name="`q-${currentQuestion.id}`"
                       :value="opt.id"
                       :checked="isChecked(currentQuestion.id, opt.id)"
                       @change="onAnswerChange(currentQuestion.id, opt.id, $event.target.checked)"
                       class="h-5 w-5 accent-cyan-400 focus:outline-none" />
                <span class="select-none">{{ opt.label }}</span>
              </label>
            </div>
            <div class="mt-8 flex justify-between">
              <button @click="prev"
                      :disabled="currentIndex === 0"
                      class="px-6 py-2 bg-gray-800/60 text-gray-400 rounded-lg disabled:opacity-50">
                Назад
              </button>
              <button @click="next"
                      class="px-6 py-2 bg-gradient-to-r from-cyan-400 to-green-400
                             hover:from-cyan-300 hover:to-green-300 rounded-lg uppercase font-bold
                             tracking-wide shadow-lg shadow-cyan-500/30 transition">
                {{ currentIndex < sortedQuestions.length - 1 ? 'Далее' : 'К форме' }}
              </button>
            </div>
            <div class="mt-6 text-center text-lg font-semibold">
              Примерная стоимость: <span class="text-green-400">{{ approximateCost }} $</span>
            </div>
          </div>

          <!-- Форма контакта -->
          <form v-else :key="'contact'" @submit.prevent="onSubmit"
                class="relative p-8 rounded-2xl border-4 border-transparent backdrop-blur-lg bg-black/50
                       before:absolute before:inset-0 before:rounded-2xl before:border before:border-[rgba(0,255,209,0.6)]
                       before:animate-border-shift before:pointer-events-none space-y-6">
            <p class="text-2xl font-bold mb-6 text-green-400">Финальная стоимость: {{ approximateCost }} $</p>
            <div class="space-y-4">
              <label class="block">
                <span class="block font-semibold mb-1 text-cyan-300">Имя*</span>
                <input v-model="contact.name" type="text" required
                       class="w-full px-4 py-2 bg-gray-800/70 text-white rounded-lg focus:ring-2 focus:ring-cyan-400 transition" />
              </label>
              <label class="block">
                <span class="block font-semibold mb-1 text-cyan-300">Email</span>
                <input v-model="contact.email" type="email"
                       class="w-full px-4 py-2 bg-gray-800/70 text-white rounded-lg focus:ring-2 focus:ring-cyan-400 transition" />
              </label>
              <label class="block">
                <span class="block font-semibold mb-1 text-cyan-300">Телефон</span>
                <input v-model="contact.phone" type="tel"
                       class="w-full px-4 py-2 bg-gray-800/70 text-white rounded-lg focus:ring-2 focus:ring-cyan-400 transition" />
              </label>
            </div>
            <button type="submit"
                    class="mt-4 w-full py-3 bg-gradient-to-r from-cyan-400 to-green-400
                           hover:from-cyan-300 hover:to-green-300 rounded-lg uppercase font-bold
                           tracking-wide shadow-lg shadow-green-500/30 transition"
                    :disabled="submitting">
              {{ submitting ? 'Отправка…' : 'Отправить ответы' }}
            </button>
          </form>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useQuiz } from '~/composables/useQuiz'
import gsap from 'gsap'

// Quiz logic
const { questions, options, loading, loadQuizConfig, calculateCost, submitResponses } = useQuiz()
const router = useRouter()
const currentIndex = ref(0)
const answers = reactive<Record<number, number[]>>({})
const contact = reactive({ name: '', email: '', phone: '' })
const submitting = ref(false)

// Canvas stars
const root = ref<HTMLElement|null>(null)
const canvas = ref<HTMLCanvasElement|null>(null)
let ctx: CanvasRenderingContext2D|null = null
let stars: { x:number; y:number; size:number; alpha:number }[] = []

function resizeCanvas() {
  if (!root.value || !canvas.value) return
  const dpr = window.devicePixelRatio || 1
  const w = root.value.clientWidth
  const h = root.value.clientHeight
  canvas.value.width = w * dpr
  canvas.value.height = h * dpr
  ctx = canvas.value.getContext('2d')
  if (ctx) ctx.scale(dpr, dpr)
  initStars(w, h)
}

function initStars(width: number, height: number) {
  stars = []
  const count = Math.floor(width * height / 8000)
  for (let i = 0; i < count; i++) {
    const star = { x:Math.random() * width, y:Math.random() * height,
                   size:Math.random() * 1.5 + 0.5, alpha:Math.random() }
    stars.push(star)
    gsap.to(star, {
      alpha: Math.random(), duration: 1 + Math.random(), repeat: -1,
      yoyo: true, ease: 'sine.inOut', delay: Math.random()
    })
  }
}

function render() {
  if (!ctx || !root.value) return
  const w = root.value.clientWidth
  const h = root.value.clientHeight
  ctx.clearRect(0, 0, w, h)
  ctx.fillStyle = 'rgba(0,255,209,1)'
  stars.forEach(s => {
    ctx.globalAlpha = s.alpha
    ctx.beginPath()
    ctx.arc(s.x, s.y, s.size, 0, Math.PI*2)
    ctx.fill()
  })
}

onMounted(() => {
  loadQuizConfig()
  window.addEventListener('resize', resizeCanvas)
  resizeCanvas()
  gsap.ticker.add(render)
})

onBeforeUnmount(() => {
  gsap.ticker.remove(render)
  window.removeEventListener('resize', resizeCanvas)
})

const sortedQuestions = computed(() => [...questions.value].sort((a,b)=>a.id-b.id))
const currentQuestion = computed(() => sortedQuestions.value[currentIndex.value])
const optionsFor = (qid: number) => options.value.filter(o=>o.question_id===qid)
const isChecked = (qid: number, optId: number) => answers[qid]?.includes(optId)
const approximateCost = computed(() => calculateCost(answers))

function onAnswerChange(qid:number, optId:number, checked:boolean) {
  if (!answers[qid]) answers[qid]=[]
  if (currentQuestion.value.type==='radio') answers[qid] = checked?[optId]:[]
  else checked? answers[qid].push(optId) : answers[qid] = answers[qid].filter(x=>x!==optId)
}
function next() { if (!(answers[currentQuestion.value.id]?.length)) return alert('Выберите вариант!'); currentIndex.value++ }
function prev() { if (currentIndex.value) currentIndex.value-- }

async function onSubmit() {
  submitting.value = true
  try { await submitResponses(answers, contact); router.push('/thank-you') }
  catch { alert('Ошибка отправки!') }
  finally { submitting.value = false }
}
</script>

<style scoped>
@keyframes border-shift { 0%,100%{border-color:rgba(0,255,209,0.6)}50%{border-color:rgba(0,200,100,0.6)} }
.before\:animate-border-shift:before{animation:border-shift 3s infinite ease-in-out}
.fade-slide-enter-active,.fade-slide-leave-active{transition:all .4s ease}
.fade-slide-enter-from{opacity:0;transform:translateY(30px)}
.fade-slide-leave-to{opacity:0;transform:translateY(-30px)}

/* Canvas базовые стили */
canvas{position:absolute;inset:0;z-index:0}
</style>
