const WHATSAPP_API_URL = 'https://graph.facebook.com/v17.0/YOUR_PHONE_NUMBER_ID/messages';
const ADMIN_WHATSAPP = 'YOUR_ADMIN_WHATSAPP'; // Admin's WhatsApp number

export const whatsappService = {
  async sendBookingNotification(booking: {
    userName: string;
    userId: string;
    phone: string;
    date: string;
    timeSlot: string;
  }) {
    try {
      const message = `New Booking Request!\n\nName: ${booking.userName}\nUser ID: ${booking.userId}\nPhone: ${booking.phone}\nDate: ${booking.date}\nTime Slot: ${booking.timeSlot}\n\nPlease confirm this booking in the admin dashboard.`;

      const response = await fetch(WHATSAPP_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: ADMIN_WHATSAPP,
          type: 'text',
          text: { body: message }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send WhatsApp notification');
      }
    } catch (error) {
      console.error('WhatsApp notification error:', error);
      // Don't throw error to prevent blocking the booking process
    }
  },

  async sendBookingConfirmation(booking: {
    userName: string;
    phone: string;
    date: string;
    timeSlot: string;
  }) {
    try {
      const message = `Your booking has been confirmed!\n\nDate: ${booking.date}\nTime Slot: ${booking.timeSlot}\n\nThank you for choosing our service!`;

      await fetch(WHATSAPP_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: booking.phone,
          type: 'text',
          text: { body: message }
        })
      });
    } catch (error) {
      console.error('WhatsApp confirmation error:', error);
    }
  }
};