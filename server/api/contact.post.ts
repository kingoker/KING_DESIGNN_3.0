import { defineEventHandler, readBody, createError } from 'h3'
import { createClient } from '@supabase/supabase-js'
import { useRuntimeConfig } from '#imports'
import { $fetch } from 'ofetch'

export default defineEventHandler(async (event) => {
  const { name, email, topic } = await readBody(event)
  const config = useRuntimeConfig()

  // Инициализируем Supabase
  const supabase = createClient(
    config.public.supabaseUrl,
    config.public.supabaseKey
  )

  // 1) Записать в Supabase (таблица contact_form_responses)
  const { error: dbError } = await supabase
    .from('contact_form_responses')
    .insert([{ name, email, topic, created_at: new Date().toISOString() }])

  if (dbError) {
    throw createError({ statusCode: 500, statusMessage: dbError.message })
  }

  // 2) Отправить в Telegram (если есть chat ids)
  const chatIdsRaw = config.telegramChatIds || ''
  const chatIds = chatIdsRaw.split(',').map(id => id.trim()).filter(Boolean)
  if (chatIds.length > 0 && config.telegramBotToken) {
    const timestamp = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })
    const telegramText = [
      '💌 *Новая заявка с формы KING DESIGNN*',
      '',
      `👤 *Имя:* _${name || '-'}_`,
      `✉️ *Email:* _${email || '-'}_`,
      `🕒 *Время:* _${timestamp}_`,
      '',
      '*💬 Тема обращения:*',
      `${topic || '-'}`,
      '',
      '🔥 Мы свяжемся с вами в ближайшее время!'
    ].join('\n')

    for (const chatId of chatIds) {
      try {
        await $fetch(`https://api.telegram.org/bot${config.telegramBotToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: {
            chat_id: chatId,
            text: telegramText,
            parse_mode: 'Markdown'
          }
        })
      } catch (err) {
        console.error('Telegram send error:', err)
      }
    }
  }

  return { success: true }
})
