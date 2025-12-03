// WhatsApp redirect utility
// Change WHATSAPP_NUMBER to your business number (include country code, no + symbol)
const WHATSAPP_NUMBER = '201515196284'; // Egypt: +201515196284 (015 15196284)

export const sendWhatsAppMessage = (formData, type) => {
  let message = '';

  if (type === 'flight') {
    message = `🛫 FLIGHT BOOKING REQUEST\n\n`;
    message += `From: ${formData.from}\n`;
    message += `To: ${formData.to}\n`;
    message += `Departure: ${formData.departure}\n`;
    if (formData.return) message += `Return: ${formData.return}\n`;
    message += `Passengers: ${formData.passengers}\n`;
    if (formData.class) message += `Class: ${formData.class}\n`;
  } else if (type === 'hotel') {
    message = `🏨 HOTEL BOOKING REQUEST\n\n`;
    message += `Destination: ${formData.destination}\n`;
    message += `Check-in: ${formData.checkIn}\n`;
    message += `Check-out: ${formData.checkOut}\n`;
    message += `Rooms: ${formData.rooms}\n`;
    message += `Guests: ${formData.guests}\n`;
  }

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
};

// New function for quick booking messages
export const openWhatsApp = (message) => {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
};
