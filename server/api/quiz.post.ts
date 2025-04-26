import { defineEventHandler, readBody, createError } from 'h3'
import { createClient } from '@supabase/supabase-js'
import { useRuntimeConfig } from '#imports'
import { $fetch } from 'ofetch'

export default defineEventHandler(async (event) => {
  // Парсим тело запроса
  const { answers, contact, cost } = await readBody(event) as {
    answers: Record<string, number[]>
    contact: { name: string; email?: string; phone?: string }
    cost: number
  }

  const config = useRuntimeConfig()
  // Инициализация Supabase-клиента с Service Key
  const supabase = createClient(
    config.public.supabaseUrl,
    config.public.supabaseKey
  )

  // Подготовка и сохранение записи
  const payload = {
    name:       contact.name,
    email:      contact.email || null,
    phone:      contact.phone || null,
    cost,
    answers:    JSON.stringify(answers),
    created_at: new Date().toISOString()
  }
  const { data, error } = await supabase.from('responses').insert([payload])
  console.error('Supabase insert result:', { data, error })
  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  // Получаем тексты вопросов и метки опций для понятного форматирования
  const { data: questions } = await supabase.from('questions').select('id, text')
  const { data: options }   = await supabase.from('options').select('id, label')

  // Форматируем ответы: вопрос + список выбранных меток
  const formattedAnswers = Object.entries(answers)
    .map(([qid, optIds]) => {
      const questionText = questions?.find(q => q.id === Number(qid))?.text || `Вопрос ${qid}`
      const labels = optIds
        .map(id => options?.find(o => o.id === id)?.label || String(id))
        .join(', ')
      return `• *${questionText}*:\n  ${labels}`
    })
    .join('\n\n')

  // Собираем сообщение для Telegram
  const timestamp = new Date().toLocaleString('ru-RU', { timeZone: 'America/New_York' })
  const telegramMessage = [
    '🎉 *Новая заявка из квиза KING DESIGNN!* 🎉\n\n',
    `👤 *Имя:* _${contact.name}_`,
    contact.email ? `✉️ *Email:* _${contact.email}_` : '',
    contact.phone ? `📞 *Телефон:* _${contact.phone}_` : '',
    `\n\n💰 *Стоимость:* _${cost}$_`,
    `🕒 *Время:* _${timestamp}_`,
    '',
    '\n\n*📝 Ответы:*\n',
    formattedAnswers,
    '',
    '\n\n\n🚀 Мы скоро свяжемся и прокачаем вашу идею!'
  ]
  .filter(Boolean)
  .join('\n')

  // Отправляем в Telegram
  try {
    await $fetch(`https://api.telegram.org/bot${config.telegramBotToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        chat_id:    config.telegramChatId,
        text:       telegramMessage,
        parse_mode: 'Markdown'
      }
    })
  } catch (err) {
    console.error('Telegram отправка ответов квиза не удалась:', err)
  }

  return { success: true }
})

