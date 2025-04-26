import { defineEventHandler, readBody, createError } from 'h3'
import { createClient } from '@supabase/supabase-js'
import { useRuntimeConfig } from '#imports'
import { $fetch } from 'ofetch'

export default defineEventHandler(async (event) => {
  const { name, email, message } = await readBody(event)
  const config = useRuntimeConfig()

  // Инициализируем Supabase
  const supabase = createClient(
    config.public.supabaseUrl,
    config.public.supabaseKey
  )

  // Логируем конфиг (для отладки)
  console.log('cfg:', {
    url:  config.public.supabaseUrl,
    key:  config.public.supabaseKey,
    bot:  config.telegramBotToken,
    chat: config.telegramChatId
  })

  // 1) Записать в Supabase
  const { error: dbError } = await supabase
    .from('contacts')
    .insert([{ name, email, message, created_at: new Date().toISOString() }])

  if (dbError) {
    throw createError({ statusCode: 500, statusMessage: dbError.message })
  }

  // 2) Отправить в Telegram — оформляем красиво с эмоджи и форматированием
  const timestamp = new Date().toLocaleString('ru-RU', { timeZone: 'America/New_York' })
  const telegramText = [
    '💌 *Новый запрос от клиента KING DESIGNN* 💌',
    '\n',
    `👤 *Имя:* _${name}_`,
    `✉️ *Email:* _${email}_`,
    `🕒 *Время:* _${timestamp}_`,
    '\n',
    '*💬 Сообщение:*',
    `${message}`,
    '\n',
    '🔥 Мы свяжемся с вами в ближайшее время! Спасибо за обращение. 🔥'
  ].join('\n')

  try {
    await $fetch(`https://api.telegram.org/bot${config.telegramBotToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        chat_id:    config.telegramChatId,
        text:       telegramText,
        parse_mode: 'Markdown'
      }
    })
  } catch (err) {
    console.error('Telegram send error:', err)
  }

  return { success: true }
})
