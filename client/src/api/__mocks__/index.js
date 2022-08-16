const sendUserMessage = () =>
   Promise.resolve({
      success: true,
      message: 'Message sent. Thank you for contacting me.',
   });

export default { sendUserMessage };
export { sendUserMessage };
