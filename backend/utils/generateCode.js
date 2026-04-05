exports.generateUniqueCode = (email, eventId) => {
    const raw = email + "-" + eventId + "-" + Date.now();
    return Buffer.from(raw).toString('base64');
};
